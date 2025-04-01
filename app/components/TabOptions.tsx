import React from 'react';

export interface TabOptionsProps {
  useCapo: boolean;
  setUseCapo: (value: boolean) => void;
  isFingerStyle: boolean;
  setIsFingerStyle: (value: boolean) => void;
}

const TabOptions: React.FC<TabOptionsProps> = ({
  useCapo,
  setUseCapo,
  isFingerStyle,
  setIsFingerStyle
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
    </div>
  );
};

export default TabOptions; 