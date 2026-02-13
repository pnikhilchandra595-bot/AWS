import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';
import { UserStats } from '../types';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  streak: { currentStreak: number; longestStreak: number };
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ isOpen, onClose, stats, streak }) => {
  if (!isOpen) return null;

  const accuracy = stats.questionsAnswered > 0 
    ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100) 
    : 0;

  const topicMastery = [
    { name: 'Frontend', progress: 75, color: 'from-blue-500 to-cyan-500' },
    { name: 'Backend', progress: 60, color: 'from-purple-500 to-pink-500' },
    { name: 'Algorithms', progress: 45, color: 'from-orange-500 to-red-500' },
    { name: 'DevOps', progress: 30, color: 'from-green-500 to-emerald-500' },
  ];

  const weeklyActivity = [
    { day: 'Mon', xp: 120 },
    { day: 'Tue', xp: 80 },
    { day: 'Wed', xp: 150 },
    { day: 'Thu', xp: 90 },
    { day: 'Fri', xp: 200 },
    { day: 'Sat', xp: 60 },
    { day: 'Sun', xp: 110 },
  ];

  const maxXP = Math.max(...weeklyActivity.map(d => d.xp));

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
        className="w-full max-w-6xl bg-[#0a0f16] border-2 border-pixel-green/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pixel-green/20 to-blue-500/20 border-b border-slate-800 p-6 sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 bg-pixel-green/20 rounded-xl border border-pixel-green/50"
              >
                <ICONS.BarChart2 size={24} className="text-pixel-green" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">Analytics Dashboard</h2>
                <p className="text-sm text-slate-400 font-mono">Your Learning Journey</p>
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

        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              icon={ICONS.Trophy}
              label="Level"
              value={stats.level}
              color="text-yellow-400"
              bgColor="bg-yellow-500/10"
              borderColor="border-yellow-500/30"
            />
            <MetricCard
              icon={ICONS.Zap}
              label="Total XP"
              value={stats.xp}
              color="text-pixel-green"
              bgColor="bg-pixel-green/10"
              borderColor="border-pixel-green/30"
            />
            <MetricCard
              icon={ICONS.Target}
              label="Accuracy"
              value={`${accuracy}%`}
              color="text-blue-400"
              bgColor="bg-blue-500/10"
              borderColor="border-blue-500/30"
            />
            <MetricCard
              icon={ICONS.Flame}
              label="Streak"
              value={`${streak.currentStreak}d`}
              color="text-orange-400"
              bgColor="bg-orange-500/10"
              borderColor="border-orange-500/30"
            />
          </div>

          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
              <ICONS.TrendingUp size={20} className="text-pixel-green" />
              Weekly Activity
            </h3>
            <div className="flex items-end justify-between gap-3 h-48">
              {weeklyActivity.map((day, i) => (
                <motion.div
                  key={day.day}
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.xp / maxXP) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="text-xs text-slate-400 font-mono">{day.xp}</div>
                  <div className="w-full bg-gradient-to-t from-pixel-green to-emerald-400 rounded-t-lg shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                  <div className="text-xs text-slate-500 font-mono">{day.day}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Topic Mastery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
              <ICONS.Target size={20} className="text-pixel-green" />
              Topic Mastery
            </h3>
            <div className="space-y-4">
              {topicMastery.map((topic, i) => (
                <div key={topic.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-300 font-mono">{topic.name}</span>
                    <span className="text-sm text-pixel-green font-mono font-bold">{topic.progress}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.progress}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${topic.color} shadow-[0_0_10px_rgba(34,197,94,0.5)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatBox
              icon={ICONS.BrainCircuit}
              label="Concepts Learned"
              value={stats.conceptsLearned}
              color="text-cyan-400"
            />
            <StatBox
              icon={ICONS.CheckCircle2}
              label="Questions Solved"
              value={stats.correctAnswers}
              color="text-emerald-400"
            />
            <StatBox
              icon={ICONS.RefreshCw}
              label="Code Refactored"
              value={stats.refactorsPerformed}
              color="text-purple-400"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MetricCard = ({ icon: Icon, label, value, color, bgColor, borderColor }: any) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className={`${bgColor} border ${borderColor} rounded-xl p-4 text-center`}
  >
    <Icon size={24} className={`${color} mx-auto mb-2`} />
    <div className={`text-3xl font-black ${color} font-mono`}>{value}</div>
    <div className="text-xs text-slate-500 uppercase tracking-wider font-mono mt-1">{label}</div>
  </motion.div>
);

const StatBox = ({ icon: Icon, label, value, color }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4"
  >
    <div className={`p-3 ${color.replace('text-', 'bg-')}/20 rounded-lg`}>
      <Icon size={24} className={color} />
    </div>
    <div>
      <div className={`text-2xl font-bold ${color} font-mono`}>{value}</div>
      <div className="text-xs text-slate-500 font-mono">{label}</div>
    </div>
  </motion.div>
);

export default AnalyticsDashboard;
