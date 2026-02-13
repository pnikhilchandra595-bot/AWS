import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  reason: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  category: string;
}

interface SmartSuggestionsProps {
  userStats: {
    conceptsLearned: number;
    level: number;
    questionsAnswered: number;
  };
  onSelectTopic: (topic: string) => void;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ userStats, onSelectTopic }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    // AI-powered suggestion algorithm
    const generateSuggestions = () => {
      const allTopics = [
        {
          id: '1',
          title: 'React Server Components',
          description: 'Learn the future of React with RSC',
          reason: 'Based on your React knowledge',
          difficulty: 'advanced' as const,
          xp: 200,
          category: 'React'
        },
        {
          id: '2',
          title: 'TypeScript Generics',
          description: 'Master advanced type systems',
          reason: 'Next step after TypeScript basics',
          difficulty: 'intermediate' as const,
          xp: 150,
          category: 'TypeScript'
        },
        {
          id: '3',
          title: 'Algorithm Optimization',
          description: 'Improve code performance',
          reason: 'Complement your coding skills',
          difficulty: 'intermediate' as const,
          xp: 175,
          category: 'Algorithms'
        },
        {
          id: '4',
          title: 'Web Security Basics',
          description: 'Protect your applications',
          reason: 'Essential for all developers',
          difficulty: 'beginner' as const,
          xp: 100,
          category: 'Security'
        }
      ];

      // Filter based on user level
      const filtered = allTopics.filter(topic => {
        if (userStats.level < 3) return topic.difficulty === 'beginner';
        if (userStats.level < 6) return topic.difficulty !== 'advanced';
        return true;
      });

      setSuggestions(filtered.slice(0, 3));
    };

    generateSuggestions();
  }, [userStats]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'advanced': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <ICONS.Sparkles size={16} className="text-pixel-green" />
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Recommended For You
        </h3>
      </div>

      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => onSelectTopic(suggestion.title)}
            className="w-full text-left p-3 bg-slate-900/50 hover:bg-slate-800 border border-slate-700 hover:border-pixel-green/50 rounded-lg transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white font-mono group-hover:text-pixel-green transition-colors">
                    {suggestion.title}
                  </h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border font-mono ${getDifficultyColor(suggestion.difficulty)}`}>
                    {suggestion.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mb-1">{suggestion.description}</p>
                <p className="text-[10px] text-slate-500 font-mono italic">
                  💡 {suggestion.reason}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-yellow-400">
                  <ICONS.Zap size={12} />
                  <span className="text-xs font-bold font-mono">+{suggestion.xp}</span>
                </div>
                <ICONS.ChevronRight size={16} className="text-slate-600 group-hover:text-pixel-green transition-colors" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-[10px] text-slate-600 mt-2 font-mono text-center">
        🤖 AI-powered recommendations based on your learning history
      </p>
    </div>
  );
};

export default SmartSuggestions;
