import React from 'react';

interface ElfImageProps {
  isNaughty: boolean;
  isNice: boolean;
  className?: string;
}

export const ElfImage: React.FC<ElfImageProps> = ({ isNaughty, isNice, className = "" }) => {
  return (
    <svg
        viewBox="0 0 200 240"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        
        <g id="elf-body">
            {/* Legs */}
            <path d="M80 180 L80 220" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" />
            <path d="M120 180 L120 220" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" />
            
            {/* Stripes */}
            <path d="M74 190 H86 M74 200 H86 M74 210 H86" stroke="white" strokeWidth="2" />
            <path d="M114 190 H126 M114 200 H126 M114 210 H126" stroke="white" strokeWidth="2" />

            {/* Shoes */}
            <path d="M73 220 Q73 230 60 230 L85 230 L85 220 Z" fill="#78350f" />
            <path d="M113 220 Q113 230 100 230 L125 230 L125 220 Z" fill="#78350f" transform="scale(-1, 1) translate(-226, 0)" />

            {/* Tunic */}
            <path d="M60 180 L140 180 L130 110 L70 110 Z" fill="#16a34a" />
            <path d="M60 180 L70 160 L80 180 L90 160 L100 180 L110 160 L120 180 L130 160 L140 180" fill="#16a34a" /> 
            
            {/* Belt */}
            <rect x="65" y="145" width="70" height="10" fill="#1f2937" />
            <rect x="90" y="143" width="20" height="14" rx="2" fill="#fbbf24" />
            <rect x="94" y="146" width="12" height="8" rx="1" fill="#1f2937" />

            {/* Collar */}
            <path d="M70 110 L80 125 L100 130 L120 125 L130 110 L100 110 Z" fill="#ef4444" />
            
            {/* Head */}
            <circle cx="100" cy="90" r="30" fill="#fcd34d" />
            
            {/* Ears */}
            <path d="M72 90 L60 85 L70 100 Z" fill="#fcd34d" />
            <path d="M128 90 L140 85 L130 100 Z" fill="#fcd34d" />

            {/* Face */}
            <circle cx="90" cy="85" r="3" fill="#1f2937" />
            <circle cx="110" cy="85" r="3" fill="#1f2937" />
            <circle cx="90" cy="92" r="4" fill="#fca5a5" opacity="0.5" />
            <circle cx="110" cy="92" r="4" fill="#fca5a5" opacity="0.5" />
            
            {/* Mouth changes based on state */}
            {isNaughty ? (
                 <path d="M92 102 Q100 98 108 102" stroke="#1f2937" strokeWidth="2" fill="none" />
            ) : isNice ? (
                 <path d="M92 98 Q100 108 108 98" stroke="#1f2937" strokeWidth="2" fill="none" />
            ) : (
                 <path d="M95 100 Q100 102 105 100" stroke="#1f2937" strokeWidth="2" fill="none" />
            )}

            {/* Hat */}
            <path d="M60 70 Q100 60 140 70 L100 10 Z" fill="#16a34a" />
            <rect x="60" y="65" width="80" height="12" rx="6" fill="white" />
            <circle cx="100" cy="10" r="8" fill="white" />
            
            {/* Arms */}
            <path d="M70 120 Q50 140 60 150" stroke="#16a34a" strokeWidth="10" strokeLinecap="round" fill="none" />
            <circle cx="60" cy="150" r="6" fill="#fcd34d" />
            
            <path d="M130 120 Q150 140 140 150" stroke="#16a34a" strokeWidth="10" strokeLinecap="round" fill="none" />
            <circle cx="140" cy="150" r="6" fill="#fcd34d" />
        </g>
    </svg>
  );
};