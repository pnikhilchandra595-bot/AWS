import React, { useEffect, useState } from 'react';
import { ICONS } from '../constants';
import { UserStats } from '../types';

interface StatsChartProps {
  stats: UserStats;
}

// Digital Counter Component
const Counter = ({ end, duration = 1500 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
};

const StatsChart: React.FC<StatsChartProps> = ({ stats }) => {
  // Simple Level calculation: 100 XP per level
  const xpForNextLevel = 100;
  const progressPercent = (stats.xp % xpForNextLevel) / xpForNextLevel * 100;

  return (
    <div className="bg-[#0a0f16] border border-slate-800/60 rounded-xl p-5 space-y-5 shadow-xl relative overflow-hidden group">
      
      {/* Decorative Scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pixel-green/5 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />

      {/* Level Header */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-pixel-green text-[10px] font-pixel uppercase tracking-widest opacity-80">Current Rank</h3>
          <div className="text-2xl font-bold text-white mt-1 flex items-baseline gap-2 font-mono">
            Level <Counter end={stats.level} />
            <span className="text-xs font-normal text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">DEV</span>
          </div>
        </div>
        <div className="h-10 w-10 rounded bg-slate-900 border border-pixel-green/30 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.2)] animate-pulse-slow">
          <ICONS.Trophy size={18} className="text-pixel-green" />
        </div>
      </div>

      {/* XP Bar */}
      <div className="relative z-10">
        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
          <span><Counter end={stats.xp % xpForNextLevel} /> XP</span>
          <span>{xpForNextLevel} XP</span>
        </div>
        <div className="h-2 w-full bg-slate-900 rounded-sm overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-pixel-green shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 gap-3 pt-2 relative z-10">
        <StatItem icon={ICONS.BrainCircuit} label="Learned" value={stats.conceptsLearned} color="text-cyan-400" />
        <StatItem icon={ICONS.CheckCircle2} label="Solved" value={stats.correctAnswers} color="text-emerald-400" />
        <StatItem icon={ICONS.RefreshCw} label="Refactors" value={stats.refactorsPerformed} color="text-purple-400" />
        <StatItem icon={ICONS.Cpu} label="IQ Score" value={Math.floor(stats.xp * 0.5) + 85} color="text-yellow-400" />
      </div>
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-slate-900/40 hover:bg-slate-800/60 rounded p-2 border border-slate-800 hover:border-slate-600 flex flex-col items-center justify-center gap-1 transition-all duration-300 group">
    <Icon size={14} className={`${color} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform`} />
    <span className="text-base font-bold text-slate-200 font-mono"><Counter end={value} /></span>
    <span className="text-[9px] text-slate-500 uppercase tracking-wider font-pixel">{label}</span>
  </div>
);

export default StatsChart;