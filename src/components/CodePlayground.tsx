import { useState } from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CodePlayground({ isOpen, onClose }: Props) {
  const [code, setCode] = useState(`// Try some JavaScript code
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('Developer'));`);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState<'javascript' | 'python' | 'html'>('javascript');

  const runCode = () => {
    try {
      // Capture console.log
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(arg => String(arg)).join(' '));
      };

      // Execute code
      if (language === 'javascript') {
        // eslint-disable-next-line no-eval
        eval(code);
      } else {
        toast.error('Only JavaScript execution is supported in this demo');
      }

      // Restore console.log
      console.log = originalLog;

      setOutput(logs.join('\n') || 'Code executed successfully (no output)');
      toast.success('Code executed!');
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
      toast.error('Execution failed');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[95] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#0a0f16] border border-slate-700 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <ICONS.Terminal size={20} className="text-pixel-green" />
            <h2 className="text-lg font-bold text-white font-mono">Code Playground</h2>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-slate-900 text-slate-300 text-xs font-mono px-3 py-1.5 rounded border border-slate-700 outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python (View Only)</option>
              <option value="html">HTML (View Only)</option>
            </select>
            <button
              onClick={runCode}
              className="flex items-center gap-2 px-4 py-1.5 bg-pixel-green hover:bg-green-400 text-black rounded font-mono text-xs font-bold transition-colors"
            >
              <ICONS.Play size={14} />
              Run
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded transition-colors">
              <ICONS.X size={18} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Editor & Output */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-hidden">
          {/* Code Editor */}
          <div className="flex flex-col gap-2 overflow-hidden">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Editor</div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-slate-900 text-slate-200 p-4 rounded border border-slate-700 font-mono text-sm resize-none outline-none focus:border-pixel-green/50 transition-colors"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-2 overflow-hidden">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Output</div>
            <div className="flex-1 bg-slate-900 p-4 rounded border border-slate-700 overflow-auto custom-scrollbar">
              <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">{output || 'Run code to see output...'}</pre>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
