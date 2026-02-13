export enum Sender {
  USER = 'USER',
  AI = 'AI',
  SYSTEM = 'SYSTEM'
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string; // In a real app, this would be hashed
  stats: UserStats;
  createdAt: number;
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  isStreaming?: boolean;
  relatedCode?: string;
  audioData?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizData {
  topic: string;
  difficulty: QuizDifficulty;
  questions: QuizQuestion[];
}

export enum AppMode {
  LEARN = 'LEARN',
  REFACTOR = 'REFACTOR',
  QUIZ = 'QUIZ',
  GROK = 'GROK'
}

export enum RefactorType {
  CLEAN_CODE = 'Clean Code & Readability',
  PERFORMANCE = 'Performance Optimization',
  SECURITY = 'Security Hardening',
  MODERN = 'Modern Syntax (ES6+/Latest)'
}

export enum QuizDifficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface UserStats {
  xp: number;
  level: number;
  conceptsLearned: number;
  questionsAnswered: number;
  correctAnswers: number;
  refactorsPerformed: number;
  streak: number;
}
