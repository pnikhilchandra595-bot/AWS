import { User, UserStats } from "../types";

const DB_KEY = 'devflow_users_db';
const SESSION_KEY = 'devflow_session';

const initialStats: UserStats = {
  xp: 0,
  level: 1,
  conceptsLearned: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  refactorsPerformed: 0,
  streak: 0
};

// Helper to get DB
const getDB = (): User[] => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save DB
const saveDB = (users: User[]) => {
  localStorage.setItem(DB_KEY, JSON.stringify(users));
};

export const authService = {
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getDB();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: "Invalid email or password" };
  },

  signup: async (name: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getDB();
    if (users.some(u => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password, // Note: In a real app, never store plain text passwords
      stats: initialStats,
      createdAt: Date.now()
    };

    users.push(newUser);
    saveDB(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

    return { success: true, user: newUser };
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  updateStats: (newStats: UserStats) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return;

    const users = getDB();
    const index = users.findIndex(u => u.id === currentUser.id);
    
    if (index !== -1) {
      users[index].stats = newStats;
      saveDB(users);
      // Update session as well
      currentUser.stats = newStats;
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    }
  }
};
