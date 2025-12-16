
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Volume2, VolumeX, Star, RefreshCw, Mail } from 'lucide-react';
import { ElfStatue } from './components/ElfStatue';
import { GameCard } from './components/GameCard';
import { ScoreScreen } from './components/ScoreScreen';
import { Effects } from './components/Effects';
import { Timer } from './components/Timer';
import { SantaSleigh } from './components/SantaSleigh';
import { SCENARIOS, getShuffledScenarios, TOTAL_ROUNDS, GOOD_GIFTS, BAD_GIFTS } from './constants';
import { GameState, Scenario, Verdict } from './types';

// Audio URLs
const BGM_URL = "https://actions.google.com/sounds/v1/holidays/jingle_bells.ogg";
const SFX_NICE = "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"; 
const SFX_NAUGHTY = "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"; // Changed to wooden bonk
const SFX_WIN = "https://actions.google.com/sounds/v1/crowds/battle_crowd_celebrate_stutter.ogg";
const SFX_LOSE = "https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg";
const SFX_WOOSH = "https://actions.google.com/sounds/v1/foley/whoosh.ogg";
const SFX_SLEIGH = "https://actions.google.com/sounds/v1/transportation/sleigh_bells.ogg"; 

export default function App() {
  const [deck, setDeck] = useState<Scenario[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    status: 'intro',
    level: 1,
    score: 0,
    maxScore: TOTAL_ROUNDS,
    currentRound: 0,
    history: []
  });
  const [highlightHand, setHighlightHand] = useState<'Nice' | 'Naughty' | 'Load' | 'Reject' | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showEffects, setShowEffects] = useState<'Nice' | 'Naughty' | null>(null);
  const [showBriefing, setShowBriefing] = useState(false);

  // Audio Refs
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const niceSfxRef = useRef<HTMLAudioElement | null>(null);
  const naughtySfxRef = useRef<HTMLAudioElement | null>(null);
  const winSfxRef = useRef<HTMLAudioElement | null>(null);
  const loseSfxRef = useRef<HTMLAudioElement | null>(null);
  const wooshSfxRef = useRef<HTMLAudioElement | null>(null);
  const sleighSfxRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    bgmRef.current = new Audio(BGM_URL);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.2;

    niceSfxRef.current = new Audio(SFX_NICE);
    niceSfxRef.current.volume = 0.5;
    
    naughtySfxRef.current = new Audio(SFX_NAUGHTY);
    naughtySfxRef.current.volume = 0.6; // Increased volume slightly for the bonk

    winSfxRef.current = new Audio(SFX_WIN);
    winSfxRef.current.volume = 0.6;

    loseSfxRef.current = new Audio(SFX_LOSE);
    loseSfxRef.current.volume = 0.5;

    wooshSfxRef.current = new Audio(SFX_WOOSH);
    
    sleighSfxRef.current = new Audio(SFX_SLEIGH);
    sleighSfxRef.current.volume = 0.7;

    return () => {
      bgmRef.current?.pause();
    };
  }, []);

  // Handle Mute Toggle
  useEffect(() => {
    if (bgmRef.current) {
      if (isMuted) {
        bgmRef.current.pause();
      } else if (gameState.status !== 'intro' && gameState.status !== 'results') {
        bgmRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, gameState.status]);

  // Handle End Game Sounds
  useEffect(() => {
    if (gameState.status === 'results' && !isMuted) {
        const percentage = (gameState.score / gameState.maxScore) * 100;
        if (percentage >= 50) {
            winSfxRef.current?.play().catch(() => {});
        } else {
            loseSfxRef.current?.play().catch(() => {});
        }
    }
  }, [gameState.status, gameState.score, gameState.maxScore, isMuted]);

  // Initialize deck on mount
  useEffect(() => {
    setDeck(getShuffledScenarios());
  }, []);

  const playSfx = (verdict: Verdict) => {
    if (isMuted) return;
    if (verdict === 'Nice' || verdict === 'Load') {
      niceSfxRef.current?.pause();
      niceSfxRef.current!.currentTime = 0;
      niceSfxRef.current?.play().catch(() => {});
    } else {
      naughtySfxRef.current?.pause();
      naughtySfxRef.current!.currentTime = 0;
      naughtySfxRef.current?.play().catch(() => {});
    }
  };

  const startGame = () => {
    setDeck(getShuffledScenarios().slice(0, TOTAL_ROUNDS)); // limit rounds
    setGameState({
      status: 'playing',
      level: 1,
      score: 0,
      maxScore: TOTAL_ROUNDS,
      currentRound: 0,
      history: []
    });
    setShowBriefing(false);
    
    // Start BGM
    if (!isMuted && bgmRef.current) {
        bgmRef.current.currentTime = 0;
        bgmRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
    }
  };

  const startLevel2 = () => {
     // Prepare Level 2
     // Filter Correct Nice Choices from Level 1
     const niceKids = gameState.history.filter(h => h.choice === 'Nice' && h.scenario.verdict === 'Nice');
     
     if (niceKids.length === 0) {
         // Rare edge case: player marked everyone naughty or got all nice kids wrong
         setGameState(prev => ({ ...prev, status: 'results' }));
         return;
     }

     // Create Level 2 Deck
     const level2Deck: Scenario[] = niceKids.map((item, index) => {
        const isGoodGift = Math.random() > 0.4; // 60% chance of good gift
        const gift = isGoodGift 
            ? GOOD_GIFTS[Math.floor(Math.random() * GOOD_GIFTS.length)]
            : BAD_GIFTS[Math.floor(Math.random() * BAD_GIFTS.length)];
        
        return {
            id: 100 + index,
            text: gift.text, // The Gift Name
            verdict: isGoodGift ? 'Load' : 'Reject', // Correct Action
            reason: item.scenario.text, // The original deed (as context)
            illustration: gift.icon
        };
     });

     setDeck(level2Deck);
     setGameState(prev => ({
         ...prev,
         level: 2,
         currentRound: 0,
         maxScore: prev.maxScore + level2Deck.length, // Add L2 max score
         status: 'playing'
     }));
  };

  const handleSwipe = useCallback((verdict: Verdict) => {
    const currentScenario = deck[gameState.currentRound];
    if (!currentScenario) return;

    const isCorrect = verdict === currentScenario.verdict;

    // Trigger Audio & Visuals
    playSfx(verdict);
    setHighlightHand(verdict);
    
    // Map Load/Reject to visual effects of Nice/Naughty
    const effectType = (verdict === 'Nice' || verdict === 'Load') ? 'Nice' : 'Naughty';
    setShowEffects(effectType);

    // Reset visual triggers
    setTimeout(() => {
        setHighlightHand(null);
        setShowEffects(null);
    }, 800);

    setGameState(prev => {
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newHistory = [...prev.history, { scenario: currentScenario, choice: verdict }];
      const newRound = prev.currentRound + 1;

      // Check if Deck is empty
      if (newRound >= deck.length) {
        
        // If End of Level 1
        if (prev.level === 1) {
            setTimeout(() => {
                // Check if they passed Level 1 (>= 50%)
                const passRate = newScore / TOTAL_ROUNDS;
                if (passRate >= 0.5) {
                    setGameState(g => ({ ...g, status: 'transition', score: newScore, history: newHistory }));
                    // Trigger Transition Animation
                    if (!isMuted) {
                        wooshSfxRef.current?.play().catch(() => {});
                        // Delay bells to match visual entrance (0.5s delay in SantaSleigh.tsx)
                        setTimeout(() => {
                             sleighSfxRef.current?.play().catch(() => {});
                        }, 500);
                    }
                    setTimeout(() => startLevel2(), 4500); // Wait for Santa Animation
                } else {
                    setGameState(g => ({ ...g, status: 'results', score: newScore, history: newHistory }));
                }
            }, 1000);
            return { ...prev, score: newScore, history: newHistory, currentRound: newRound, status: 'checking' };
        } 
        
        // If End of Level 2
        else {
             setTimeout(() => {
                setGameState(g => ({ ...g, status: 'results' }));
             }, 1000);
             return { ...prev, score: newScore, history: newHistory, currentRound: newRound, status: 'checking' };
        }
      }

      return {
        ...prev,
        score: newScore,
        history: newHistory,
        currentRound: newRound
      };
    });
  }, [deck, gameState.currentRound, gameState.level, isMuted]);

  // Handle timer running out
  const handleTimeUp = useCallback(() => {
      // Random choice appropriate for level
      let randomChoice: Verdict;
      if (gameState.level === 1) {
          randomChoice = Math.random() > 0.5 ? 'Nice' : 'Naughty';
      } else {
          randomChoice = Math.random() > 0.5 ? 'Load' : 'Reject';
      }
      handleSwipe(randomChoice);
  }, [handleSwipe, gameState.level]);

  // Visual Styling helpers
  const getBgGradient = () => {
      if (gameState.level === 2) return "from-[#0f172a] via-[#1e293b] to-[#0f172a]"; // Starry Night for sleigh
      return "from-[#0B1026] via-[#1B2240] to-[#2B1B1B]"; // Cozy Cabin for Sorting
  };

  return (
    <div className={`min-h-screen bg-[#0f172a] overflow-hidden relative font-sans text-slate-800 selection:bg-red-200 transition-colors duration-1000`}>
      {/* --- BACKGROUND LAYERS --- */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getBgGradient()} z-0 transition-all duration-1000`}></div>
      
      {/* Level 1 Bottom Glow */}
      {gameState.level === 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#ff7b0033] via-[#ff450011] to-transparent z-0 animate-pulse-slow pointer-events-none"></div>
      )}

      {/* Level 2 Stars */}
      {gameState.level === 2 && (
        <div className="absolute inset-0 z-0 opacity-50">
             {[...Array(50)].map((_, i) => (
                 <div key={i} className="absolute bg-white rounded-full w-1 h-1 animate-pulse" style={{ top: Math.random()*100+'%', left: Math.random()*100+'%', animationDelay: Math.random()+'s' }} />
             ))}
        </div>
      )}

      {/* Dynamic Background Pulse */}
      <div className={`absolute inset-0 opacity-30 transition-colors duration-500 pointer-events-none z-1
          ${highlightHand === 'Nice' || highlightHand === 'Load' ? 'bg-green-600' : 
            highlightHand === 'Naughty' || highlightHand === 'Reject' ? 'bg-red-600' : 'bg-transparent'}
      `}></div>

      {/* --- SNOWFALL EFFECT --- */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        {[...Array(40)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: -50, x: 0, opacity: 0 }}
                animate={{ 
                    y: "110vh", 
                    x: Math.random() * 40 - 20,
                    opacity: [0, 0.8, 0.8, 0]
                }}
                transition={{ 
                    duration: 5 + Math.random() * 10, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 10
                }}
                className="absolute w-2 h-2 bg-white rounded-full blur-[1px] shadow-[0_0_5px_white]"
                style={{ 
                    left: `${Math.random() * 100}%`,
                    scale: 0.5 + Math.random() * 0.5 
                }}
            />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        
        {/* Header & Controls */}
        <div className="absolute top-0 w-full flex justify-between items-start px-6 pt-6 pb-12 max-w-4xl z-50">
            <div className="flex items-center space-x-2 text-white/80 drop-shadow-md">
                <Snowflake className="w-10 h-10 animate-spin-slow" />
                <span className="font-christmas font-bold tracking-wider text-2xl hidden sm:block">North Pole {gameState.level === 1 ? 'HR' : 'Logistics'}</span>
            </div>
            
            <div className="flex items-center space-x-4">
                 <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full bg-slate-800/50 backdrop-blur text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-600/50"
                 >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                 </button>

                 {gameState.status === 'playing' && (
                     <div className="bg-slate-800/80 backdrop-blur px-6 py-2 rounded-full border border-slate-600/50 text-slate-200 font-christmas text-xl shadow-lg">
                        {gameState.level === 1 ? `Case ${gameState.currentRound + 1}/${TOTAL_ROUNDS}` : `Gift ${gameState.currentRound + 1}/${deck.length}`}
                     </div>
                 )}
            </div>
        </div>

        {/* Fancy Explosion Effects Layer */}
        <AnimatePresence>
            {showEffects && <Effects type={showEffects} />}
        </AnimatePresence>

        {/* TRANSITION ANIMATION LAYER */}
        <AnimatePresence>
            {gameState.status === 'transition' && <SantaSleigh />}
        </AnimatePresence>

        {/* BRIEFING MODAL (Step 2 of Intro) */}
        <AnimatePresence>
            {showBriefing && (
                <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/85 backdrop-blur-md p-4"
                >
                   <motion.div 
                       initial={{ scale: 0.8, y: 20 }}
                       animate={{ scale: 1, y: 0 }}
                       className="bg-slate-800/90 border-2 border-yellow-500/50 p-8 rounded-2xl max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
                   >
                       {/* Decorative Strip */}
                       <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500"></div>
                       <div className="absolute top-6 right-6 text-yellow-500 opacity-50"><Mail className="w-12 h-12" /></div>
                       
                       <h2 className="text-5xl font-christmas text-yellow-400 mb-6 drop-shadow-md">Message from Jingles</h2>
                       
                       <div className="text-left space-y-4 mb-8">
                           <p className="text-xl md:text-2xl text-slate-100 font-christmas leading-relaxed">
                               Ho Ho Hello!
                           </p>
                           <p className="text-lg md:text-xl text-slate-300 font-sans leading-relaxed">
                               I'm <strong>Jingles</strong>, the Head of List Management. Christmas is almost here and we are slightly... behind schedule.
                           </p>
                           <div className="bg-black/30 p-4 rounded-lg border border-slate-600/50">
                               <p className="text-lg md:text-xl text-slate-200 font-sans">
                                   <span className="text-yellow-400 font-bold">Step 1:</span> Sort the kids (Naughty vs Nice).<br/>
                                   <span className="text-yellow-400 font-bold">Step 2:</span> Load the correct gifts onto the sleigh.
                               </p>
                           </div>
                           <p className="text-base text-yellow-200/80 italic text-center pt-2">
                               "Don't mess this up, or we're all getting coal!"
                           </p>
                       </div>

                       <button 
                           onClick={startGame}
                           className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-2xl font-bold text-white transition-all duration-200 bg-green-600 border-b-4 border-green-800 rounded-lg hover:bg-green-500 hover:scale-[1.02] active:scale-95 font-christmas"
                       >
                          <span>Let's Sort!</span>
                          <Star className="ml-2 w-6 h-6 group-hover:spin-slow" />
                       </button>
                   </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Main Game Area */}
        <AnimatePresence mode="wait">
          
          {/* INTRO SCREEN (Step 1) */}
          {gameState.status === 'intro' && (
            <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-4 max-w-4xl relative z-20 flex flex-col items-center justify-center h-full pb-20"
            >
                {/* Visuals */}
                <div className="relative inline-block mb-2 transform scale-110 md:scale-125">
                    <div className="absolute inset-0 bg-yellow-400 blur-[80px] opacity-20 rounded-full animate-pulse"></div>
                    <ElfStatue verdictHighlight={null} level={1} />
                </div>
                
                {/* Title */}
                <div className="space-y-0 relative z-10">
                    <h1 className="text-7xl md:text-[9rem] font-bold text-white tracking-tight drop-shadow-2xl font-christmas leading-[0.85] text-shadow-glow">
                        <span className="text-red-500 block transform -rotate-2">Naughty</span>
                        <span className="text-4xl md:text-6xl text-white opacity-90 block my-2 font-sans tracking-widest uppercase">or</span>
                        <span className="text-green-500 block transform rotate-2">Nice?</span>
                    </h1>
                </div>

                {/* Main Action */}
                {!showBriefing && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="pt-12"
                    >
                        <button 
                            onClick={() => setShowBriefing(true)}
                            className="group relative inline-flex items-center justify-center px-12 py-6 text-3xl font-bold text-white transition-all duration-200 bg-red-600 border-4 border-white/20 rounded-full focus:outline-none hover:bg-red-700 hover:scale-110 shadow-[0_0_50px_rgba(220,38,38,0.5)] font-christmas animate-pulse-slow"
                        >
                           <span>Enter Workshop</span>
                           <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 text-xs font-bold px-2 py-1 rounded-full border-2 border-white transform rotate-12">OPEN!</span>
                        </button>
                    </motion.div>
                )}
            </motion.div>
          )}

          {/* PLAYING SCREEN */}
          {gameState.status === 'playing' && (
             <div className="flex flex-col items-center justify-center w-full h-full max-w-lg relative">
                 
                 {/* Timer Component */}
                 <div className="absolute top-20 w-full px-8 z-30">
                    <Timer 
                        duration={gameState.level === 1 ? 10 : 5} // Faster timer for Level 2
                        isActive={!highlightHand} 
                        resetKey={gameState.currentRound + (gameState.level * 100)} // Ensure reset on level change
                        onTimeUp={handleTimeUp}
                    />
                 </div>

                 {/* The Elf Statue (Background) */}
                 <div className="transform scale-90 md:scale-100 transition-transform mb-12 opacity-90 drop-shadow-2xl">
                     <ElfStatue verdictHighlight={highlightHand} level={gameState.level} />
                 </div>

                 {/* The Active Card */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12 w-full flex justify-center h-64 perspective-1000">
                    <AnimatePresence>
                        {deck[gameState.currentRound] && (
                            <GameCard 
                                key={deck[gameState.currentRound].id} 
                                scenario={deck[gameState.currentRound]} 
                                onSwipe={handleSwipe} 
                                level={gameState.level}
                            />
                        )}
                    </AnimatePresence>
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
                    className="mb-8 inline-block bg-white/10 p-4 rounded-full backdrop-blur"
                  >
                      <RefreshCw className="w-20 h-20 text-white" />
                  </motion.div>
                  <h2 className="text-6xl font-bold mb-4 font-christmas text-yellow-300">
                     {gameState.level === 1 ? "Checking..." : "Inspecting..."}
                  </h2>
                  <p className="text-slate-300 text-3xl font-christmas">
                     {gameState.level === 1 ? "Making a list." : "Checking it twice."}
                  </p>
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
