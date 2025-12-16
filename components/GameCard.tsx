
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
  
  // Text colors for footer (darker for visibility on white card)
  const leftTextColor = level === 1 ? "text-red-400" : "text-slate-400";
  const rightTextColor = level === 1 ? "text-green-500" : "text-yellow-600";

  return (
    <motion.div
      ref={cardRef}
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="absolute z-50 w-80 h-[420px] bg-white rounded-2xl shadow-2xl border-8 border-slate-100 flex flex-col items-center p-6 cursor-grab active:cursor-grabbing select-none"
    >
        {/* Visual feedback overlays */}
        <motion.div style={{ opacity: leftOpacity }} className={`absolute inset-0 ${leftColor} rounded-lg opacity-0 flex items-center justify-center z-10 pointer-events-none`}>
            <span className="text-4xl font-bold font-christmas text-white transform -rotate-12 border-4 border-white p-2 rounded tracking-wider">{leftLabel}</span>
        </motion.div>
        
        <motion.div style={{ opacity: rightOpacity }} className={`absolute inset-0 ${rightColor} rounded-lg opacity-0 flex items-center justify-center z-10 pointer-events-none`}>
            <span className="text-4xl font-bold font-christmas text-white transform rotate-12 border-4 border-white p-2 rounded tracking-wider">{rightLabel}</span>
        </motion.div>

        {/* Card Header */}
        <div className="w-full flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
             <div className="uppercase tracking-widest text-base font-bold text-gray-400 font-christmas">
                {level === 1 ? `Case #${scenario.id}` : "Gift Inspection"}
             </div>
             <div className="flex space-x-1">
                <div className={`w-3 h-3 rounded-full ${leftColor.replace('bg-', 'text-').replace('500', '400')}`}></div>
                <div className={`w-3 h-3 rounded-full ${rightColor.replace('bg-', 'text-').replace('500', '400')}`}></div>
             </div>
        </div>

        {/* The "Image" (Emoji) */}
        <div className="flex-1 flex items-center justify-center mb-4">
             <div className="w-36 h-36 bg-slate-50 rounded-full flex items-center justify-center border-4 border-slate-100 shadow-inner">
                 <span className="text-8xl filter drop-shadow-md transform hover:scale-110 transition-transform duration-300">
                    {scenario.illustration}
                 </span>
             </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2 h-40 flex flex-col justify-start w-full">
            {level === 1 ? (
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 leading-none font-christmas">{scenario.text}</h3>
            ) : (
                <>
                    <div className="text-xs font-bold text-gray-400 uppercase">For the kid who</div>
                    <div className="text-base text-gray-600 italic font-sans leading-tight line-clamp-2">"{scenario.reason}"</div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 font-christmas leading-none">{scenario.text}</div>
                </>
            )}
        </div>

        {/* Footer Hint - Locations Adjusted to Bottom Corners */}
        <div className="mt-auto pt-4 border-t border-slate-100 w-full flex justify-between items-end relative">
            <div className={`flex flex-col items-center ${leftTextColor} font-christmas font-bold opacity-90 transition-transform hover:scale-110`}>
                <span className="text-3xl leading-none mb-1">←</span>
                <span className="text-xl tracking-wider">{leftLabel}</span>
            </div>
            
            <p className="absolute left-1/2 transform -translate-x-1/2 bottom-2 text-[10px] text-gray-300 uppercase font-bold tracking-widest font-sans">
                SWIPE TO DECIDE
            </p>

            <div className={`flex flex-col items-center ${rightTextColor} font-christmas font-bold opacity-90 transition-transform hover:scale-110`}>
                <span className="text-3xl leading-none mb-1">→</span>
                <span className="text-xl tracking-wider">{rightLabel}</span>
            </div>
        </div>
    </motion.div>
  );
};
