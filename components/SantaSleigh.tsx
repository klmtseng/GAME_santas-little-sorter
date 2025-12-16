
import React from 'react';
import { motion } from 'framer-motion';

export const SantaSleigh: React.FC = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm overflow-hidden">
      
      {/* The Moon */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 w-48 h-48 md:w-80 md:h-80 bg-yellow-100 rounded-full shadow-[0_0_80px_rgba(253,224,71,0.6)] z-0"
      />

      {/* Clouds */}
      <motion.div 
         initial={{ x: -100, opacity: 0 }}
         animate={{ x: 0, opacity: 0.6 }}
         transition={{ duration: 3 }}
         className="absolute top-1/3 left-0 w-full h-32 bg-gradient-to-t from-slate-900 via-slate-800/50 to-transparent z-10"
      />

      {/* Sleigh Animation Group */}
      <motion.div
        initial={{ x: "-120vw", y: 100, rotate: 10, scale: 0.8 }}
        animate={{ x: "120vw", y: -150, rotate: -15, scale: 0.6 }}
        transition={{ duration: 5, ease: "easeInOut", delay: 0.2 }}
        className="relative z-20"
      >
        <svg 
            width="600" 
            height="200" 
            viewBox="0 0 600 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-900 drop-shadow-2xl"
        >
            {/* Reindeer 1 (Lead) */}
            <g transform="translate(450, 50)">
                <path d="M40 30 Q50 10 45 0 M40 30 Q30 10 35 0" stroke="currentColor" strokeWidth="2" /> {/* Antlers */}
                <path d="M10 40 Q20 30 40 35 Q50 35 55 45 Q50 55 40 50 L30 70 L20 60 L10 80 L0 50 Z" fill="currentColor" />
                <path d="M10 80 L5 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> {/* Front Leg */}
                <path d="M30 70 L35 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/> {/* Back Leg */}
            </g>

            {/* Reindeer 2 */}
            <g transform="translate(380, 60)">
                <path d="M40 30 Q50 10 45 0 M40 30 Q30 10 35 0" stroke="currentColor" strokeWidth="2" />
                <path d="M10 40 Q20 30 40 35 Q50 35 55 45 Q50 55 40 50 L30 70 L20 60 L10 80 L0 50 Z" fill="currentColor" />
                <path d="M10 80 L5 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <path d="M30 70 L35 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </g>

            {/* Reindeer 3 */}
            <g transform="translate(310, 55)">
                <path d="M40 30 Q50 10 45 0 M40 30 Q30 10 35 0" stroke="currentColor" strokeWidth="2" />
                <path d="M10 40 Q20 30 40 35 Q50 35 55 45 Q50 55 40 50 L30 70 L20 60 L10 80 L0 50 Z" fill="currentColor" />
                <path d="M10 80 L5 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <path d="M30 70 L35 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </g>

            {/* Reins */}
            <path d="M290 90 Q350 80 450 80" stroke="currentColor" strokeWidth="1" opacity="0.5" />

            {/* Sleigh */}
            <g transform="translate(150, 70)">
                {/* Runners */}
                <path d="M10 80 Q5 90 20 95 L120 95 Q140 90 145 70" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M40 95 L40 60 M100 95 L100 60" stroke="currentColor" strokeWidth="3" />
                
                {/* Body */}
                <path d="M20 60 Q20 30 130 30 Q140 30 130 60 Z" fill="currentColor" />
                
                {/* Santa */}
                <circle cx="80" cy="30" r="15" fill="currentColor" /> {/* Body */}
                <circle cx="80" cy="15" r="8" fill="currentColor" />  {/* Head */}
                <path d="M75 12 L70 5 Q75 0 85 5 Z" fill="currentColor" /> {/* Hat */}
                
                {/* Bag of Toys */}
                <path d="M95 20 Q110 0 120 25 Q115 40 95 35 Z" fill="currentColor" />
            </g>
            
            {/* Magic Dust Trail */}
            <g opacity="0.5">
                <circle cx="140" cy="90" r="2" fill="white" className="animate-ping" />
                <circle cx="120" cy="100" r="1" fill="white" className="animate-ping" style={{ animationDelay: '0.1s' }} />
                <circle cx="100" cy="95" r="1.5" fill="white" className="animate-ping" style={{ animationDelay: '0.2s' }} />
            </g>
        </svg>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="absolute bottom-20 text-white font-bold text-3xl md:text-5xl font-christmas tracking-widest text-shadow-glow text-center px-4"
      >
        To the Sleigh!
      </motion.div>
    </div>
  );
};
