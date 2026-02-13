import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';

interface Personality {
  id: string;
  name: string;
  icon: keyof typeof ICONS;
  description: string;
  systemPrompt: string;
  color: string;
}

interface AIPersonalitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (personality: Personality) => void;
  currentPersonality: string;
}

const personalities: Personality[] = [
  {
    id: 'friendly',
    name: 'Friendly Mentor',
    icon: 'Heart',
    description: 'Warm, encouraging, and supportive. Perfect for beginners.',
    systemPrompt: 'You are a friendly and encouraging mentor. Use warm language, provide lots of encouragement, and make learning fun. Use emojis occasionally.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'professional',
    name: 'Professional Expert',
    icon: 'Briefcase',
    description: 'Direct, precise, and industry-focused. For serious learners.',
    systemPrompt: 'You are a professional software architect. Be precise, use industry terminology, focus on best practices and real-world applications.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'humorous',
    name: 'Humorous Teacher',
    icon: 'Sparkles',
    description: 'Fun, witty, and entertaining. Makes complex topics enjoyable.',
    systemPrompt: 'You are a witty and humorous teacher. Use jokes, puns, and funny analogies to explain concepts. Keep it light and entertaining while being educational.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'socratic',
    name: 'Socratic Guide',
    icon: 'HelpCircle',
    description: 'Asks questions to guide discovery. For deep understanding.',
    systemPrompt: 'You are a Socratic teacher. Instead of giving direct answers, ask thought-provoking questions that guide the student to discover answers themselves.',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'eli5',
    name: 'ELI5 Explainer',
    icon: 'Users',
    description: 'Explains like you\'re 5. Simple analogies and examples.',
    systemPrompt: 'Explain everything as if talking to a 5-year-old. Use simple words, everyday analogies, and concrete examples. Avoid jargon.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'expert',
    name: 'Expert Scholar',
    icon: 'Award',
    description: 'Advanced, technical, and comprehensive. For experts.',
    systemPrompt: 'You are an expert scholar. Provide deep technical explanations, cite research, discuss edge cases, and assume advanced knowledge.',
    color: 'from-red-500 to-pink-500'
  }
];

const AIPersonalitySelector: React.FC<AIPersonalitySelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentPersonality
}) => {
  const [selected, setSelected] = useState(currentPersonality);

  const handleSelect = (personality: Personality) => {
    setSelected(personality.id);
    onSelect(personality);
    setTimeout(() => onClose(), 500);
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
        className="w-full max-w-4xl bg-[#0a0f16] border-2 border-pixel-green/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pixel-green/20 to-purple-500/20 border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-pixel-green/20 rounded-xl border border-pixel-green/50"
              >
                <ICONS.Users size={24} className="text-pixel-green" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">AI Personality</h2>
                <p className="text-sm text-slate-400 font-mono">Choose Your Learning Style</p>
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

        {/* Personalities Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {personalities.map((personality, index) => {
            const Icon = ICONS[personality.icon];
            const isSelected = selected === personality.id;

            return (
              <motion.button
                key={personality.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(personality)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-pixel-green bg-pixel-green/10 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                    : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                }`}
              >
                {/* Selected Badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-pixel-green rounded-full flex items-center justify-center"
                  >
                    <ICONS.CheckCircle2 size={16} className="text-black" />
                  </motion.div>
                )}

                {/* Icon with Gradient */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${personality.color} p-0.5 mb-4`}>
                  <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                    <Icon size={32} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 font-mono">{personality.name}</h3>
                <p className="text-sm text-slate-400 font-mono leading-relaxed">{personality.description}</p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${personality.color} opacity-0 hover:opacity-5 rounded-xl transition-opacity pointer-events-none`} />
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4 bg-slate-900/50">
          <p className="text-xs text-slate-500 text-center font-mono">
            💡 Tip: Different personalities work better for different topics. Experiment to find your favorite!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIPersonalitySelector;
export { personalities };
export type { Personality };
