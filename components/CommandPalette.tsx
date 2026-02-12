import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';
import { AppMode } from '../types';

interface Command {
  id: string;
  label: string;
  icon: keyof typeof ICONS;
  action: () => void;
  shortcut?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onModeChange: (mode: AppMode) => void;
  onExportChat: () => void;
  onClearChat: () => void;
  onToggleTheme: () => void;
}

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  onModeChange, 
  onExportChat, 
  onClearChat,
  onToggleTheme 
}: Props) {
  const [search, setSearch] = useState('');

  const commands: Command[] = [
    { id: 'learn', label: 'Switch to Learn Mode', icon: 'BookOpen', action: () => onModeChange(AppMode.LEARN) },
    { id: 'refactor', label: 'Switch to Refactor Mode', icon: 'Code2', action: () => onModeChange(AppMode.REFACTOR) },
    { id: 'quiz', label: 'Switch to Quiz Mode', icon: 'Zap', action: () => onModeChange(AppMode.QUIZ) },
    { id: 'export', label: 'Export Chat History', icon: 'ArrowRight', action: onExportChat, shortcut: 'Ctrl+E' },
    { id: 'clear', label: 'Clear Chat', icon: 'X', action: onClearChat },
    { id: 'theme', label: 'Toggle Theme', icon: 'Layout', action: onToggleTheme, shortcut: 'Ctrl+Shift+T' },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);

  const handleSelect = (command: Command) => {
    command.action();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-[91] px-4"
          >
            <div className="bg-[#0a0f16] border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-slate-800">
                <ICONS.Terminal size={20} className="text-pixel-green" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none font-mono text-sm"
                  autoFocus
                />
                <span className="text-xs text-slate-500 font-mono">ESC to close</span>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => {
                    const Icon = ICONS[cmd.icon];
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => handleSelect(cmd)}
                        className="w-full flex items-center justify-between gap-4 p-4 hover:bg-slate-800/50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-slate-400 group-hover:text-pixel-green transition-colors" />
                          <span className="text-sm text-slate-200 group-hover:text-white">{cmd.label}</span>
                        </div>
                        {cmd.shortcut && (
                          <span className="text-xs text-slate-500 font-mono bg-slate-900 px-2 py-1 rounded">
                            {cmd.shortcut}
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    <ICONS.XCircle size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No commands found</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
