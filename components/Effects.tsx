import React from 'react';
import { motion } from 'framer-motion';

interface EffectsProps {
  type: 'Nice' | 'Naughty';
}

export const Effects: React.FC<EffectsProps> = ({ type }) => {
  const isNice = type === 'Nice';
  const colors = isNice ? ['#fbbf24', '#4ade80', '#ffffff'] : ['#ef4444', '#1f2937', '#7f1d1d'];
  const count = 30;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center overflow-hidden">
      {[...Array(count)].map((_, i) => {
        // Randomize physics
        const angle = Math.random() * 360;
        const distance = 100 + Math.random() * 300;
        const x = Math.cos((angle * Math.PI) / 180) * distance;
        const y = Math.sin((angle * Math.PI) / 180) * distance;
        
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ 
              x, 
              y, 
              scale: [0, 1.5, 0], 
              opacity: [1, 1, 0],
              rotate: Math.random() * 720
            }}
            transition={{ 
              duration: 0.8 + Math.random() * 0.5, 
              ease: "easeOut" 
            }}
            className="absolute w-4 h-4 rounded-full"
            style={{
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              // Naughty particles are squares (coal), Nice are circles/stars
              borderRadius: isNice ? (Math.random() > 0.5 ? '50%' : '0%') : '2px',
            }}
          >
             {/* If Nice, add a little sparkle shape sometimes */}
             {isNice && Math.random() > 0.7 && (
                 <div className="w-full h-full bg-yellow-300 transform rotate-45" />
             )}
          </motion.div>
        );
      })}
    </div>
  );
};