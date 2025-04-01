import React from 'react';

export interface TabOptionsProps {
  useCapo: boolean;
  setUseCapo: (value: boolean) => void;
  isFingerStyle: boolean;
  setIsFingerStyle: (value: boolean) => void;
  useSourceSeparation: boolean;
  setUseSourceSeparation: (value: boolean) => void;
}

const TabOptions: React.FC<TabOptionsProps> = ({
  useCapo,
  setUseCapo,
  isFingerStyle,
  setIsFingerStyle,
  useSourceSeparation,
  setUseSourceSeparation
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 my-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tab Options</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Capo Option */}
        <div className="space-y-2">
          <p className="font-medium text-gray-700">Fret Position</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setUseCapo(false)}
              className={`px-4 py-2 rounded-md border transition-all ${
                !useCapo 
                  ? 'bg-amber-500 text-white border-amber-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-500'
              }`}
            >
              No Capo
            </button>
            <button
              onClick={() => setUseCapo(true)}
              className={`px-4 py-2 rounded-md border transition-all ${
                useCapo 
                  ? 'bg-amber-500 text-white border-amber-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-500'
              }`}
            >
              With Capo
            </button>
          </div>
        </div>
        
        {/* Playing Style Option */}
        <div className="space-y-2">
          <p className="font-medium text-gray-700">Playing Style</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFingerStyle(false)}
              className={`px-4 py-2 rounded-md border transition-all ${
                !isFingerStyle 
                  ? 'bg-amber-500 text-white border-amber-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-500'
              }`}
            >
              Strumming
            </button>
            <button
              onClick={() => setIsFingerStyle(true)}
              className={`px-4 py-2 rounded-md border transition-all ${
                isFingerStyle 
                  ? 'bg-amber-500 text-white border-amber-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-500'
              }`}
            >
              Fingerstyle
            </button>
          </div>
        </div>
      </div>
      
      {/* Source Separation Option */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="font-medium text-gray-700 mb-2">Advanced Options</p>
        <div className="flex items-center">
          <div className="flex items-center">
            <input
              id="sourceSeparation"
              type="checkbox"
              checked={useSourceSeparation}
              onChange={(e) => setUseSourceSeparation(e.target.checked)}
              className="h-4 w-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
            />
            <label htmlFor="sourceSeparation" className="ml-2 block text-sm text-gray-700">
              Use AI Source Separation
            </label>
          </div>
          
          <div className="ml-2 group relative">
            <button
              className="text-gray-400 hover:text-gray-700"
              aria-label="Learn more about source separation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg -left-2 bottom-full mb-1">
              Source separation uses AI to isolate the guitar track from other instruments and vocals, 
              leading to more accurate tab generation but may take longer to process.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabOptions; 