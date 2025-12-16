
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Scenario, Verdict } from '../types';

interface GameCardProps {
  scenario: Scenario;
  onSwipe: (verdict: Verdict) => void;
  level: 1 | 2;
}

export const GameCard: React.FC<GameCardProps> = ({ scenario, onSwipe, level }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Color overlays based on drag
  const leftOpacity = useTransform(x, [-150, -20], [1, 0]);
  const rightOpacity = useTransform(x, [20, 150], [0, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      onSwipe(level === 1 ? 'Nice' : 'Load');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe(level === 1 ? 'Naughty' : 'Reject');
    }
  };

  const leftLabel = level === 1 ? "NAUGHTY" : "REJECT";
  const rightLabel = level === 1 ? "NICE" : "LOAD";
  const leftColor = level === 1 ? "bg-red-500" : "bg-slate-700";
  const rightColor = level === 1 ? "bg-green-500" : "bg-yellow-500";

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
        <motion.div style={{ opacity: leftOpacity }} className={`absolute inset-0 ${leftColor} rounded-lg opacity-0 flex items-center justify-center z-10 pointer-events-none`}>
            <span className="text-4xl font-black text-white transform -rotate-12 border-4 border-white p-2 rounded">{leftLabel}</span>
        </motion.div>
        
        <motion.div style={{ opacity: rightOpacity }} className={`absolute inset-0 ${rightColor} rounded-lg opacity-0 flex items-center justify-center z-10 pointer-events-none`}>
            <span className="text-4xl font-black text-white transform rotate-12 border-4 border-white p-2 rounded">{rightLabel}</span>
        </motion.div>

        {/* Card Header */}
        <div className="w-full flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
             <div className="uppercase tracking-widest text-[10px] font-bold text-gray-400">
                {level === 1 ? `Case #${scenario.id}` : "Gift Inspection"}
             </div>
             <div className="flex space-x-1">
                <div className={`w-2 h-2 rounded-full ${leftColor.replace('bg-', 'text-').replace('500', '400')}`}></div>
                <div className={`w-2 h-2 rounded-full ${rightColor.replace('bg-', 'text-').replace('500', '400')}`}></div>
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
            {level === 1 ? (
                <h3 className="text-xl font-bold text-gray-800 leading-tight">"{scenario.text}"</h3>
            ) : (
                <>
                    <div className="text-xs font-bold text-gray-400 uppercase">For the kid who</div>
                    <div className="text-sm text-gray-600 italic">"{scenario.reason}"</div>
                    <div className="text-xl font-black text-gray-800 mt-2">{scenario.text}</div>
                </>
            )}
        </div>

        {/* Footer Hint */}
        <div className="mt-auto pt-4 border-t border-slate-100 w-full text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                {level === 1 ? 'Swipe to decide' : 'Swipe Right to Load'}
            </p>
        </div>
    </motion.div>
  );
};
