import { useState, useEffect } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastVisit: number;
}

export const useStreak = (userId: string | undefined) => {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastVisit: Date.now()
  });

  useEffect(() => {
    if (!userId) return;

    const key = `devflow_streak_${userId}`;
    const saved = localStorage.getItem(key);
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (saved) {
      const data: StreakData = JSON.parse(saved);
      const daysSinceLastVisit = Math.floor((now - data.lastVisit) / oneDayMs);

      if (daysSinceLastVisit === 0) {
        // Same day, keep streak
        setStreak(data);
      } else if (daysSinceLastVisit === 1) {
        // Next day, increment streak
        const newStreak = {
          currentStreak: data.currentStreak + 1,
          longestStreak: Math.max(data.longestStreak, data.currentStreak + 1),
          lastVisit: now
        };
        setStreak(newStreak);
        localStorage.setItem(key, JSON.stringify(newStreak));
      } else {
        // Streak broken
        const newStreak = {
          currentStreak: 1,
          longestStreak: data.longestStreak,
          lastVisit: now
        };
        setStreak(newStreak);
        localStorage.setItem(key, JSON.stringify(newStreak));
      }
    } else {
      // First visit
      const newStreak = {
        currentStreak: 1,
        longestStreak: 1,
        lastVisit: now
      };
      setStreak(newStreak);
      localStorage.setItem(key, JSON.stringify(newStreak));
    }
  }, [userId]);

  return streak;
};
