import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { category: 'Navigation', items: [
    { keys: ['Ctrl', 'K'], description: 'Open command palette' },
    { keys: ['Ctrl', '/'], description: 'Search messages' },
    { keys: ['Esc'], description: 'Close modals' },
    { keys: ['?'], description: 'Show this help' },
  ]},
  { category: 'Actions', items: [
    { keys: ['Enter'], description: 'Send message' },
    { keys: ['Shift', 'Enter'], description: 'New line in message' },
    { keys: ['Ctrl', 'E'], description: 'Export chat history' },
    { keys: ['Ctrl', 'Shift', 'C'], description: 'Clear chat' },
  ]},
  { category: 'Features', items: [
    { keys: ['Ctrl', 'Shift', 'T'], description: 'Toggle theme' },
    { keys: ['Ctrl', 'Shift', 'P'], description: 'AI Personality selector' },
    { keys: ['Ctrl', 'Shift', 'D'], description: 'Daily challenges' },
    { keys: ['Ctrl', 'Shift', 'A'], description: 'Analytics dashboard' },
  ]},
  { category: 'Advanced', items: [
    { keys: ['Ctrl', 'Shift', 'C'], description: 'AI Comparison mode' },
    { keys: ['Ctrl', 'Shift', 'L'], description: 'Learning path' },
    { keys: ['Ctrl', 'Shift', 'R'], description: 'Code review mode' },
  ]},
];

export default function KeyboardShortcutsGuide({ isOpen, onClose }: KeyboardShortcutsGuideProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-purple-500/30 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Keyboard size={24} className="text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] grid grid-cols-1 md:grid-cols-2 gap-6">
                {shortcuts.map((section, idx) => (
                  <motion.div
                    key={section.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-semibold text-purple-400 mb-4">
                      {section.category}
                    </h3>
                    <div className="space-y-3">
                      {section.items.map((shortcut, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + i * 0.05 }}
                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          <span className="text-slate-300 text-sm">
                            {shortcut.description}
                          </span>
                          <div className="flex gap-1">
                            {shortcut.keys.map((key, keyIdx) => (
                              <kbd
                                key={keyIdx}
                                className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-xs font-mono text-slate-200 shadow-sm"
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-slate-800/50 border-t border-purple-500/20 p-4 text-center">
                <p className="text-sm text-slate-400">
                  Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">?</kbd> anytime to show this guide
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
