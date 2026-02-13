import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  xp: number;
}

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementNotification({ achievement, onClose }: Props) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (achievement) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  const Icon = achievement ? ICONS[achievement.icon] : null;

  return (
    <AnimatePresence>
      {achievement && (
        <>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
              gravity={0.3}
            />
          )}
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl border-2 border-yellow-500/50 rounded-xl p-6 shadow-2xl min-w-[320px]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/40 blur-xl rounded-full animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4">
                    {Icon && <Icon size={32} className="text-white" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <ICONS.Trophy size={16} className="text-yellow-400" />
                    <span className="text-xs font-mono text-yellow-400 uppercase tracking-wider">Achievement Unlocked!</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
                  <p className="text-sm text-slate-300">{achievement.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <ICONS.Zap size={14} className="text-pixel-green" />
                    <span className="text-xs font-mono text-pixel-green">+{achievement.xp} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
