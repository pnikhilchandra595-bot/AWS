import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Sparkles, Code2, Zap, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface FloatingActionButtonProps {
  onOpenCommandPalette: () => void;
  onOpenCodePlayground: () => void;
  onOpenHelp: () => void;
  onStartQuiz: () => void;
}

export default function FloatingActionButton({
  onOpenCommandPalette,
  onOpenCodePlayground,
  onOpenHelp,
  onStartQuiz
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Sparkles, label: 'Commands', color: 'from-purple-500 to-pink-500', onClick: onOpenCommandPalette },
    { icon: Code2, label: 'Playground', color: 'from-blue-500 to-cyan-500', onClick: onOpenCodePlayground },
    { icon: Zap, label: 'Quiz', color: 'from-yellow-500 to-orange-500', onClick: onStartQuiz },
    { icon: HelpCircle, label: 'Help', color: 'from-green-500 to-emerald-500', onClick: onOpenHelp },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 bg-gradient-to-r ${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group`}
              >
                <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {action.label}
                </span>
                <action.icon size={20} />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center ${
          isOpen ? 'rotate-45' : ''
        }`}
        style={{ transition: 'transform 0.3s ease' }}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>

      {/* Ripple Effect */}
      {!isOpen && (
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-purple-500/30"
        />
      )}
    </div>
  );
}
