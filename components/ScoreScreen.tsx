
import React from 'react';
import { motion } from 'framer-motion';
import { GameState } from '../types';
import { RefreshCw, XCircle, CheckCircle } from 'lucide-react';

interface ScoreScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({ gameState, onRestart }) => {
  const percentage = Math.round((gameState.score / gameState.maxScore) * 100);
  
  let title = "";
  let stamp = "";
  let message = "";
  let themeColor = "";
  let stampColor = "";
  let isGood = percentage >= 50;

  if (percentage === 100) {
    title = "Santa's Head Elf";
    stamp = "LEGENDARY";
    message = "Sorting AND Loading perfection! Christmas is saved!";
    themeColor = "border-yellow-400 bg-yellow-50";
    stampColor = "text-green-600 border-green-600";
  } else if (percentage >= 80) {
    title = "Sleigh Master";
    stamp = "PROMOTED";
    message = "Excellent work on the list and the loading dock.";
    themeColor = "border-green-200 bg-green-50";
    stampColor = "text-green-600 border-green-600";
  } else if (percentage >= 50) {
    title = "Junior Wrapper";
    stamp = "PASSED";
    message = "You got most of it right. Good enough for government work.";
    themeColor = "border-blue-200 bg-blue-50";
    stampColor = "text-blue-500 border-blue-500";
  } else {
    // Failed either Level 1 or bombed Level 2
    title = "Coal Shoveler";
    stamp = "REJECTED";
    message = "Santa is disappointed. Back to reindeer cleanup duty.";
    themeColor = "border-red-200 bg-red-50";
    stampColor = "text-red-600 border-red-600";
  }

  return (
    <div className="relative w-full max-w-md perspective-1000">
      
      {/* Confetti for High Score */}
      {percentage >= 80 && (
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
             {[...Array(20)].map((_, i) => (
                 <motion.div 
                    key={i}
                    initial={{ y: 0, opacity: 1, x: 0 }}
                    animate={{ y: -500, x: (Math.random() - 0.5) * 400, rotate: 360 }}
                    transition={{ duration: 2, delay: Math.random() * 0.5 }}
                    className="absolute bottom-1/2 left-1/2 w-3 h-3 bg-yellow-400 rounded-full"
                 />
             ))}
          </div>
      )}

      <motion.div 
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ 
            rotateX: 0, 
            opacity: 1,
            x: isGood ? 0 : [0, -10, 10, -10, 10, 0] // Shake if bad
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={`relative bg-white p-6 md:p-8 rounded-sm shadow-2xl w-full text-center space-y-4 border-8 ${themeColor} transform rotate-1`}
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

        {/* Header */}
        <div className="border-b-2 border-slate-800 pb-4 mb-4 border-dashed">
            <div className="uppercase tracking-[0.3em] text-sm font-bold text-slate-500 mb-1 font-sans">North Pole HR</div>
            <h2 className="text-5xl font-bold text-slate-800 font-christmas">Performance Review</h2>
        </div>

        {/* Dynamic Stamp Animation */}
        <motion.div 
            initial={{ scale: 3, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 0.8, rotate: -12 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
            className={`absolute top-16 right-4 border-4 ${stampColor} px-4 py-2 rounded-lg font-black text-5xl uppercase tracking-widest opacity-80 rotate-[-12deg] z-20 mix-blend-multiply mask-image-grunge font-sans`}
        >
            {stamp}
        </motion.div>

        <div>
          <h3 className="text-4xl font-bold text-slate-700 font-christmas">{title}</h3>
          <p className="text-slate-600 text-xl mt-1 italic font-sans">"{message}"</p>
        </div>

        {/* Score Circle */}
        <div className="flex justify-center py-2">
            <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-200" />
                    <motion.circle 
                        cx="64" cy="64" r="56" 
                        stroke="currentColor" 
                        strokeWidth="10" 
                        fill="transparent" 
                        className={percentage >= 50 ? "text-green-500" : "text-red-500"}
                        strokeDasharray="351.8"
                        initial={{ strokeDashoffset: 351.8 }}
                        animate={{ strokeDashoffset: 351.8 - (percentage / 100) * 351.8 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-slate-700 font-christmas">
                    {percentage}%
                </div>
            </div>
        </div>

        {/* Detailed List */}
        <div className="max-h-48 overflow-y-auto space-y-2 text-left bg-slate-50 p-3 rounded border border-slate-200 text-sm shadow-inner font-sans">
            {gameState.history.map((item, idx) => {
                const correct = item.scenario.verdict === item.choice; // For Level 1
                return (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-100 last:border-0 pb-1 last:pb-0">
                        <span className="truncate pr-2 text-slate-600 font-medium w-3/4 text-base">
                            {item.scenario.text}
                        </span>
                        {correct ? (
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                        ) : (
                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                    </div>
                )
            })}
        </div>

        {/* Action Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full bg-slate-800 text-white font-bold py-4 rounded shadow-lg hover:bg-slate-700 transition flex items-center justify-center space-x-2 mt-4 font-christmas text-2xl"
        >
          <RefreshCw className="w-6 h-6" />
          <span>Sort Next Batch</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
