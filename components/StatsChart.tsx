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
      {/* HUGE Level Display */}
      <div className="bg-gradient-to-br from-pixel-green/20 to-emerald-900/20 border-2 border-pixel-green/50 rounded-xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.3)] relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pixel-green/5 to-transparent opacity-50 animate-pulse-slow" />

        {/* Level Content */}
        <div className="relative z-10 text-center">
          <div className="text-xs font-mono text-pixel-green uppercase tracking-widest mb-2">Current Rank</div>
          
          {/* MASSIVE Level Number */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-7xl font-black text-white font-mono leading-none">
              <Counter end={stats.level} />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-pixel-green font-mono">LEVEL</div>
              <div className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-700 font-mono">DEV</div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span><Counter end={stats.xp % xpForNextLevel} /> XP</span>
              <span>{xpForNextLevel} XP</span>
            </div>
            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-pixel-green to-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-center text-xs text-slate-500 font-mono">
              {Math.floor(progressPercent)}% to Level {stats.level + 1}
            </div>
          </div>
        </div>

        {/* Trophy Icon */}
        <div className="absolute top-4 right-4 opacity-20">
          <ICONS.Trophy size={60} className="text-pixel-green" />
        </div>
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