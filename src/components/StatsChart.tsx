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
    <div className="space-y-4">
      {/* MASSIVE ULTRA-VISIBLE Level Display */}
      <div className="bg-gradient-to-br from-pixel-green/30 via-emerald-600/20 to-green-900/30 border-4 border-pixel-green rounded-2xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.6)] relative overflow-hidden animate-pulse-slow">
        
        {/* Multiple Animated Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pixel-green/10 to-transparent opacity-70 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent_70%)]" />

        {/* Level Content */}
        <div className="relative z-10 text-center">
          <div className="text-sm font-mono text-pixel-green uppercase tracking-[0.3em] mb-3 font-bold animate-pulse">⚡ CURRENT RANK ⚡</div>
          
          {/* ULTRA MASSIVE Level Number */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-9xl font-black text-white font-mono leading-none drop-shadow-[0_0_25px_rgba(34,197,94,0.8)] animate-pulse">
              <Counter end={stats.level} />
            </div>
            <div className="text-left">
              <div className="text-4xl font-black text-pixel-green font-mono drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">LEVEL</div>
              <div className="text-sm text-white bg-pixel-green/20 px-3 py-1.5 rounded-lg border-2 border-pixel-green font-mono font-bold mt-2">DEVELOPER</div>
            </div>
          </div>

          {/* Enhanced XP Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-mono text-pixel-green font-bold">
              <span className="bg-slate-900/50 px-2 py-1 rounded border border-pixel-green/30"><Counter end={stats.xp % xpForNextLevel} /> XP</span>
              <span className="bg-slate-900/50 px-2 py-1 rounded border border-pixel-green/30">{xpForNextLevel} XP</span>
            </div>
            <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden border-2 border-pixel-green/50 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-pixel-green via-emerald-400 to-green-300 shadow-[0_0_20px_rgba(34,197,94,0.8)] transition-all duration-1000 ease-out relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
            <div className="text-center text-sm text-pixel-green font-mono font-bold bg-slate-900/50 py-1 rounded border border-pixel-green/30">
              {Math.floor(progressPercent)}% → Level {stats.level + 1}
            </div>
          </div>
        </div>

        {/* Larger Trophy Icon with Glow */}
        <div className="absolute top-6 right-6 opacity-30 animate-pulse">
          <ICONS.Trophy size={80} className="text-pixel-green drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-pixel-green" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-pixel-green" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-pixel-green" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-pixel-green" />
      </div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatItem icon={ICONS.BrainCircuit} label="Learned" value={stats.conceptsLearned} color="text-cyan-400" />
        <StatItem icon={ICONS.CheckCircle2} label="Solved" value={stats.correctAnswers} color="text-emerald-400" />
        <StatItem icon={ICONS.RefreshCw} label="Refactors" value={stats.refactorsPerformed} color="text-purple-400" />
        <StatItem icon={ICONS.Zap} label="Total XP" value={stats.xp} color="text-yellow-400" />
      </div>
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-slate-900/60 rounded p-2.5 border border-slate-800 flex items-center gap-2 transition-all duration-300 hover:border-pixel-green/30">
    <Icon size={16} className={`${color}`} />
    <div className="flex-1 min-w-0">
      <div className="text-lg font-bold text-white font-mono leading-none"><Counter end={value} /></div>
      <div className="text-[8px] text-slate-500 uppercase tracking-wider font-mono">{label}</div>
    </div>
  </div>
);

export default StatsChart;