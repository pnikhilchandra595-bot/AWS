import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { UserStats } from '../types';

interface ShareProgressProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  userName: string;
}

export default function ShareProgress({ isOpen, onClose, stats, userName }: ShareProgressProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `🚀 My DevFlow AI Progress

👤 ${userName}
⚡ Level ${stats.level}
🎯 ${stats.xp} XP
📚 ${stats.conceptsLearned} Concepts Learned
🏆 ${stats.questionsAnswered} Questions Answered
🔥 ${stats.streak} Day Streak

Join me on DevFlow AI - The next-gen developer learning platform!
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = () => {
    // Create a canvas to generate share image
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d')!;

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#1e1b4b');
    gradient.addColorStop(1, '#7c3aed');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.fillText('DevFlow AI Progress', 60, 100);

    // Stats
    ctx.font = 'bold 40px Arial';
    ctx.fillText(`Level ${stats.level}`, 60, 200);
    ctx.fillText(`${stats.xp} XP`, 60, 260);
    ctx.fillText(`${stats.conceptsLearned} Concepts`, 60, 320);
    ctx.fillText(`${stats.questionsAnswered} Questions`, 60, 380);
    ctx.fillText(`${stats.streak} Day Streak`, 60, 440);

    // User name
    ctx.font = '30px Arial';
    ctx.fillStyle = '#a78bfa';
    ctx.fillText(userName, 60, 550);

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'devflow-progress.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My DevFlow AI Progress',
          text: shareText,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-purple-500/30 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Share2 size={24} className="text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Share Your Progress</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Preview Card */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 mb-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">🚀 {userName}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-3xl font-bold text-purple-400">{stats.level}</div>
                      <div className="text-xs text-slate-400">Level</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-3xl font-bold text-pink-400">{stats.xp}</div>
                      <div className="text-xs text-slate-400">XP</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-400">{stats.conceptsLearned}</div>
                      <div className="text-xs text-slate-400">Concepts</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-400">{stats.streak}🔥</div>
                      <div className="text-xs text-slate-400">Day Streak</div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    <Share2 size={18} />
                    Share Progress
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCopy}
                    className="w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadImage}
                    className="w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
                  >
                    <Download size={18} />
                    Download Image
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
