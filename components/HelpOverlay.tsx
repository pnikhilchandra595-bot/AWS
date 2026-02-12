import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpOverlay({ isOpen, onClose }: Props) {
  const shortcuts = [
    { key: 'Ctrl+K', description: 'Open command palette' },
    { key: 'Ctrl+/', description: 'Search messages' },
    { key: 'Ctrl+E', description: 'Export chat history' },
    { key: 'Ctrl+Shift+T', description: 'Toggle theme' },
    { key: 'Escape', description: 'Close modals' },
    { key: 'Enter', description: 'Send message' },
    { key: 'Shift+Enter', description: 'New line in input' },
  ];

  const features = [
    { icon: 'BookOpen', title: 'Learn Mode', desc: 'Ask questions and get AI-powered explanations' },
    { icon: 'Code2', title: 'Refactor Engine', desc: 'Optimize your code with AI suggestions' },
    { icon: 'Zap', title: 'Quiz Mode', desc: 'Test your knowledge with adaptive quizzes' },
    { icon: 'Terminal', title: 'Code Playground', desc: 'Run JavaScript code in your browser' },
    { icon: 'Bookmark', title: 'Bookmarks', desc: 'Save important AI responses' },
    { icon: 'Flame', title: 'Streaks', desc: 'Track your daily learning consistency' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] z-[96] overflow-hidden"
          >
            <div className="bg-[#0a0f16] border border-slate-700 rounded-xl shadow-2xl h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <ICONS.BookOpen size={24} className="text-pixel-green" />
                  <h2 className="text-2xl font-bold text-white font-mono">Help & Guide</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded transition-colors">
                  <ICONS.X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* Features */}
                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ICONS.Sparkles size={18} className="text-pixel-green" />
                    Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature) => {
                      const Icon = ICONS[feature.icon as keyof typeof ICONS];
                      return (
                        <div key={feature.title} className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-pixel-green/10 rounded">
                              <Icon size={20} className="text-pixel-green" />
                            </div>
                            <div>
                              <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                              <p className="text-sm text-slate-400">{feature.desc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Keyboard Shortcuts */}
                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ICONS.Terminal size={18} className="text-pixel-green" />
                    Keyboard Shortcuts
                  </h3>
                  <div className="space-y-2">
                    {shortcuts.map((shortcut) => (
                      <div key={shortcut.key} className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
                        <span className="text-sm text-slate-300">{shortcut.description}</span>
                        <kbd className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-pixel-green">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tips */}
                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ICONS.Zap size={18} className="text-pixel-green" />
                    Pro Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-pixel-green/10 border border-pixel-green/30 rounded-lg">
                      <p className="text-sm text-slate-300">
                        💡 <strong>Bookmark important responses</strong> by hovering over AI messages and clicking the bookmark icon.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-slate-300">
                        💡 <strong>Use voice input</strong> by clicking the microphone icon in the input area (Chrome/Edge only).
                      </p>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <p className="text-sm text-slate-300">
                        💡 <strong>Maintain your streak</strong> by using DevFlow daily to unlock the "Week Warrior" achievement.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <p className="text-sm text-slate-300">
                        💡 <strong>Export your chat</strong> to save your learning progress and review later.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <p className="text-center text-xs text-slate-500 font-mono">
                  Press <kbd className="px-2 py-0.5 bg-slate-800 rounded text-pixel-green">?</kbd> anytime to open this guide
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
