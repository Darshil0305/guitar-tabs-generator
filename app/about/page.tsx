import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              About Guitar Tabs Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about our mission to make guitar tabs accessible for all YouTube songs.
            </p>
          </section>
          
          <div className="bg-white rounded-lg shadow-md p-6 my-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Purpose</h2>
            <p className="text-gray-700 mb-4">
              Guitar Tabs Generator was created to help musicians of all skill levels easily access guitar tabs for their favorite songs on YouTube. Our platform bridges the gap between watching a performance and being able to play it yourself.
            </p>
            <p className="text-gray-700 mb-4">
              We offer flexible options like capo positioning and playing styles to accommodate different preferences and skill levels.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h2>
            <p className="text-gray-700 mb-4">
              Our application uses advanced algorithms to analyze the audio from YouTube videos and generate accurate guitar tablature. Simply paste a YouTube URL, select your preferred playing style options, and we'll generate custom tabs for you.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Note:</strong> This is a demonstration application. In a real production environment, we would integrate with various music APIs and utilize advanced audio processing techniques to generate tabs.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Future Plans</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Add support for bass tabs and other string instruments</li>
              <li>Implement chord diagram visualizations</li>
              <li>Provide additional customization options for different tunings</li>
              <li>Create a mobile app version for on-the-go musicians</li>
              <li>Add a community feature to share and rate tabs</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 