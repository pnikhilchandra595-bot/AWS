import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  category: string;
  completed: boolean;
  code?: string;
}

interface DailyChallengesProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (challengeId: string, xp: number) => void;
  userStreak: number;
}

const generateDailyChallenge = (): Challenge => {
  const challenges = [
    {
      id: 'day-1',
      title: 'Array Manipulation Master',
      description: 'Write a function that removes duplicates from an array without using Set',
      difficulty: 'medium' as const,
      xpReward: 150,
      category: 'Algorithms',
      code: 'function removeDuplicates(arr) {\n  // Your code here\n}'
    },
    {
      id: 'day-2',
      title: 'React Hook Challenge',
      description: 'Create a custom hook that debounces a value',
      difficulty: 'hard' as const,
      xpReward: 200,
      category: 'React',
      code: 'function useDebounce(value, delay) {\n  // Your code here\n}'
    },
    {
      id: 'day-3',
      title: 'String Reversal',
      description: 'Reverse a string without using built-in reverse method',
      difficulty: 'easy' as const,
      xpReward: 100,
      category: 'Basics',
      code: 'function reverseString(str) {\n  // Your code here\n}'
    }
  ];

  const today = new Date().getDate() % challenges.length;
  return { ...challenges[today], completed: false };
};

const DailyChallenges: React.FC<DailyChallengesProps> = ({
  isOpen,
  onClose,
  onComplete,
  userStreak
}) => {
  const [challenge, setChallenge] = useState<Challenge>(generateDailyChallenge());
  const [userCode, setUserCode] = useState(challenge.code || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedChallenge = localStorage.getItem('daily_challenge');
    const savedDate = localStorage.getItem('daily_challenge_date');
    const today = new Date().toDateString();

    if (savedDate === today && savedChallenge) {
      setChallenge(JSON.parse(savedChallenge));
    } else {
      const newChallenge = generateDailyChallenge();
      setChallenge(newChallenge);
      localStorage.setItem('daily_challenge', JSON.stringify(newChallenge));
      localStorage.setItem('daily_challenge_date', today);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate code evaluation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedChallenge = { ...challenge, completed: true };
    setChallenge(updatedChallenge);
    localStorage.setItem('daily_challenge', JSON.stringify(updatedChallenge));
    
    setShowSuccess(true);
    onComplete(challenge.id, challenge.xpReward);
    setIsSubmitting(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'hard': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#0a0f16] border-2 border-pixel-green/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/50"
              >
                <ICONS.Target size={24} className="text-orange-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">Daily Challenge</h2>
                <p className="text-sm text-slate-400 font-mono">Complete to maintain your streak!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Streak Display */}
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-lg px-4 py-2">
                <ICONS.Flame size={20} className="text-orange-400" />
                <div>
                  <div className="text-xs text-slate-400 font-mono">Streak</div>
                  <div className="text-lg font-bold text-orange-400 font-mono">{userStreak} days</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
              >
                <ICONS.X size={24} className="text-slate-400 group-hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <ICONS.Trophy size={64} className="text-green-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2 font-mono">Challenge Complete!</h3>
                <p className="text-slate-400 mb-4 font-mono">You earned {challenge.xpReward} XP</p>
                <div className="flex items-center gap-2 text-orange-400 font-mono">
                  <ICONS.Flame size={24} />
                  <span className="text-xl font-bold">{userStreak + 1} Day Streak!</span>
                </div>
                <button
                  onClick={onClose}
                  className="mt-8 px-6 py-3 bg-pixel-green hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors font-mono"
                >
                  Awesome!
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="challenge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Challenge Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border font-mono ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono">
                      {challenge.category}
                    </span>
                    <div className="ml-auto flex items-center gap-2 text-yellow-400">
                      <ICONS.Zap size={16} />
                      <span className="font-bold font-mono">+{challenge.xpReward} XP</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-mono">{challenge.title}</h3>
                  <p className="text-slate-300 font-mono leading-relaxed">{challenge.description}</p>
                </div>

                {/* Code Editor */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                  <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">solution.js</span>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                  </div>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 bg-slate-900 text-white p-4 font-mono text-sm resize-none focus:outline-none"
                    placeholder="Write your solution here..."
                    spellCheck={false}
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-mono">
                    💡 Tip: Test your code before submitting!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !userCode.trim() || challenge.completed}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-mono shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  >
                    {isSubmitting ? (
                      <>
                        <ICONS.Loader2 size={20} className="animate-spin" />
                        Evaluating...
                      </>
                    ) : challenge.completed ? (
                      <>
                        <ICONS.CheckCircle2 size={20} />
                        Completed
                      </>
                    ) : (
                      <>
                        <ICONS.Send size={20} />
                        Submit Solution
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DailyChallenges;
