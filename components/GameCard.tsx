import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Scenario, Verdict } from '../types';

interface GameCardProps {
  scenario: Scenario;
  onSwipe: (verdict: Verdict) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ scenario, onSwipe }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Color overlays based on drag
  const naughtyOpacity = useTransform(x, [-150, -20], [1, 0]);
  const niceOpacity = useTransform(x, [20, 150], [0, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('Nice');
    } else if (info.offset.x < -100) {
      onSwipe('Naughty');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="absolute z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border-8 border-slate-100 flex flex-col items-center p-6 cursor-grab active:cursor-grabbing select-none"
    >
        {/* Visual feedback overlays */}
        <motion.div style={{ opacity: naughtyOpacity }} className="absolute inset-0 bg-red-500 rounded-lg opacity-0 flex items-center justify-center z-10 pointer-events-none">
            <span className="text-4xl font-black text-white transform -rotate-12 border-4 border-white p-2 rounded">NAUGHTY</span>
        </motion.div>
        
        <motion.div style={{ opacity: niceOpacity }} className="absolute inset-0 bg-green-500 rounded-lg opacity-0 flex items-center justify-center z-10 pointer-events-none">
            <span className="text-4xl font-black text-white transform rotate-12 border-4 border-white p-2 rounded">NICE</span>
        </motion.div>

        {/* Card Header */}
        <div className="w-full flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
             <div className="uppercase tracking-widest text-[10px] font-bold text-gray-400">Case #{scenario.id}</div>
             <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
             </div>
        </div>

        {/* The "Image" (Emoji) */}
        <div className="flex-1 flex items-center justify-center mb-4">
             <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center border-4 border-slate-100 shadow-inner">
                 <span className="text-7xl filter drop-shadow-md transform hover:scale-110 transition-transform duration-300">
                    {scenario.illustration}
                 </span>
             </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2 h-32 flex flex-col justify-start">
            <h3 className="text-xl font-bold text-gray-800 leading-tight">
                "{scenario.text}"
            </h3>
        </div>

        {/* Footer Hint */}
        <div className="mt-auto pt-4 border-t border-slate-100 w-full text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                Swipe to decide
            </p>
        </div>
    </motion.div>
  );
};
