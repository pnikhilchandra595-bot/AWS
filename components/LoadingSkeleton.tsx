import { motion } from 'framer-motion';

export function MessageSkeleton() {
  return (
    <div className="flex gap-4 animate-pulse">
      <div className="w-8 h-8 rounded-lg bg-slate-800"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
        <div className="h-4 bg-slate-800 rounded w-1/2"></div>
        <div className="h-4 bg-slate-800 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-32 bg-slate-800 rounded-lg"></div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-16 bg-slate-800 rounded"></div>
        <div className="h-16 bg-slate-800 rounded"></div>
        <div className="h-16 bg-slate-800 rounded"></div>
      </div>
    </div>
  );
}

export function QuickPromptSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 w-32 bg-slate-800 rounded"></div>
      ))}
    </div>
  );
}
