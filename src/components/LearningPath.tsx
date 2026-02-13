import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';

interface PathNode {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  xpReward: number;
}

interface LearningPathProps {
  isOpen: boolean;
  onClose: () => void;
  userLevel: number;
}

const paths: Record<string, PathNode[]> = {
  frontend: [
    { id: 'html-css', title: 'HTML & CSS Basics', description: 'Master the fundamentals', completed: true, locked: false, xpReward: 50 },
    { id: 'javascript', title: 'JavaScript Essentials', description: 'Core JS concepts', completed: true, locked: false, xpReward: 100 },
    { id: 'react-basics', title: 'React Fundamentals', description: 'Components & Props', completed: false, locked: false, xpReward: 150 },
    { id: 'react-hooks', title: 'React Hooks', description: 'useState, useEffect & more', completed: false, locked: false, xpReward: 150 },
    { id: 'react-advanced', title: 'Advanced React', description: 'Context, Refs, Performance', completed: false, locked: true, xpReward: 200 },
    { id: 'nextjs', title: 'Next.js', description: 'SSR & Full-stack React', completed: false, locked: true, xpReward: 250 },
  ],
  backend: [
    { id: 'node-basics', title: 'Node.js Basics', description: 'Server-side JavaScript', completed: false, locked: false, xpReward: 100 },
    { id: 'express', title: 'Express.js', description: 'Web framework', completed: false, locked: false, xpReward: 150 },
    { id: 'databases', title: 'Databases', description: 'SQL & NoSQL', completed: false, locked: true, xpReward: 200 },
    { id: 'apis', title: 'REST APIs', description: 'API design & best practices', completed: false, locked: true, xpReward: 200 },
    { id: 'auth', title: 'Authentication', description: 'JWT, OAuth, Security', completed: false, locked: true, xpReward: 250 },
  ],
  algorithms: [
    { id: 'big-o', title: 'Big O Notation', description: 'Time & space complexity', completed: false, locked: false, xpReward: 100 },
    { id: 'arrays', title: 'Arrays & Strings', description: 'Common patterns', completed: false, locked: false, xpReward: 150 },
    { id: 'linked-lists', title: 'Linked Lists', description: 'Pointers & traversal', completed: false, locked: true, xpReward: 150 },
    { id: 'trees', title: 'Trees & Graphs', description: 'DFS, BFS, traversals', completed: false, locked: true, xpReward: 200 },
    { id: 'dynamic', title: 'Dynamic Programming', description: 'Optimization problems', completed: false, locked: true, xpReward: 300 },
  ],
};

const LearningPath: React.FC<LearningPathProps> = ({ isOpen, onClose, userLevel }) => {
  const [selectedPath, setSelectedPath] = useState<keyof typeof paths>('frontend');

  if (!isOpen) return null;

  const currentPath = paths[selectedPath];
  const completedCount = currentPath.filter(n => n.completed).length;
  const progress = (completedCount / currentPath.length) * 100;

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
        className="w-full max-w-5xl bg-[#0a0f16] border-2 border-pixel-green/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pixel-green/20 to-purple-500/20 border-b border-slate-800 p-6 sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 bg-pixel-green/20 rounded-xl border border-pixel-green/50"
              >
                <ICONS.Target size={24} className="text-pixel-green" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">Learning Paths</h2>
                <p className="text-sm text-slate-400 font-mono">Your Personalized Roadmap</p>
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

        <div className="p-6">
          {/* Path Selector */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {Object.keys(paths).map((path) => (
              <motion.button
                key={path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPath(path as keyof typeof paths)}
                className={`px-6 py-3 rounded-lg font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedPath === path
                    ? 'bg-pixel-green text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {path}
              </motion.button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-400 font-mono">Overall Progress</span>
              <span className="text-sm text-pixel-green font-mono font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-pixel-green to-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.6)]"
              />
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              {completedCount} of {currentPath.length} completed
            </div>
          </div>

          {/* Path Nodes */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pixel-green via-blue-500 to-purple-500 opacity-30" />

            <div className="space-y-4">
              {currentPath.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <PathNodeCard node={node} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PathNodeCard = ({ node, index }: { node: PathNode; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: node.locked ? 1 : 1.02 }}
      className={`relative ml-14 ${
        node.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={() => !node.locked && setIsExpanded(!isExpanded)}
    >
      {/* Node Indicator */}
      <div className="absolute -left-[3.25rem] top-4">
        <motion.div
          animate={node.completed ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${
            node.completed
              ? 'bg-pixel-green border-pixel-green shadow-[0_0_20px_rgba(34,197,94,0.6)]'
              : node.locked
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-900 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
          }`}
        >
          {node.completed ? (
            <ICONS.CheckCircle2 size={24} className="text-black" />
          ) : node.locked ? (
            <ICONS.Lock size={20} className="text-slate-600" />
          ) : (
            <span className="text-white font-bold font-mono">{index + 1}</span>
          )}
        </motion.div>
      </div>

      {/* Card */}
      <div
        className={`border-2 rounded-xl p-4 transition-all ${
          node.completed
            ? 'bg-pixel-green/10 border-pixel-green/50'
            : node.locked
            ? 'bg-slate-900/30 border-slate-800'
            : 'bg-slate-900/50 border-blue-500/50 hover:border-blue-500'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white font-mono mb-1">{node.title}</h3>
            <p className="text-sm text-slate-400 font-mono">{node.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full flex items-center gap-1">
              <ICONS.Zap size={14} className="text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 font-mono">+{node.xpReward}</span>
            </div>
            {!node.locked && !node.completed && (
              <ICONS.ChevronRight size={20} className="text-slate-500" />
            )}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && !node.locked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-slate-700"
            >
              <button className="w-full py-2 bg-pixel-green hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors font-mono">
                {node.completed ? 'Review Topic' : 'Start Learning'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LearningPath;
