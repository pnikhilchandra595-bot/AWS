import { motion } from 'framer-motion';
import { getNarutoRank } from '../data/narutoRanks';
import { UserStats } from '../types';

interface AnimeRankDisplayProps {
  stats: UserStats;
  streak: number;
}

export default function AnimeRankDisplay({ stats, streak }: AnimeRankDisplayProps) {
  const rank = getNarutoRank(stats.level);
  const progress = ((stats.level % 10) / 10) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      className="relative overflow-visible perspective-1000"
    >
      {/* Epic Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className={`absolute -inset-8 bg-gradient-to-r ${rank.gradient} opacity-30 blur-3xl`} 
      />
      
      {/* Anime Speed Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [-200, 200],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
            className="absolute h-0.5 w-32 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              top: `${10 + i * 12}%`,
              transform: 'rotate(-15deg)'
            }}
          />
        ))}
      </div>
      
      {/* Main Card with 3D Effect */}
      <motion.div 
        whileHover={{ scale: 1.02, rotateY: 2 }}
        className={`relative bg-gradient-to-br ${rank.gradient} p-1.5 rounded-3xl shadow-2xl`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 relative overflow-hidden">
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] animate-pulse-slow" />
          </div>

          {/* Epic Rank Badge */}
          <div className="relative mb-6">
            <div className="flex items-center justify-center mb-3">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="text-8xl drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 20px currentColor)' }}
              >
                {rank.icon}
              </motion.div>
            </div>
            
            {/* Rank Title - ULTRA ANIME STYLE */}
            <motion.h3 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
              className="text-center relative"
            >
              <div className={`text-5xl font-black tracking-wider uppercase bg-gradient-to-r ${rank.gradient} bg-clip-text text-transparent relative z-10`}
                style={{ 
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px currentColor',
                  WebkitTextStroke: '2px rgba(255,255,255,0.1)'
                }}
              >
                {rank.title}
              </div>
              {/* Anime-style underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`h-1 bg-gradient-to-r ${rank.gradient} mx-auto mt-2 rounded-full`}
                style={{ width: '60%' }}
              />
            </motion.h3>
            
            {/* Level Display - MASSIVE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-4"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/80 rounded-full border-2 border-current"
                style={{ borderColor: rank.color }}
              >
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Level</span>
                <motion.span 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 20px rgba(255,255,255,0.5)',
                      '0 0 40px rgba(255,255,255,0.8)',
                      '0 0 20px rgba(255,255,255,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl font-black text-white"
                  style={{ 
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    textShadow: '0 0 30px rgba(255,255,255,0.8)'
                  }}
                >
                  {stats.level}
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* XP Display - Anime Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-baseline gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
              <span className="text-4xl font-black text-yellow-400" style={{ fontFamily: 'Impact, sans-serif' }}>
                {stats.xp}
              </span>
              <span className="text-sm font-bold text-yellow-300 uppercase tracking-wider">XP</span>
            </div>
          </motion.div>

          {/* Epic Quote with Anime Border */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 relative"
          >
            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-current to-transparent"
              style={{ color: rank.color }}
            />
            <div className="pl-4 pr-2 py-3 bg-slate-800/50 rounded-r-xl border-l-4 border-current backdrop-blur"
              style={{ borderColor: rank.color }}
            >
              <p className="text-base font-bold italic text-slate-200 leading-relaxed"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                "{rank.quote}"
              </p>
            </div>
          </motion.div>

          {/* Progress Bar - Anime Style */}
          {stats.level < 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Rank</span>
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-lg font-black text-white"
                  style={{ fontFamily: 'Impact, sans-serif' }}
                >
                  {progress.toFixed(0)}%
                </motion.span>
              </div>
              <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden border-2 border-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${rank.gradient} relative`}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Stats Grid - Anime Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-3"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 text-center border-2 border-blue-500/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
              <div className="relative z-10">
                <div className="text-4xl font-black text-blue-400 mb-1" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {stats.conceptsLearned}
                </div>
                <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">Concepts</div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 text-center border-2 border-green-500/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
              <div className="relative z-10">
                <div className="text-4xl font-black text-green-400 mb-1" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {stats.questionsAnswered}
                </div>
                <div className="text-xs font-bold text-green-300 uppercase tracking-wider">Questions</div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 text-center border-2 border-orange-500/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-orange-500/5 animate-pulse" />
              <div className="relative z-10">
                <div className="text-4xl font-black text-orange-400 mb-1 flex items-center justify-center gap-1" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {streak}<span className="text-3xl">🔥</span>
                </div>
                <div className="text-xs font-bold text-orange-300 uppercase tracking-wider">Streak</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Epic Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -150],
              x: [0, (i % 2 === 0 ? 20 : -20)],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut'
            }}
            className="absolute bottom-0 text-4xl"
            style={{
              left: `${10 + i * 11}%`,
              filter: 'drop-shadow(0 0 10px currentColor)'
            }}
          >
            {rank.icon}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
