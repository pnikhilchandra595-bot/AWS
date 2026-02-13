import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface JutsuUnlockedProps {
  jutsu: {
    name: string;
    icon: string;
    description: string;
    xp: number;
  } | null;
  onClose: () => void;
}

export default function JutsuUnlocked({ jutsu, onClose }: JutsuUnlockedProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (jutsu) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [jutsu, onClose]);

  return (
    <AnimatePresence>
      {jutsu && (
        <>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
              colors={['#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899']}
            />
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 blur-3xl opacity-50 animate-pulse" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-4 border-orange-500 rounded-3xl p-8 max-w-md">
                {/* Header */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center mb-6"
                >
                  <div className="text-8xl mb-4">{jutsu.icon}</div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 mb-2">
                    JUTSU UNLOCKED!
                  </h2>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {jutsu.name}
                  </h3>
                  <p className="text-slate-300">{jutsu.description}</p>
                </motion.div>

                {/* XP Reward */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-4 text-center"
                >
                  <div className="text-4xl font-bold text-yellow-400">+{jutsu.xp} XP</div>
                  <div className="text-sm text-slate-300">Bonus Reward</div>
                </motion.div>

                {/* Ninja Seals Animation */}
                <div className="absolute -top-10 -right-10 text-6xl opacity-20 animate-spin-slow">
                  🌀
                </div>
                <div className="absolute -bottom-10 -left-10 text-6xl opacity-20 animate-spin-slow" style={{ animationDirection: 'reverse' }}>
                  ⚡
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
