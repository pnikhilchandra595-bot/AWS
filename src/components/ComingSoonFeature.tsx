import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof ICONS;
  category: string;
  estimatedRelease: string;
  features: string[];
}

interface ComingSoonFeatureProps {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature;
}

const ComingSoonFeature: React.FC<ComingSoonFeatureProps> = ({ isOpen, onClose, feature }) => {
  if (!isOpen) return null;

  const Icon = ICONS[feature.icon];

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
        className="w-full max-w-2xl bg-[#0a0f16] border-2 border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/50"
              >
                <Icon size={24} className="text-purple-400" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-white font-mono">{feature.name}</h2>
                  <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs font-bold text-purple-400 font-mono">
                    COMING SOON
                  </span>
                </div>
                <p className="text-sm text-slate-400 font-mono">{feature.category}</p>
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-mono">About This Feature</h3>
            <p className="text-slate-300 font-mono leading-relaxed">{feature.description}</p>
          </div>

          {/* Features List */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 font-mono">What's Included</h3>
            <div className="space-y-2">
              {feature.features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-slate-900/50 border border-slate-700 rounded-lg"
                >
                  <ICONS.CheckCircle2 size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300 font-mono">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Release Info */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <ICONS.Calendar size={20} className="text-purple-400" />
              <div>
                <p className="text-xs text-slate-400 font-mono">Estimated Release</p>
                <p className="text-sm font-bold text-purple-400 font-mono">{feature.estimatedRelease}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg transition-colors font-mono flex items-center justify-center gap-2">
              <ICONS.Bell size={16} />
              Notify Me
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors font-mono"
            >
              Close
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4 bg-slate-900/50">
          <p className="text-xs text-slate-500 text-center font-mono">
            🚀 We're working hard to bring you this feature. Stay tuned!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoonFeature;
