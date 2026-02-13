import { motion } from 'framer-motion';

export default function AppLoadingSkeleton() {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar Skeleton */}
      <div className="w-80 border-r border-purple-500/20 backdrop-blur-xl bg-slate-900/50 p-6">
        {/* Logo Skeleton */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl animate-pulse" />
          <div className="flex-1">
            <div className="h-5 bg-purple-500/20 rounded w-24 mb-2 animate-pulse" />
            <div className="h-3 bg-purple-500/10 rounded w-20 animate-pulse" />
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="h-16 bg-purple-500/10 rounded-lg animate-pulse"
            />
          ))}
        </div>

        {/* Nav Items Skeleton */}
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="h-20 bg-purple-500/10 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header Skeleton */}
        <div className="h-16 border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-4 bg-purple-500/20 rounded w-32 animate-pulse" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 bg-purple-500/10 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-purple-500/10 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Chat Messages Skeleton */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.2 }}
              className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-2xl ${i % 2 === 0 ? 'w-1/3' : 'w-2/3'}`}>
                <div className="h-4 bg-purple-500/20 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-purple-500/10 rounded w-3/4 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Skeleton */}
        <div className="p-6 border-t border-purple-500/20 bg-slate-900/50">
          <div className="h-12 bg-purple-500/10 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full px-6 py-3 flex items-center gap-3">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-purple-400 rounded-full"
              />
            ))}
          </div>
          <span className="text-purple-300 font-medium">Loading DevFlow AI...</span>
        </div>
      </motion.div>
    </div>
  );
}
