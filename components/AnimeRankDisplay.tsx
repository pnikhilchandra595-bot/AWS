import { motion } from 'framer-motion';
import { getNarutoRank } from '../data/narutoRanks';
import { UserStats } from '../types';

interface AnimeRankDisplayProps {
  stats: UserStats;
  streak: number;
}

export default function AnimeRankDisplay({ stats, streak }: AnimeRankDisplayProps) {
  const rank = getNarutoRank(stats.level);
  const nextRankLevel = stats.level < 100 ? Math.ceil(stats.level / 10) * 10 : 100;
  const progress = ((stats.level % 10) / 10) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${rank.gradient} opacity-10 blur-xl`} />
      
      {/* Main Card */}
      <div className={`relative bg-gradient-to-br ${rank.gradient} p-1 rounded-2xl`}>
        <div className="bg-slate-900 rounded-xl p-6">
          {/* Rank Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-5xl"
              >
                {rank.icon}
              </motion.div>
              <div>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${rank.gradient} bg-clip-text text-transparent`}>
                  {rank.title}
                </h3>
                <p className="text-sm text-slate-400">Level {stats.level}</p>
              </div>
            </div>
            
            {/* XP Display */}
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{stats.xp}</div>
              <div className="text-xs text-slate-400">Total XP</div>
            </div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 p-3 bg-slate-800/50 rounded-lg border-l-4 border-current"
            style={{ borderColor: rank.color }}
          >
            <p className="text-sm italic text-slate-300">"{rank.quote}"</p>
          </motion.div>

          {/* Progress to Next Rank */}
          {stats.level < 100 && (
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Progress to next rank</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${rank.gradient}`}
                />
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.conceptsLearned}</div>
              <div className="text-xs text-slate-400">Concepts</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.questionsAnswered}</div>
              <div className="text-xs text-slate-400">Questions</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-400">{streak}🔥</div>
              <div className="text-xs text-slate-400">Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeOut'
            }}
            className="absolute bottom-0 text-2xl"
            style={{
              left: `${20 + i * 15}%`,
            }}
          >
            {rank.icon}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
