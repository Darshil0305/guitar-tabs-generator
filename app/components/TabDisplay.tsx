import React from 'react';

export interface SongDetails {
  title: string;
  artist: string;
  videoId: string;
}

export interface TabDisplayProps {
  songDetails: SongDetails | null;
  tabContent: string | null;
  strummingPattern?: string | null;
  isLoading: boolean;
  error: string | null;
}

const TabDisplay: React.FC<TabDisplayProps> = ({
  songDetails,
  tabContent,
  strummingPattern,
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 my-6 border-t-4 border-amber-500">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative w-16 h-16 mb-4">
            <svg className="absolute animate-ping opacity-75 w-16 h-16 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
              <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
            <svg className="absolute w-16 h-16 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
              <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-700">Analyzing audio...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
          <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 my-6 border-t-4 border-red-500">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 w-full">
            <svg className="w-8 h-8 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">Error generating tabs</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <p className="text-gray-600">Please try a different video or check your connection.</p>
        </div>
      </div>
    );
  }

  if (!songDetails || !tabContent) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 my-6 border-t-4 border-amber-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">{songDetails.title}</h2>
          <p className="text-amber-600 font-medium">{songDetails.artist}</p>
        </div>
        <div className="flex mt-3 md:mt-0">
          <a 
            href={`https://www.youtube.com/watch?v=${songDetails.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-red-600 hover:text-red-700 mr-4"
          >
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"></path>
            </svg>
            Watch Video
          </a>
          <button 
            className="inline-flex items-center text-gray-700 hover:text-gray-900"
            onClick={() => window.print()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
            </svg>
            Print
          </button>
        </div>
      </div>
      
      {/* Strumming Pattern Display */}
      {strummingPattern && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-700">
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M21.53 9.53a.75.75 0 01-1.06 0l-4.47-4.47-4.47 4.47a.75.75 0 11-1.06-1.06l4.47-4.47-4.47-4.47a.75.75 0 011.06-1.06l4.47 4.47 4.47-4.47a.75.75 0 111.06 1.06l-4.47 4.47 4.47 4.47a.75.75 0 010 1.06z" clipRule="evenodd" />
              <path d="M3 6.75A.75.75 0 013.75 6h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
            </svg>
            Strumming Pattern
          </h3>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <div className="flex items-center">
              <div className="bg-white px-4 py-2 rounded shadow font-mono text-lg tracking-wide">
                {strummingPattern}
              </div>
              <div className="ml-4 text-sm text-gray-600">
                <p>D = Down strum</p>
                <p>U = Up strum</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tab Content */}
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-700">
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" clipRule="evenodd" />
          </svg>
          Guitar Tab Notation
        </h3>
        <div className="bg-gray-50 p-4 rounded-md overflow-x-auto border border-gray-200 shadow-inner tab-scrollbar tab-content">
          <pre className="font-mono text-sm md:text-base whitespace-pre text-gray-800 tab-font">
            {tabContent}
          </pre>
        </div>
      </div>
      
      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-blue-700 flex items-center">
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
          Playing Tips
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            Practice slowly at first, gradually increasing speed
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            Focus on timing and rhythm before worrying about speed
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            Listen to the original song to get a feel for the rhythm
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabDisplay; 