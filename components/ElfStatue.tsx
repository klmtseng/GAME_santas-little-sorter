import React from 'react';
import { ElfImage } from './ElfImage';

interface ElfStatueProps {
  verdictHighlight: 'Nice' | 'Naughty' | null;
}

export const ElfStatue: React.FC<ElfStatueProps> = ({ verdictHighlight }) => {
  const isNaughty = verdictHighlight === 'Naughty';
  const isNice = verdictHighlight === 'Nice';

  return (
    <div className="relative w-64 h-80 md:w-80 md:h-96 flex items-center justify-center">
      {/* SVG Elf Character Component */}
      <ElfImage 
        isNaughty={isNaughty} 
        isNice={isNice}
        className={`w-full h-full drop-shadow-2xl z-10 transition-all duration-300 ease-spring ${
            isNaughty ? '-rotate-12 scale-90' : isNice ? 'rotate-12 scale-110' : 'hover:scale-105'
        }`}
      />

      {/* Naughty Label (Left) */}
      <div 
        className={`absolute top-1/2 -left-8 transform -translate-y-1/2 transition-all duration-300 z-20
          ${verdictHighlight === 'Naughty' ? 'scale-125 rotate-[-15deg] opacity-100' : 'scale-75 rotate-[-10deg] opacity-0'}
        `}
      >
          <div className="bg-red-600 border-4 border-white text-white font-black text-xl px-4 py-2 rounded-lg shadow-xl shadow-red-900/50">
             NAUGHTY
          </div>
      </div>

      {/* Nice Label (Right) */}
      <div 
        className={`absolute top-1/2 -right-8 transform -translate-y-1/2 transition-all duration-300 z-20
          ${verdictHighlight === 'Nice' ? 'scale-125 rotate-[15deg] opacity-100' : 'scale-75 rotate-[10deg] opacity-0'}
        `}
      >
          <div className="bg-green-600 border-4 border-white text-white font-black text-xl px-4 py-2 rounded-lg shadow-xl shadow-green-900/50">
             NICE
          </div>
      </div>
    </div>
  );
};