
import React from 'react';
import { motion } from 'framer-motion';

export const SantaSleigh: React.FC = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm overflow-hidden">
      
      {/* The Moon */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute w-64 h-64 bg-yellow-100 rounded-full shadow-[0_0_100px_rgba(253,224,71,0.5)] z-0"
      />

      {/* Sleigh Group */}
      <motion.div
        initial={{ x: "-120vw", y: 100, rotate: 5 }}
        animate={{ x: "120vw", y: -100, rotate: -5 }}
        transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
        className="relative z-10 flex items-center"
      >
        {/* Reindeer 1 */}
        <div className="text-6xl transform -scale-x-100 filter drop-shadow-2xl brightness-0 invert">🦌</div>
        <div className="w-8 h-1 bg-white/50"></div>
        {/* Reindeer 2 */}
        <div className="text-6xl transform -scale-x-100 filter drop-shadow-2xl brightness-0 invert">🦌</div>
        <div className="w-12 h-1 bg-white/50"></div>
        {/* Sleigh */}
        <div className="text-8xl transform filter drop-shadow-2xl">🛷</div>
        <div className="text-4xl absolute -top-2 left-32 animate-bounce">🎅</div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="absolute bottom-20 text-white font-bold text-3xl font-serif tracking-widest text-shadow-glow"
      >
        Loading the Sleigh...
      </motion.div>
    </div>
  );
};
