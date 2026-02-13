export interface NarutoRank {
  level: number;
  name: string;
  title: string;
  color: string;
  gradient: string;
  icon: string;
  quote: string;
}

export const NARUTO_RANKS: NarutoRank[] = [
  {
    level: 1,
    name: 'Academy Student',
    title: '🎓 Academy Student',
    color: '#94a3b8',
    gradient: 'from-slate-400 to-slate-600',
    icon: '📚',
    quote: 'Every ninja starts somewhere!'
  },
  {
    level: 5,
    name: 'Genin',
    title: '⚡ Genin',
    color: '#22c55e',
    gradient: 'from-green-400 to-green-600',
    icon: '🥷',
    quote: 'The journey of a thousand miles begins with a single step.'
  },
  {
    level: 10,
    name: 'Chunin',
    title: '🔥 Chunin',
    color: '#f59e0b',
    gradient: 'from-orange-400 to-orange-600',
    icon: '⚔️',
    quote: 'Hard work beats talent when talent doesn\'t work hard!'
  },
  {
    level: 20,
    name: 'Jonin',
    title: '⚡ Jonin',
    color: '#3b82f6',
    gradient: 'from-blue-400 to-blue-600',
    icon: '🌟',
    quote: 'A true ninja never gives up!'
  },
  {
    level: 30,
    name: 'ANBU',
    title: '🎭 ANBU Black Ops',
    color: '#8b5cf6',
    gradient: 'from-purple-400 to-purple-600',
    icon: '🎭',
    quote: 'Those who break the rules are scum, but those who abandon their friends are worse than scum.'
  },
  {
    level: 50,
    name: 'Sannin',
    title: '🐉 Legendary Sannin',
    color: '#ec4899',
    gradient: 'from-pink-400 to-pink-600',
    icon: '🐉',
    quote: 'The true measure of a shinobi is not how they live, but how they die.'
  },
  {
    level: 75,
    name: 'Kage',
    title: '👑 Kage',
    color: '#f59e0b',
    gradient: 'from-yellow-400 to-orange-600',
    icon: '👑',
    quote: 'When people are protecting something truly special to them, they can become as strong as they can be.'
  },
  {
    level: 100,
    name: 'Hokage',
    title: '🔥 Hokage - Shadow of Fire',
    color: '#ef4444',
    gradient: 'from-red-400 to-orange-600',
    icon: '🔥',
    quote: 'I won\'t run away anymore... I won\'t go back on my word... that is my ninja way!'
  }
];

export function getNarutoRank(level: number): NarutoRank {
  const ranks = [...NARUTO_RANKS].reverse();
  return ranks.find(rank => level >= rank.level) || NARUTO_RANKS[0];
}

export const JUTSU_ACHIEVEMENTS = [
  { id: 'shadow-clone', name: 'Shadow Clone Jutsu', description: 'Send 100 messages', icon: '👥', xp: 500 },
  { id: 'rasengan', name: 'Rasengan', description: 'Complete 50 quizzes', icon: '🌀', xp: 1000 },
  { id: 'chidori', name: 'Chidori', description: 'Refactor 100 code snippets', icon: '⚡', xp: 1000 },
  { id: 'sharingan', name: 'Sharingan', description: 'Maintain 30-day streak', icon: '👁️', xp: 2000 },
  { id: 'sage-mode', name: 'Sage Mode', description: 'Reach level 50', icon: '🧘', xp: 5000 },
  { id: 'nine-tails', name: 'Nine-Tails Chakra', description: 'Earn 10,000 XP', icon: '🦊', xp: 10000 },
];
