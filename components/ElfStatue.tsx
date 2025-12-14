import React from 'react';
import { ELF_IMAGE_URL } from '../constants';

interface ElfStatueProps {
  verdictHighlight: 'Nice' | 'Naughty' | null;
}

export const ElfStatue: React.FC<ElfStatueProps> = ({ verdictHighlight }) => {
  return (
    <div className="relative w-80 h-96 flex items-center justify-center">
      {/* The Elf Image */}
      <img 
        src={ELF_IMAGE_URL} 
        alt="The Elf" 
        className="w-full h-full object-contain drop-shadow-2xl z-10"
      />

      {/* Naughty Label (Left) */}
      <div 
        className={`absolute top-1/2 -left-8 transform -translate-y-1/2 transition-all duration-300 z-20
          ${verdictHighlight === 'Naughty' ? 'scale-125 rotate-[-15deg]' : 'scale-90 rotate-[-10deg] opacity-80'}
        `}
      >
          <div className="bg-red-600 border-4 border-white text-white font-black text-xl px-4 py-2 rounded-lg shadow-xl shadow-red-900/50">
             NAUGHTY
          </div>
      </div>

      {/* Nice Label (Right) */}
      <div 
        className={`absolute top-1/2 -right-8 transform -translate-y-1/2 transition-all duration-300 z-20
          ${verdictHighlight === 'Nice' ? 'scale-125 rotate-[15deg]' : 'scale-90 rotate-[10deg] opacity-80'}
        `}
      >
          <div className="bg-green-600 border-4 border-white text-white font-black text-xl px-4 py-2 rounded-lg shadow-xl shadow-green-900/50">
             NICE
          </div>
      </div>
    </div>
  );
};