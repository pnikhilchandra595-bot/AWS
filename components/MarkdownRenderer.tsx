import React, { useState } from 'react';
import { ICONS } from '../constants';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="md-content text-sm md:text-base leading-relaxed space-y-4 font-light text-slate-200">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const lines = part.split('\n');
          const language = lines[0].replace(/```/, '').trim();
          const code = lines.slice(1, -1).join('\n');
          
          return <CodeBlock key={index} language={language} code={code} />;
        } else {
          const paragraphs = part.split('\n\n').filter(p => p.trim());
          return (
            <div key={index} className="space-y-3">
              {paragraphs.map((p, pIndex) => (
                <p key={pIndex}>{processInlineMarkdown(p)}</p>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

const CodeBlock = ({ language, code }: { language: string, code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-5 rounded-xl overflow-hidden bg-[#0d1117] border border-slate-700/50 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-3 text-xs text-slate-400 font-mono font-medium uppercase tracking-wide opacity-80">{language || 'text'}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-700/50 text-xs text-slate-400 hover:text-white transition-all"
        >
          {copied ? <ICONS.CheckCircle2 size={14} className="text-green-400" /> : <ICONS.Copy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-normal custom-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const processInlineMarkdown = (text: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    const matchText = match[0];
    if (matchText.startsWith('**')) {
      elements.push(<strong key={match.index} className="text-neon-blue font-semibold">{matchText.slice(2, -2)}</strong>);
    } else if (matchText.startsWith('`')) {
      elements.push(
        <code key={match.index} className="bg-slate-800/80 text-neon-green px-1.5 py-0.5 rounded-md text-xs font-mono border border-slate-700/50">
          {matchText.slice(1, -1)}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }
  return elements;
};

export default MarkdownRenderer;
