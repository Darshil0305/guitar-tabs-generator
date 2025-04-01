'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UrlInputForm from './components/UrlInputForm';
import TabOptions from './components/TabOptions';
import TabDisplay from './components/TabDisplay';
import { extractVideoId, generateTabs, getSongInfo } from './utils/youtubeUtils';
import { SongDetails } from './components/TabDisplay';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [songDetails, setSongDetails] = useState<SongDetails | null>(null);
  const [tabContent, setTabContent] = useState<string | null>(null);
  const [useCapo, setUseCapo] = useState(false);
  const [isFingerStyle, setIsFingerStyle] = useState(false);

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
      const tabs = await generateTabs(videoId, useCapo, isFingerStyle);
      setTabContent(tabs as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSongDetails(null);
      setTabContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  // When options change, regenerate tabs if we have a song
  const handleOptionsChange = async () => {
    if (!songDetails || !songDetails.videoId) return;
    
    setIsLoading(true);
    try {
      const tabs = await generateTabs(songDetails.videoId, useCapo, isFingerStyle);
      setTabContent(tabs as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setTabContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Update tabs when capo or playing style changes
  React.useEffect(() => {
    if (songDetails && songDetails.videoId) {
      handleOptionsChange();
    }
  }, [useCapo, isFingerStyle]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Generate Guitar Tabs from YouTube Videos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simply paste a YouTube URL, select your playing style preferences, and get guitar tabs instantly.
            </p>
          </section>
          
          <UrlInputForm onSubmit={handleUrlSubmit} isLoading={isLoading} />
          
          {(songDetails || isLoading) && (
            <TabOptions 
              useCapo={useCapo} 
              setUseCapo={setUseCapo} 
              isFingerStyle={isFingerStyle} 
              setIsFingerStyle={setIsFingerStyle} 
            />
          )}
          
          <TabDisplay 
            songDetails={songDetails}
            tabContent={tabContent}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 