
import React from 'react';
import { ElfImage } from './ElfImage';

interface ElfStatueProps {
  verdictHighlight: 'Nice' | 'Naughty' | 'Load' | 'Reject' | null;
  level: 1 | 2;
}

export const ElfStatue: React.FC<ElfStatueProps> = ({ verdictHighlight, level }) => {
  // Logic maps both level verdicts to basic binary states for visual reaction
  const isNegative = verdictHighlight === 'Naughty' || verdictHighlight === 'Reject';
  const isPositive = verdictHighlight === 'Nice' || verdictHighlight === 'Load';

  return (
    <div className="relative w-64 h-80 md:w-80 md:h-96 flex items-center justify-center">
      {/* SVG Elf Character Component */}
      <ElfImage 
        isNaughty={isNegative} 
        isNice={isPositive}
        className={`w-full h-full drop-shadow-2xl z-10 transition-all duration-300 ease-spring ${
            isNegative ? '-rotate-12 scale-90' : isPositive ? 'rotate-12 scale-110' : 'hover:scale-105'
        }`}
      />

      {/* Negative Label (Left) */}
      <div 
        className={`absolute top-1/2 -left-8 transform -translate-y-1/2 transition-all duration-300 z-20
          ${isNegative ? 'scale-125 rotate-[-15deg] opacity-100' : 'scale-75 rotate-[-10deg] opacity-0'}
        `}
      >
          <div className={`${level === 1 ? 'bg-red-600' : 'bg-slate-700'} border-4 border-white text-white font-black text-xl px-4 py-2 rounded-lg shadow-xl`}>
             {level === 1 ? 'NAUGHTY' : 'REJECT'}
          </div>
      </div>

      {/* Positive Label (Right) */}
      <div 
        className={`absolute top-1/2 -right-8 transform -translate-y-1/2 transition-all duration-300 z-20
          ${isPositive ? 'scale-125 rotate-[15deg] opacity-100' : 'scale-75 rotate-[10deg] opacity-0'}
        `}
      >
          <div className={`${level === 1 ? 'bg-green-600' : 'bg-yellow-500'} border-4 border-white text-white font-black text-xl px-4 py-2 rounded-lg shadow-xl`}>
             {level === 1 ? 'NICE' : 'LOAD'}
          </div>
      </div>
    </div>
  );
};
