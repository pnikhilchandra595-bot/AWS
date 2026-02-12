import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';
import { Message } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSelectMessage: (messageId: string) => void;
}

export default function MessageSearch({ isOpen, onClose, messages, onSelectMessage }: Props) {
  const [search, setSearch] = useState('');

  const filteredMessages = messages.filter(msg =>
    msg.text.toLowerCase().includes(search.toLowerCase())
  );

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
                <ICONS.Search size={20} className="text-pixel-green" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none font-mono text-sm"
                  autoFocus
                />
                <span className="text-xs text-slate-500 font-mono">{filteredMessages.length} results</span>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => {
                        onSelectMessage(msg.id);
                        onClose();
                      }}
                      className="w-full p-4 hover:bg-slate-800/50 transition-colors text-left border-b border-slate-800/50 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${
                          msg.sender === 'USER' ? 'bg-purple-500/20 text-purple-400' : 'bg-pixel-green/20 text-pixel-green'
                        }`}>
                          {msg.sender === 'USER' ? <ICONS.User size={12} /> : <ICONS.Sparkles size={12} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-300 line-clamp-2">{msg.text}</p>
                          <span className="text-xs text-slate-500 mt-1 block">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    <ICONS.Search size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No messages found</p>
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
