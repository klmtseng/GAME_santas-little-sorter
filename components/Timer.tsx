
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  resetKey: number; // changing this resets the timer
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, resetKey, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [resetKey, duration]);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 0.1));
    }, 100);

    return () => clearInterval(interval);
  }, [timeLeft, isActive, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isUrgent = percentage < 30;

  return (
    <div className="w-full max-w-xs mx-auto mt-4 mb-2">
      <div className="flex justify-between text-2xl font-bold font-christmas tracking-widest text-slate-300 mb-1 drop-shadow-md">
        <span>Decision Time</span>
        <span className={isUrgent ? 'text-red-400 animate-pulse' : 'text-slate-200'}>
            {Math.ceil(timeLeft)}s
        </span>
      </div>
      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border-2 border-slate-600 shadow-inner">
        <motion.div
          className={`h-full ${isUrgent ? 'bg-red-500' : 'bg-green-500'}`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
    </div>
  );
};
