import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';
import MarkdownRenderer from './MarkdownRenderer';

interface ComparisonResult {
  gemini: string;
  grok: string;
  query: string;
  timestamp: number;
}

interface AIComparisonModeProps {
  isOpen: boolean;
  onClose: () => void;
  onCompare: (query: string) => Promise<{ gemini: string; grok: string }>;
}

const AIComparisonMode: React.FC<AIComparisonModeProps> = ({ isOpen, onClose, onCompare }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [winner, setWinner] = useState<'gemini' | 'grok' | 'tie' | null>(null);

  const handleCompare = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setWinner(null);
    
    try {
      const responses = await onCompare(query);
      setResult({
        gemini: responses.gemini,
        grok: responses.grok,
        query,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Comparison error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectWinner = (selected: 'gemini' | 'grok' | 'tie') => {
    setWinner(selected);
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
        className="w-full max-w-7xl bg-[#0a0f16] border-2 border-pixel-green/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pixel-green/20 to-blue-500/20 border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-pixel-green/20 rounded-xl border border-pixel-green/50"
              >
                <ICONS.Zap size={24} className="text-pixel-green" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">AI Battle Arena</h2>
                <p className="text-sm text-slate-400 font-mono">Gemini vs Grok - Side by Side</p>
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

        {/* Input Section */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
              placeholder="Enter your question to compare both AIs..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pixel-green/50 font-mono"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCompare}
              disabled={isLoading || !query.trim()}
              className="px-6 py-3 bg-gradient-to-r from-pixel-green to-emerald-500 text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-mono shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              {isLoading ? (
                <>
                  <ICONS.Loader2 size={20} className="animate-spin" />
                  COMPARING...
                </>
              ) : (
                <>
                  <ICONS.Zap size={20} />
                  BATTLE
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-pixel-green/30 border-t-pixel-green rounded-full mx-auto mb-4"
                />
                <p className="text-slate-400 font-mono">Both AIs are thinking...</p>
              </div>
            </div>
          )}

          {result && !isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gemini Response */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`relative border-2 rounded-xl p-6 transition-all ${
                  winner === 'gemini'
                    ? 'border-yellow-500 bg-yellow-500/10 shadow-[0_0_30px_rgba(234,179,8,0.3)]'
                    : 'border-slate-700 bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/50">
                      <ICONS.Sparkles size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white font-mono">Gemini 3.0</h3>
                      <p className="text-xs text-slate-500 font-mono">Google AI</p>
                    </div>
                  </div>
                  {winner === 'gemini' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 text-yellow-400"
                    >
                      <ICONS.Trophy size={20} />
                      <span className="text-sm font-bold font-mono">WINNER</span>
                    </motion.div>
                  )}
                </div>
                <div className="prose prose-invert max-w-none">
                  <MarkdownRenderer content={result.gemini} />
                </div>
                {!winner && (
                  <button
                    onClick={() => selectWinner('gemini')}
                    className="mt-4 w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 font-mono text-sm transition-colors"
                  >
                    Vote for Gemini
                  </button>
                )}
              </motion.div>

              {/* Grok Response */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`relative border-2 rounded-xl p-6 transition-all ${
                  winner === 'grok'
                    ? 'border-yellow-500 bg-yellow-500/10 shadow-[0_0_30px_rgba(234,179,8,0.3)]'
                    : 'border-slate-700 bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/50">
                      <ICONS.Globe size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white font-mono">Grok</h3>
                      <p className="text-xs text-slate-500 font-mono">xAI</p>
                    </div>
                  </div>
                  {winner === 'grok' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 text-yellow-400"
                    >
                      <ICONS.Trophy size={20} />
                      <span className="text-sm font-bold font-mono">WINNER</span>
                    </motion.div>
                  )}
                </div>
                <div className="prose prose-invert max-w-none">
                  <MarkdownRenderer content={result.grok} />
                </div>
                {!winner && (
                  <button
                    onClick={() => selectWinner('grok')}
                    className="mt-4 w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-400 font-mono text-sm transition-colors"
                  >
                    Vote for Grok
                  </button>
                )}
              </motion.div>
            </div>
          )}

          {result && !winner && (
            <div className="mt-6 text-center">
              <button
                onClick={() => selectWinner('tie')}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 font-mono text-sm transition-colors"
              >
                It's a Tie! Both are great
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIComparisonMode;
