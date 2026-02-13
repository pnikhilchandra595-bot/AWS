import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const isQuotaError = error.message.includes('quota') || error.message.includes('429');
  const isNetworkError = error.message.includes('network') || error.message.includes('fetch');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="mb-6"
          >
            <AlertTriangle size={64} className="text-yellow-400" />
          </motion.div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {isQuotaError ? 'API Quota Exceeded' : isNetworkError ? 'Connection Error' : 'Something Went Wrong'}
          </h1>

          <p className="text-slate-300 mb-6">
            {isQuotaError
              ? 'The demo API key has reached its rate limit. Please try again later or use your own API key.'
              : isNetworkError
              ? 'Unable to connect to the AI service. Please check your internet connection.'
              : 'An unexpected error occurred. Don\'t worry, your data is safe.'}
          </p>

          <div className="bg-slate-900/50 rounded-lg p-4 mb-6 w-full">
            <p className="text-xs text-slate-400 font-mono break-all">
              {error.message}
            </p>
          </div>

          <div className="flex gap-3 w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetErrorBoundary}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <RefreshCw size={18} />
              Try Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-slate-600 transition-all"
            >
              <Home size={18} />
              Home
            </motion.button>
          </div>

          {isQuotaError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg w-full"
            >
              <p className="text-sm text-blue-300">
                💡 <strong>Tip:</strong> Get your own free API key from{' '}
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-200"
                >
                  Google AI Studio
                </a>
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
