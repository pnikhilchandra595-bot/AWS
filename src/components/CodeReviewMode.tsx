import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ReviewIssue {
  type: 'security' | 'performance' | 'style' | 'bug';
  severity: 'critical' | 'high' | 'medium' | 'low';
  line: number;
  message: string;
  suggestion: string;
}

interface CodeReviewModeProps {
  isOpen: boolean;
  onClose: () => void;
  onReview: (code: string, language: string) => Promise<ReviewIssue[]>;
}

const CodeReviewMode: React.FC<CodeReviewModeProps> = ({ isOpen, onClose, onReview }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isReviewing, setIsReviewing] = useState(false);
  const [issues, setIssues] = useState<ReviewIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<ReviewIssue | null>(null);

  const handleReview = async () => {
    if (!code.trim()) return;
    
    setIsReviewing(true);
    setIssues([]);
    
    try {
      const result = await onReview(code, language);
      setIssues(result);
    } catch (error) {
      console.error('Review error:', error);
    } finally {
      setIsReviewing(false);
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'security': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'performance': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'style': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'bug': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <ICONS.XCircle className="text-red-500" />;
      case 'high': return <ICONS.AlertTriangle className="text-orange-500" />;
      case 'medium': return <ICONS.AlertCircle className="text-yellow-500" />;
      case 'low': return <ICONS.Info className="text-blue-500" />;
      default: return <ICONS.Info />;
    }
  };

  if (!isOpen) return null;

  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const highCount = issues.filter(i => i.severity === 'high').length;
  const score = Math.max(0, 100 - (criticalCount * 20 + highCount * 10 + issues.length * 2));

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
        className="w-full max-w-7xl bg-[#0a0f16] border-2 border-pixel-green/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden max-h-[90vh] flex flex-col"
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
                <ICONS.Shield size={24} className="text-pixel-green" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">Code Review AI</h2>
                <p className="text-sm text-slate-400 font-mono">Security • Performance • Best Practices</p>
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

        <div className="flex-1 overflow-hidden flex">
          {/* Left Panel - Code Input */}
          <div className="w-1/2 border-r border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-pixel-green/50"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <span className="text-xs text-slate-500 font-mono">Paste your code below</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReview}
                disabled={isReviewing || !code.trim()}
                className="px-4 py-2 bg-pixel-green hover:bg-emerald-400 text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-mono shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                {isReviewing ? (
                  <>
                    <ICONS.Loader2 size={16} className="animate-spin" />
                    Reviewing...
                  </>
                ) : (
                  <>
                    <ICONS.Shield size={16} />
                    Review Code
                  </>
                )}
              </motion.button>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Paste your code here for AI review..."
                className="w-full h-full bg-slate-900 text-white p-4 font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Right Panel - Review Results */}
          <div className="w-1/2 flex flex-col">
            {issues.length > 0 && (
              <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white font-mono">Code Quality Score</h3>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`text-3xl font-black font-mono ${
                      score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}
                  >
                    {score}/100
                  </motion.div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <IssueCount label="Critical" count={criticalCount} color="text-red-400" />
                  <IssueCount label="High" count={highCount} color="text-orange-400" />
                  <IssueCount label="Medium" count={issues.filter(i => i.severity === 'medium').length} color="text-yellow-400" />
                  <IssueCount label="Low" count={issues.filter(i => i.severity === 'low').length} color="text-blue-400" />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-auto custom-scrollbar p-4 space-y-3">
              {isReviewing && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-pixel-green/30 border-t-pixel-green rounded-full mx-auto mb-4"
                    />
                    <p className="text-slate-400 font-mono">Analyzing code...</p>
                  </div>
                </div>
              )}

              {!isReviewing && issues.length === 0 && code.trim() && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ICONS.CheckCircle2 size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">Perfect Code!</h3>
                  <p className="text-slate-400 font-mono">No issues found. Great job!</p>
                </motion.div>
              )}

              {!isReviewing && issues.length === 0 && !code.trim() && (
                <div className="text-center py-20 text-slate-500 font-mono">
                  <ICONS.Code2 size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Paste code to start review</p>
                </div>
              )}

              <AnimatePresence>
                {issues.map((issue, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedIssue(issue)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02] ${getIssueColor(issue.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getSeverityIcon(issue.severity)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider font-mono">{issue.type}</span>
                          <span className="text-xs text-slate-500 font-mono">Line {issue.line}</span>
                        </div>
                        <p className="text-sm font-mono mb-2">{issue.message}</p>
                        <div className="text-xs text-slate-400 font-mono bg-slate-900/50 p-2 rounded">
                          💡 {issue.suggestion}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const IssueCount = ({ label, count, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-center">
    <div className={`text-xl font-bold ${color} font-mono`}>{count}</div>
    <div className="text-[10px] text-slate-500 uppercase font-mono">{label}</div>
  </div>
);

export default CodeReviewMode;
