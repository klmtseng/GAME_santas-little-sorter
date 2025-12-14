import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Music, Volume2, VolumeX, Star, RefreshCw } from 'lucide-react';
import { ElfStatue } from './components/ElfStatue';
import { GameCard } from './components/GameCard';
import { ScoreScreen } from './components/ScoreScreen';
import { SCENARIOS, getShuffledScenarios, TOTAL_ROUNDS } from './constants';
import { GameState, Scenario, Verdict } from './types';

export default function App() {
  const [deck, setDeck] = useState<Scenario[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    status: 'intro',
    score: 0,
    currentRound: 0,
    history: []
  });
  const [highlightHand, setHighlightHand] = useState<'Nice' | 'Naughty' | null>(null);

  // Initialize deck on mount
  useEffect(() => {
    setDeck(getShuffledScenarios());
  }, []);

  const startGame = () => {
    setDeck(getShuffledScenarios());
    setGameState({
      status: 'playing',
      score: 0,
      currentRound: 0,
      history: []
    });
  };

  const handleSwipe = useCallback((verdict: Verdict) => {
    const currentScenario = deck[gameState.currentRound];
    const isCorrect = verdict === currentScenario.verdict;

    // Visual feedback on the elf
    setHighlightHand(verdict);
    setTimeout(() => setHighlightHand(null), 500);

    setGameState(prev => {
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newHistory = [...prev.history, { scenario: currentScenario, choice: verdict }];
      const newRound = prev.currentRound + 1;

      if (newRound >= TOTAL_ROUNDS) {
        // Trigger checking phase
        setTimeout(() => {
            setGameState(g => ({ ...g, status: 'results' }));
        }, 2000);
        return {
            ...prev,
            score: newScore,
            history: newHistory,
            currentRound: newRound,
            status: 'checking'
        };
      }

      return {
        ...prev,
        score: newScore,
        history: newHistory,
        currentRound: newRound
      };
    });
  }, [deck, gameState.currentRound]);

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden relative font-sans text-slate-800">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 z-0"></div>
      
      {/* Snowfall Effect (Simple CSS animation simulation via dots) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: -10, x: Math.random() * window.innerWidth }}
                animate={{ y: window.innerHeight + 10, x: Math.random() * window.innerWidth }}
                transition={{ repeat: Infinity, duration: 5 + Math.random() * 10, ease: "linear" }}
                className="absolute w-2 h-2 bg-white rounded-full"
            />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        
        {/* Header */}
        <div className="absolute top-6 w-full flex justify-between items-center px-6 max-w-4xl">
            <div className="flex items-center space-x-2 text-red-400">
                <Snowflake className="w-6 h-6 animate-spin-slow" />
                <span className="font-bold tracking-widest text-sm uppercase">North Pole HR Dept.</span>
            </div>
            {gameState.status === 'playing' && (
                 <div className="bg-slate-800 px-4 py-2 rounded-full border border-slate-700 text-slate-300 font-mono text-sm">
                    Case {gameState.currentRound + 1}/{TOTAL_ROUNDS}
                 </div>
            )}
        </div>

        {/* Main Game Area */}
        <AnimatePresence mode="wait">
          
          {/* INTRO SCREEN */}
          {gameState.status === 'intro' && (
            <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8 max-w-lg"
            >
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
                    <ElfStatue verdictHighlight={null} />
                </div>
                
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                        <span className="text-red-500">Naughty</span> or <span className="text-green-500">Nice</span>?
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        Santa is busy, so it's up to you, Elf! Swipe the cards to sort the children. 
                        Santa will check your work after <span className="text-white font-bold">{TOTAL_ROUNDS} cases</span>.
                    </p>
                </div>

                <button 
                    onClick={startGame}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:bg-red-700 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                >
                   <span>Start Sorting</span>
                   <Star className="ml-2 w-5 h-5 group-hover:rotate-180 transition-transform" />
                </button>
            </motion.div>
          )}

          {/* PLAYING SCREEN */}
          {gameState.status === 'playing' && (
             <div className="flex flex-col items-center justify-center w-full h-full max-w-lg relative">
                 
                 {/* The Elf Statue (Background of card) */}
                 <div className="transform scale-90 md:scale-100 transition-transform mb-12 opacity-90">
                     <ElfStatue verdictHighlight={highlightHand} />
                 </div>

                 {/* The Active Card */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12 w-full flex justify-center h-64">
                    <AnimatePresence>
                        {deck[gameState.currentRound] && (
                            <GameCard 
                                key={deck[gameState.currentRound].id} 
                                scenario={deck[gameState.currentRound]} 
                                onSwipe={handleSwipe} 
                            />
                        )}
                    </AnimatePresence>
                 </div>

                 {/* Controls Hint */}
                 <div className="absolute bottom-10 flex justify-between w-full px-12 text-white font-bold opacity-50 pointer-events-none">
                     <div className="flex flex-col items-center">
                         <span className="text-2xl">←</span>
                         <span className="text-xs uppercase tracking-widest text-red-400">Naughty</span>
                     </div>
                     <div className="flex flex-col items-center">
                         <span className="text-2xl">→</span>
                         <span className="text-xs uppercase tracking-widest text-green-400">Nice</span>
                     </div>
                 </div>
             </div>
          )}

          {/* CHECKING SCREEN */}
          {gameState.status === 'checking' && (
              <motion.div 
                key="checking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-white"
              >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="mb-8"
                  >
                      <RefreshCw className="w-16 h-16 text-white opacity-80" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">Checking it twice...</h2>
                  <p className="text-slate-400">Santa is reviewing your decisions.</p>
              </motion.div>
          )}

          {/* RESULTS SCREEN */}
          {gameState.status === 'results' && (
              <ScoreScreen gameState={gameState} onRestart={startGame} />
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}