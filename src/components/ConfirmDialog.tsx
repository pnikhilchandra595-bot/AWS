import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'warning'
}: ConfirmDialogProps) {
  const colors = {
    danger: {
      bg: 'from-red-500/20 to-rose-500/20',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      button: 'from-red-500 to-rose-500 hover:shadow-red-500/50'
    },
    warning: {
      bg: 'from-yellow-500/20 to-orange-500/20',
      border: 'border-yellow-500/30',
      icon: 'text-yellow-400',
      button: 'from-yellow-500 to-orange-500 hover:shadow-yellow-500/50'
    },
    info: {
      bg: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      icon: 'text-blue-400',
      button: 'from-blue-500 to-cyan-500 hover:shadow-blue-500/50'
    }
  };

  const style = colors[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className={`bg-gradient-to-r ${style.bg} border-b ${style.border} p-6 flex items-center gap-4`}>
                <AlertTriangle size={32} className={style.icon} />
                <h2 className="text-xl font-bold text-white">{title}</h2>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-slate-300 leading-relaxed">{message}</p>
              </div>

              {/* Actions */}
              <div className="p-6 bg-slate-800/50 border-t border-slate-700 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCancel}
                  className="flex-1 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onConfirm();
                    onCancel();
                  }}
                  className={`flex-1 bg-gradient-to-r ${style.button} text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg`}
                >
                  {confirmText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
