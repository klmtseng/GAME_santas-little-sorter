import React from 'react';
import { motion } from 'framer-motion';
import { TOTAL_ROUNDS } from '../constants';
import { GameState } from '../types';
import { Trophy, RefreshCw, XCircle, CheckCircle } from 'lucide-react';

interface ScoreScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({ gameState, onRestart }) => {
  const percentage = Math.round((gameState.score / TOTAL_ROUNDS) * 100);
  
  let title = "";
  let message = "";
  let color = "";

  if (percentage === 100) {
    title = "Santa's Head Elf!";
    message = "Perfect! Santa is impressed by your judgment.";
    color = "text-yellow-500";
  } else if (percentage >= 80) {
    title = "Workshop Supervisor";
    message = "Great job! You have a keen eye for mischief.";
    color = "text-green-600";
  } else if (percentage >= 50) {
    title = "Elf Apprentice";
    message = "Not bad, but check the list twice next time!";
    color = "text-blue-500";
  } else {
    title = "Coal Shoveler";
    message = "Oh dear... Santa disagrees with most of your picks.";
    color = "text-red-600";
  }

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6 border-8 border-red-100"
    >
      <div className="flex justify-center">
        <Trophy className={`w-20 h-20 ${color}`} />
      </div>
      
      <div>
        <h2 className={`text-3xl font-black uppercase ${color}`}>{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <div className="text-5xl font-bold text-slate-800">{percentage}%</div>
        <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Accuracy</div>
      </div>

      <div className="max-h-60 overflow-y-auto space-y-2 text-left bg-gray-50 p-2 rounded border-inner">
          <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Detailed Report</h4>
          {gameState.history.map((item, idx) => {
              const correct = item.choice === item.scenario.verdict;
              return (
                  <div key={idx} className={`p-2 rounded text-sm flex items-start space-x-2 ${correct ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="mt-1">
                        {correct ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                      </div>
                      <div>
                          <p className="font-semibold text-gray-800">{item.scenario.text}</p>
                          <p className="text-xs text-gray-500">You said <span className="font-bold">{item.choice}</span>. Santa said <span className="font-bold">{item.scenario.verdict}</span>.</p>
                      </div>
                  </div>
              )
          })}
      </div>

      <button 
        onClick={onRestart}
        className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition flex items-center justify-center space-x-2"
      >
        <RefreshCw className="w-5 h-5" />
        <span>Sort More Kids</span>
      </button>
    </motion.div>
  );
};