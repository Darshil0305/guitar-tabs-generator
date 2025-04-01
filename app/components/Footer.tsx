import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6 text-amber-400 mr-2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" 
                />
              </svg>
              Guitar Tabs Generator
            </h2>
            <p className="text-gray-400 mt-1">Transform YouTube videos into guitar tabs</p>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>This is a demonstration application.</p>
            <p>No actual tab conversion API is used.</p>
            <p className="mt-2">© {new Date().getFullYear()} Guitar Tabs Generator</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 