'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UrlInputForm from './components/UrlInputForm';
import TabOptions from './components/TabOptions';
import TabDisplay from './components/TabDisplay';
import { extractVideoId, generateTabs, getSongInfo } from './utils/youtubeUtils';
import { SongDetails } from './components/TabDisplay';

// Define the interface for tab result
interface TabResult {
  tabContent: string;
  strummingPattern?: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [songDetails, setSongDetails] = useState<SongDetails | null>(null);
  const [tabContent, setTabContent] = useState<string | null>(null);
  const [strummingPattern, setStrummingPattern] = useState<string | null>(null);
  const [useCapo, setUseCapo] = useState(false);
  const [isFingerStyle, setIsFingerStyle] = useState(false);
  const [useSourceSeparation, setUseSourceSeparation] = useState(true);

  // Listen for song detail updates from the API
  useEffect(() => {
    const handleSongDetailsUpdate = (event: CustomEvent<SongDetails>) => {
      setSongDetails(event.detail);
    };

    // Add event listener
    window.addEventListener('song-details-updated', handleSongDetailsUpdate as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('song-details-updated', handleSongDetailsUpdate as EventListener);
    };
  }, []);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Extract video ID from URL
      const videoId = extractVideoId(url);
      
      if (!videoId) {
        throw new Error('Could not extract valid YouTube video ID from URL');
      }
      
      // Get song information
      const songInfo = await getSongInfo(videoId);
      setSongDetails(songInfo as SongDetails);
      
      // Generate tabs based on options
      const tabResult = await generateTabs(
        videoId, 
        useCapo, 
        isFingerStyle, 
        useSourceSeparation
      );
      
      // Check if the result is in the new format with both tabContent and strummingPattern
      if (tabResult && typeof tabResult === 'object' && 'tabContent' in tabResult) {
        const typedResult = tabResult as TabResult;
        setTabContent(typedResult.tabContent);
        setStrummingPattern(typedResult.strummingPattern || null);
      } else {
        // Handle legacy format (string only)
        setTabContent(tabResult as string);
        setStrummingPattern(isFingerStyle ? "N/A (Fingerstyle)" : "D DU UDU (Default)");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSongDetails(null);
      setTabContent(null);
      setStrummingPattern(null);
    } finally {
      setIsLoading(false);
    }
  };

  // When options change, regenerate tabs if we have a song
  const handleOptionsChange = async () => {
    if (!songDetails || !songDetails.videoId) return;
    
    setIsLoading(true);
    try {
      const tabResult = await generateTabs(
        songDetails.videoId, 
        useCapo, 
        isFingerStyle,
        useSourceSeparation
      );
      
      // Check if the result is in the new format
      if (tabResult && typeof tabResult === 'object' && 'tabContent' in tabResult) {
        const typedResult = tabResult as TabResult;
        setTabContent(typedResult.tabContent);
        setStrummingPattern(typedResult.strummingPattern || null);
      } else {
        // Handle legacy format (string only)
        setTabContent(tabResult as string);
        setStrummingPattern(isFingerStyle ? "N/A (Fingerstyle)" : "D DU UDU (Default)");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setTabContent(null);
      setStrummingPattern(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Update tabs when capo, playing style, or source separation changes
  React.useEffect(() => {
    if (songDetails && songDetails.videoId) {
      handleOptionsChange();
    }
  }, [useCapo, isFingerStyle, useSourceSeparation]);

  return (
    <div className="flex flex-col min-h-screen fretboard-bg">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-8 bg-white p-8 rounded-lg shadow-lg border-t-4 border-amber-500">
            <div className="mb-4 flex justify-center">
              <svg className="w-16 h-16 text-amber-500 rotating-note" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Generate Guitar Tabs from YouTube Videos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simply paste a YouTube URL, select your playing style preferences, and get guitar tabs instantly.
            </p>
          </section>
          
          <div className="wood-bg p-6 rounded-lg shadow-lg mb-8">
            <UrlInputForm onSubmit={handleUrlSubmit} isLoading={isLoading} />
          </div>
          
          {(songDetails || isLoading) && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <TabOptions 
                useCapo={useCapo} 
                setUseCapo={setUseCapo} 
                isFingerStyle={isFingerStyle} 
                setIsFingerStyle={setIsFingerStyle}
                useSourceSeparation={useSourceSeparation}
                setUseSourceSeparation={setUseSourceSeparation}
              />
            </div>
          )}
          
          <TabDisplay 
            songDetails={songDetails}
            tabContent={tabContent}
            strummingPattern={strummingPattern}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
