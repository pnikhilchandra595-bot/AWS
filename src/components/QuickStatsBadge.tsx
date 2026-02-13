import { motion } from 'framer-motion';
import { Trophy, Zap, Flame } from 'lucide-react';
import { UserStats } from '../types';

interface QuickStatsBadgeProps {
  stats: UserStats;
}

export default function QuickStatsBadge({ stats }: QuickStatsBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2"
    >
      {/* Level Badge */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-3 py-1.5"
        title={`Level ${stats.level}`}
      >
        <Trophy size={14} className="text-purple-400" />
        <span className="text-xs font-bold text-purple-300">{stats.level}</span>
      </motion.div>

      {/* XP Badge */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full px-3 py-1.5"
        title={`${stats.xp} XP`}
      >
        <Zap size={14} className="text-blue-400" />
        <span className="text-xs font-bold text-blue-300">{stats.xp}</span>
      </motion.div>

      {/* Streak Badge */}
      {stats.streak > 0 && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-3 py-1.5"
          title={`${stats.streak} day streak`}
        >
          <Flame size={14} className="text-orange-400" />
          <span className="text-xs font-bold text-orange-300">{stats.streak}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
