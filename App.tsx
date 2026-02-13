import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS, SAMPLE_PROMPTS, CATEGORIZED_PROMPTS } from './constants';
import { Message, Sender, AppMode, QuizData, UserStats, RefactorType, QuizDifficulty, User } from './types';
import { streamChatResponse, refactorCode, generateQuiz, generateSpeech } from './services/geminiService';
import { streamGrokResponse, isXAIConfigured } from './services/xaiService';
import { authService } from './services/authService';
import MarkdownRenderer from './components/MarkdownRenderer';
import QuizModal from './components/QuizModal';
import StatsChart from './components/StatsChart';
import AuthPage from './components/AuthPage';
import IntroOverlay from './components/IntroOverlay';
import ToastProvider from './components/Toast';
import ParticleBackground from './components/ParticleBackground';
import CommandPalette from './components/CommandPalette';
import CodePlayground from './components/CodePlayground';
import MessageSearch from './components/MessageSearch';
import AchievementNotification from './components/AchievementNotification';
import VoiceInput from './components/VoiceInput';
import HelpOverlay from './components/HelpOverlay';
import ErrorBoundary from './components/ErrorBoundary';
import OnboardingTutorial from './components/OnboardingTutorial';
import AIComparisonMode from './components/AIComparisonMode';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import LearningPath from './components/LearningPath';
import CodeReviewMode from './components/CodeReviewMode';
import AIPersonalitySelector from './components/AIPersonalitySelector';
import DailyChallenges from './components/DailyChallenges';
import AccessibilityPanel from './components/AccessibilityPanel';
import SmartSuggestions from './components/SmartSuggestions';
import ComingSoonFeature from './components/ComingSoonFeature';
import { comingSoonFeatures } from './data/comingSoonFeatures';
import type { Personality } from './components/AIPersonalitySelector';
import KeyboardShortcutsGuide from './components/KeyboardShortcutsGuide';
import ShareProgress from './components/ShareProgress';
import AppLoadingSkeleton from './components/AppLoadingSkeleton';
import { useTheme } from './hooks/useTheme';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useStreak } from './hooks/useStreak';
import toast from 'react-hot-toast';

// Audio Context helper
const playAudio = (base64String: string) => {
  try {
    const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
    audio.play();
  } catch (e) {  
    console.error("Audio playback failed", e);
  }
};

type PromptCategory = 'FRONTEND' | 'BACKEND' | 'CS_FUNDAMENTALS';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  xp: number;
}

export default function App() {
  // Intro State
  const [showIntro, setShowIntro] = useState(true);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  
  // App State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<AppMode>(AppMode.LEARN);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Search State
  const [activeCategory, setActiveCategory] = useState<PromptCategory>('FRONTEND');
  
  // Advanced State
  const [refactorType, setRefactorType] = useState<RefactorType>(RefactorType.CLEAN_CODE);
  const [quizDifficulty, setQuizDifficulty] = useState<QuizDifficulty>(QuizDifficulty.INTERMEDIATE);

  // New Features State
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showCodePlayground, setShowCodePlayground] = useState(false);
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [showHelpOverlay, setShowHelpOverlay] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [bookmarkedMessages, setBookmarkedMessages] = useState<string[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  // Ultimate Features State
  const [showAIComparison, setShowAIComparison] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [showCodeReview, setShowCodeReview] = useState(false);

  // New Advanced Features State
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [selectedComingSoon, setSelectedComingSoon] = useState<string | null>(null);
  const [currentPersonality, setCurrentPersonality] = useState('friendly');
  
  // New Improvement Features State
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);
  const [showShareProgress, setShowShareProgress] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Custom Hooks
  const { theme, toggleTheme } = useTheme();
  const streak = useStreak(user?.id);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // App loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut for guide
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowKeyboardGuide(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Keyboard Shortcuts
  useKeyboardShortcuts({
    'ctrl+k': () => setShowCommandPalette(true),
    'ctrl+/': () => setShowMessageSearch(true),
    'ctrl+e': () => handleExportChat(),
    'ctrl+shift+t': () => toggleTheme(),
    'ctrl+shift+c': () => setShowAIComparison(true),
    'ctrl+shift+a': () => setShowAnalytics(true),
    'ctrl+shift+l': () => setShowLearningPath(true),
    'ctrl+shift+r': () => setShowCodeReview(true),
    'ctrl+shift+p': () => setShowPersonalitySelector(true),
    'ctrl+shift+d': () => setShowDailyChallenge(true),
    'escape': () => {
      setShowCommandPalette(false);
      setShowMessageSearch(false);
      setShowCodePlayground(false);
      setShowHelpOverlay(false);
      setShowAIComparison(false);
      setShowAnalytics(false);
      setShowLearningPath(false);
      setShowCodeReview(false);
      setShowPersonalitySelector(false);
      setShowDailyChallenge(false);
      setShowAccessibility(false);
      setSelectedComingSoon(null);
    }
  });

  // Check auth on load
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      initChat(currentUser.name);
      
      // Load bookmarks
      const saved = localStorage.getItem(`devflow_bookmarks_${currentUser.id}`);
      if (saved) setBookmarkedMessages(JSON.parse(saved));
      
      // Check if tutorial should be shown
      const tutorialCompleted = localStorage.getItem('devflow_tutorial_completed');
      if (!tutorialCompleted) {
        // Show tutorial after a short delay
        setTimeout(() => setShowOnboarding(true), 1000);
      }
    }
  }, []);

  const initChat = (userName: string) => {
    setMessages([
      {
        id: 'init',
        text: `**System Online.** Welcome back, ${userName}.\n\nDevFlow AI v2.0 is ready. Select a module below or start typing to begin.\n\n🔥 Current Streak: **${streak.currentStreak} days**`,
        sender: Sender.AI,
        timestamp: Date.now()
      }
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle Logout
  const handleLogout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Check for achievements
  const checkAchievements = (stats: UserStats) => {
    const achievements: Achievement[] = [];

    if (stats.conceptsLearned === 1) {
      achievements.push({
        id: 'first_steps',
        title: 'First Steps',
        description: 'Completed your first learning interaction',
        icon: 'BookOpen',
        xp: 50
      });
    }

    if (stats.refactorsPerformed === 10) {
      achievements.push({
        id: 'code_ninja',
        title: 'Code Ninja',
        description: 'Performed 10 code refactors',
        icon: 'Code2',
        xp: 100
      });
    }

    if (stats.questionsAnswered >= 5 && stats.correctAnswers === stats.questionsAnswered) {
      achievements.push({
        id: 'perfect_score',
        title: 'Perfect Score',
        description: 'Answered 5 questions with 100% accuracy',
        icon: 'Trophy',
        xp: 150
      });
    }

    if (streak.currentStreak === 7) {
      achievements.push({
        id: 'week_warrior',
        title: 'Week Warrior',
        description: '7-day learning streak!',
        icon: 'Flame',
        xp: 200
      });
    }

    if (achievements.length > 0) {
      setCurrentAchievement(achievements[0]);
    }
  };

  // Update Stats Helper
  const updateStats = (modifier: (prev: UserStats) => UserStats) => {
    if (!user) return;
    const newStats = modifier(user.stats);
    const newLevel = Math.floor(newStats.xp / 100) + 1;
    const finalStats = { ...newStats, level: newLevel };
    
    // Check for level up
    if (newLevel > user.stats.level) {
      toast.success(`🎉 Level Up! You're now Level ${newLevel}`, { duration: 5000 });
    }

    // Update local state
    setUser({ ...user, stats: finalStats });
    // Update DB
    authService.updateStats(finalStats);
    
    // Check achievements
    checkAchievements(finalStats);
  };

  // Export Chat
  const handleExportChat = () => {
    const chatData = {
      user: user?.name,
      exportDate: new Date().toISOString(),
      messages: messages.map(m => ({
        sender: m.sender,
        text: m.text,
        timestamp: new Date(m.timestamp).toLocaleString()
      }))
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devflow-chat-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Chat exported successfully!');
  };

  // Clear Chat
  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
      toast.success('Chat cleared');
    }
  };

  // Bookmark Message
  const toggleBookmark = (messageId: string) => {
    if (!user) return;
    
    const newBookmarks = bookmarkedMessages.includes(messageId)
      ? bookmarkedMessages.filter(id => id !== messageId)
      : [...bookmarkedMessages, messageId];
    
    setBookmarkedMessages(newBookmarks);
    localStorage.setItem(`devflow_bookmarks_${user.id}`, JSON.stringify(newBookmarks));
    
    toast.success(
      bookmarkedMessages.includes(messageId) ? 'Bookmark removed' : 'Message bookmarked'
    );
  };

  // AI Comparison Handler
  const handleAIComparison = async (query: string): Promise<{ gemini: string; grok: string }> => {
    let geminiResponse = '';
    let grokResponse = '';

    // Get Gemini response
    await streamChatResponse([], query, (chunk) => {
      geminiResponse += chunk;
    });

    // Get Grok response
    await streamGrokResponse([{ role: 'user', content: query }], (chunk) => {
      grokResponse += chunk;
    }, true);

    return { gemini: geminiResponse, grok: grokResponse };
  };

  // Code Review Handler
  const handleCodeReview = async (code: string, language: string) => {
    // Mock implementation - in production, call AI for real review
    const issues = [
      {
        type: 'security' as const,
        severity: 'high' as const,
        line: 5,
        message: 'Potential SQL injection vulnerability',
        suggestion: 'Use parameterized queries instead of string concatenation'
      },
      {
        type: 'performance' as const,
        severity: 'medium' as const,
        line: 12,
        message: 'Inefficient loop detected',
        suggestion: 'Consider using Array.map() for better performance'
      },
      {
        type: 'style' as const,
        severity: 'low' as const,
        line: 8,
        message: 'Inconsistent naming convention',
        suggestion: 'Use camelCase for variable names'
      }
    ];

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return issues;
  };

  // Personality Handler
  const handlePersonalitySelect = (personality: Personality) => {
    setCurrentPersonality(personality.id);
    toast.success(`AI Personality changed to ${personality.name}!`);
    // In production, this would update the system prompt for AI calls
  };

  // Daily Challenge Complete Handler
  const handleChallengeComplete = (challengeId: string, xp: number) => {
    updateStats(prev => ({ ...prev, xp: prev.xp + xp }));
    toast.success(`Challenge complete! +${xp} XP`);
  };

  // Scroll to message
  const scrollToMessage = (messageId: string) => {
    const element = document.getElementById(`msg-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight-message');
      setTimeout(() => element.classList.remove('highlight-message'), 2000);
    }
  };

  // Handlers
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: Sender.USER,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (mode === AppMode.REFACTOR) {
        const loadingMsgId = 'loading-' + Date.now();
        setMessages(prev => [...prev, { id: loadingMsgId, text: `Analyzing code for **${refactorType}**...`, sender: Sender.AI, timestamp: Date.now(), isStreaming: true }]);
        
        const result = await refactorCode(userMsg.text, refactorType);
        
        setMessages(prev => prev.map(m => m.id === loadingMsgId ? { ...m, text: result, isStreaming: false } : m));
        updateStats(prev => ({ ...prev, refactorsPerformed: prev.refactorsPerformed + 1, xp: prev.xp + 25 }));

      } else if (mode === AppMode.QUIZ) {
        const loadingMsgId = 'loading-' + Date.now();
        setMessages(prev => [...prev, { id: loadingMsgId, text: `Constructing ${quizDifficulty} quiz module...`, sender: Sender.AI, timestamp: Date.now(), isStreaming: true }]);
        
        const quiz = await generateQuiz(userMsg.text, quizDifficulty);
        
        if (quiz) {
          setActiveQuiz(quiz);
          setMessages(prev => prev.filter(m => m.id !== loadingMsgId));
        } else {
           setMessages(prev => prev.map(m => m.id === loadingMsgId ? { ...m, text: "Error: Could not generate quiz parameters. Try a different topic.", isStreaming: false } : m));
        }

      } else if (mode === AppMode.GROK) {
        // Grok Mode with Web Search & X Search
        const aiMsgId = 'grok-' + Date.now();
        setMessages(prev => [...prev, { id: aiMsgId, text: '', sender: Sender.AI, timestamp: Date.now(), isStreaming: true }]);

        const grokHistory = messages.map(m => ({
          role: m.sender === Sender.USER ? 'user' as const : 'assistant' as const,
          content: m.text
        })).slice(-8);

        grokHistory.push({ role: 'user', content: userMsg.text });

        let fullResponse = "";
        await streamGrokResponse(grokHistory, (chunk) => {
          fullResponse += chunk;
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullResponse } : m));
        }, true);

        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m));
        updateStats(prev => ({ ...prev, conceptsLearned: prev.conceptsLearned + 1, xp: prev.xp + 15 }));

      } else {
        const aiMsgId = 'ai-' + Date.now();
        setMessages(prev => [...prev, { id: aiMsgId, text: '', sender: Sender.AI, timestamp: Date.now(), isStreaming: true }]);

        const history = messages.map(m => ({
          role: m.sender === Sender.USER ? 'user' : 'model',
          parts: [{ text: m.text }]
        })).slice(-8) as any;

        let fullResponse = "";
        await streamChatResponse(history, userMsg.text, (chunk) => {
          fullResponse += chunk;
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullResponse } : m));
        });

        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m));
        updateStats(prev => ({ ...prev, conceptsLearned: prev.conceptsLearned + 1, xp: prev.xp + 10 }));
      }

    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "System Error.", sender: Sender.SYSTEM, timestamp: Date.now() }]);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTTS = async (text: string, msgId: string) => {
    const msg = messages.find(m => m.id === msgId);
    if (msg?.audioData) {
      playAudio(msg.audioData);
      return;
    }
    
    toast.loading('Generating audio...');
    const audioData = await generateSpeech(text);
    toast.dismiss();
    
    if (audioData) {
      playAudio(audioData);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, audioData } : m));
      toast.success('Audio ready!');
    } else {
      toast.error('Audio generation failed');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isAppLoading) {
    return <AppLoadingSkeleton />;
  }

  if (showIntro) {
    return <IntroOverlay onComplete={() => setShowIntro(false)} />;
  }

  if (!user) {
    return (
      <ErrorBoundary>
        <AuthPage onAuthSuccess={(u) => { setUser(u); initChat(u.name); }} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen overflow-hidden text-[var(--text-primary)] selection:bg-purple-500/30 font-sans relative" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}>
      <ToastProvider />
      <ParticleBackground />
      <AchievementNotification 
        achievement={currentAchievement} 
        onClose={() => setCurrentAchievement(null)} 
      />
      
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onModeChange={setMode}
        onExportChat={handleExportChat}
        onClearChat={handleClearChat}
        onToggleTheme={toggleTheme}
      />

      <CodePlayground
        isOpen={showCodePlayground}
        onClose={() => setShowCodePlayground(false)}
      />

      <HelpOverlay
        isOpen={showHelpOverlay}
        onClose={() => setShowHelpOverlay(false)}
      />

      <OnboardingTutorial
        isOpen={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
        userName={user?.name || 'Developer'}
      />

      <MessageSearch
        isOpen={showMessageSearch}
        onClose={() => setShowMessageSearch(false)}
        messages={messages}
        onSelectMessage={scrollToMessage}
      />

      <KeyboardShortcutsGuide
        isOpen={showKeyboardGuide}
        onClose={() => setShowKeyboardGuide(false)}
      />

      <ShareProgress
        isOpen={showShareProgress}
        onClose={() => setShowShareProgress(false)}
        stats={user?.stats || { level: 1, xp: 0, conceptsLearned: 0, quizzesPassed: 0, streak: 0 }}
        userName={user?.name || 'Developer'}
      />

      {/* Mobile Sidebar Overlay */}
      {!showSidebar && (
         <motion.button 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           onClick={() => setShowSidebar(true)} 
           className="fixed top-4 left-4 z-40 p-2 bg-slate-900/80 border border-slate-700 rounded-lg text-slate-400 hover:text-white md:hidden backdrop-blur"
         >
           <ICONS.Menu size={20} />
         </motion.button>
      )}

      {/* Sidebar - Game HUD Style */}
      <AnimatePresence>
        {showSidebar && (
          <motion.aside 
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-y-0 left-0 z-50 w-80 border-r border-purple-500/20 md:relative backdrop-blur-xl" style={{ background: 'rgba(15, 23, 42, 0.85)' }}
          >
            <div className="flex flex-col h-full p-6 relative overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

              {/* Logo */}
              <div className="flex items-center gap-3 mb-10 relative z-10">
                <div className="relative group">
                  <div className="absolute inset-0 bg-pixel-green/40 blur-md rounded-full animate-pulse-slow"></div>
                  <div className="relative bg-slate-900 rounded-xl p-2.5 border border-pixel-green/50">
                    <ICONS.BrainCircuit size={24} className="text-pixel-green" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight leading-none font-pixel bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'gradient-text-shift 4s ease infinite' }}>DevFlow</h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">System Online</p>
                  </div>
                </div>
                <button onClick={() => setShowSidebar(false)} className="md:hidden ml-auto text-slate-500">
                  <ICONS.X size={20}/>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mb-6 relative z-10">
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCommandPalette(true)}
                    className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/40 rounded-lg flex flex-col items-center gap-1 transition-all duration-300"
                    title="Command Palette (Ctrl+K)"
                    style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.2)' }}
                  >
                    <ICONS.Terminal size={16} className="text-green-400" />
                    <span className="text-[9px] text-slate-300 font-mono">CMD</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCodePlayground(true)}
                    className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/40 rounded-lg flex flex-col items-center gap-1 transition-all duration-300"
                    title="Code Playground"
                    style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)' }}
                  >
                    <ICONS.Code2 size={16} className="text-purple-400" />
                    <span className="text-[9px] text-slate-300 font-mono">CODE</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/40 rounded-lg flex flex-col items-center gap-1 transition-all duration-300"
                    title="Toggle Theme"
                    style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}
                  >
                    {theme === 'dark' ? <ICONS.Moon size={16} className="text-blue-400" /> : <ICONS.Sun size={16} className="text-yellow-400" />}
                    <span className="text-[9px] text-slate-300 font-mono">THEME</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHelpOverlay(true)}
                    className="p-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 border border-yellow-500/40 rounded-lg flex flex-col items-center gap-1 transition-all duration-300"
                    title="Help & Guide"
                    style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.2)' }}
                  >
                    <ICONS.HelpCircle size={16} className="text-yellow-400" />
                    <span className="text-[9px] text-slate-300 font-mono">HELP</span>
                  </motion.button>
                </div>

                {/* NEW Ultimate Features Row */}
                <div className="grid grid-cols-4 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAIComparison(true)}
                    className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/30 rounded-lg flex flex-col items-center gap-1 transition-colors"
                    title="AI Battle (Ctrl+Shift+C)"
                  >
                    <ICONS.Zap size={16} className="text-blue-400" />
                    <span className="text-[9px] text-slate-400 font-mono">BATTLE</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAnalytics(true)}
                    className="p-3 bg-gradient-to-br from-pixel-green/10 to-emerald-500/10 hover:from-pixel-green/20 hover:to-emerald-500/20 border border-pixel-green/30 rounded-lg flex flex-col items-center gap-1 transition-colors"
                    title="Analytics (Ctrl+Shift+A)"
                  >
                    <ICONS.BarChart2 size={16} className="text-pixel-green" />
                    <span className="text-[9px] text-slate-400 font-mono">STATS</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLearningPath(true)}
                    className="p-3 bg-gradient-to-br from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border border-orange-500/30 rounded-lg flex flex-col items-center gap-1 transition-colors"
                    title="Learning Path (Ctrl+Shift+L)"
                  >
                    <ICONS.Target size={16} className="text-orange-400" />
                    <span className="text-[9px] text-slate-400 font-mono">PATH</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCodeReview(true)}
                    className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/30 rounded-lg flex flex-col items-center gap-1 transition-colors"
                    title="Code Review (Ctrl+Shift+R)"
                  >
                    <ICONS.Shield size={16} className="text-purple-400" />
                    <span className="text-[9px] text-slate-400 font-mono">REVIEW</span>
                  </motion.button>
                </div>

                {/* NEW Advanced Features Row */}
                <div className="grid grid-cols-4 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPersonalitySelector(true)}
                    className="p-3 bg-gradient-to-br from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 border border-pink-500/30 rounded-lg flex flex-col items-center gap-1 transition-colors"
                    title="AI Personality (Ctrl+Shift+P)"
                  >
                    <ICONS.Heart size={16} className="text-pink-400" />
                    <span className="text-[9px] text-slate-400 font-mono">PERSONA</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDailyChallenge(true)}
                    className="p-3 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20 border border-orange-500/30 rounded-lg flex flex-col items-center gap-1 transition-colors"
                    title="Daily Challenge (Ctrl+Shift+D)"
                  >
                    <ICONS.Target size={16} className="text-orange-400" />
                    <span className="text-[9px] text-slate-400 font-mono">DAILY</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAccessibility(true)}
                    className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/30 rounded-lg flex flex-col items-center gap-1 transition-colors"
                    title="Accessibility"
                  >
                    <ICONS.Users size={16} className="text-blue-400" />
                    <span className="text-[9px] text-slate-400 font-mono">A11Y</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedComingSoon('voice-commands')}
                    className="p-3 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 border border-purple-500/30 rounded-lg flex flex-col items-center gap-1 transition-colors relative"
                    title="More Features"
                  >
                    <ICONS.Sparkles size={16} className="text-purple-400" />
                    <span className="text-[9px] text-slate-400 font-mono">MORE</span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  </motion.button>
                </div>

                {/* NEW Fourth Row - Utility Features */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowKeyboardGuide(true)}
                    className="p-3 bg-gradient-to-br from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 border border-orange-500/40 rounded-lg flex flex-col items-center gap-1 transition-all duration-300"
                    title="Keyboard Shortcuts (?)"
                    style={{ boxShadow: '0 0 10px rgba(251, 146, 60, 0.2)' }}
                  >
                    <ICONS.Keyboard size={16} className="text-orange-400" />
                    <span className="text-[9px] text-slate-300 font-mono">KEYS</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareProgress(true)}
                    className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/40 rounded-lg flex flex-col items-center gap-1 transition-all duration-300"
                    title="Share Progress"
                    style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.2)' }}
                  >
                    <ICONS.Share2 size={16} className="text-green-400" />
                    <span className="text-[9px] text-slate-300 font-mono">SHARE</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExportChat}
                    className="p-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-500/40 rounded-lg flex flex-col items-center gap-1 transition-all duration-300"
                    title="Export Chat (Ctrl+E)"
                    style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}
                  >
                    <ICONS.Download size={16} className="text-blue-400" />
                    <span className="text-[9px] text-slate-300 font-mono">EXPORT</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearChat}
                    className="p-3 bg-gradient-to-br from-red-500/10 to-rose-500/10 hover:from-red-500/20 hover:to-rose-500/20 border border-red-500/40 rounded-lg flex flex-col items-center gap-1 transition-all duration-300"
                    title="Clear Chat"
                    style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.2)' }}
                  >
                    <ICONS.Trash2 size={16} className="text-red-400" />
                    <span className="text-[9px] text-slate-300 font-mono">CLEAR</span>
                  </motion.button>
                </div>

                {/* Replay Tutorial Button */}
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="mt-2 w-full text-xs text-slate-500 hover:text-pixel-green transition-colors font-mono uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ICONS.Play size={12} />
                  Replay Tutorial
                </button>
              </div>

              {/* Smart Suggestions */}
              {user && (
                <SmartSuggestions
                  userStats={user.stats}
                  onSelectTopic={(topic) => {
                    setInputValue(`Explain ${topic}`);
                    inputRef.current?.focus();
                  }}
                />
              )}

              {/* Nav */}
              <nav className="space-y-3 flex-1 animate-fade-in-up delay-100 relative z-10">
                <NavItem 
                  active={mode === AppMode.LEARN} 
                  onClick={() => setMode(AppMode.LEARN)}
                  icon={ICONS.BookOpen} 
                  label="Learn & Explore" 
                  desc="Neural Knowledge Base"
                />
                <NavItem 
                  active={mode === AppMode.REFACTOR} 
                  onClick={() => setMode(AppMode.REFACTOR)}
                  icon={ICONS.Code2} 
                  label="Refactor Engine" 
                  desc="Code Optimization Core"
                />
                <NavItem 
                  active={mode === AppMode.QUIZ} 
                  onClick={() => setMode(AppMode.QUIZ)}
                  icon={ICONS.Zap} 
                  label="Skill Assessment" 
                  desc="Competency Verification"
                />
                {isXAIConfigured() && (
                  <NavItem 
                    active={mode === AppMode.GROK} 
                    onClick={() => setMode(AppMode.GROK)}
                    icon={ICONS.Globe} 
                    label="Grok AI" 
                    desc="Web Search & X Integration"
                  />
                )}
              </nav>

              {/* Streak Display */}
              {streak.currentStreak > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg relative z-10"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ICONS.Flame size={16} className="text-orange-400" />
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Streak</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{streak.currentStreak}</span>
                    <span className="text-xs text-slate-400">days</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Best: {streak.longestStreak} days
                  </div>
                </motion.div>
              )}

              {/* Stats & User */}
              <div className="mt-8 space-y-4 animate-fade-in-up delay-200 relative z-10">
                <StatsChart stats={user.stats} />
                
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-pixel-green font-bold text-xs font-mono">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{user.name}</span>
                      <span className="text-[9px] text-slate-500 font-mono">{user.email}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded transition-colors group"
                    title="Log Out"
                  >
                    <ICONS.LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-w-0" style={{ background: 'rgba(2, 6, 23, 0.6)' }}>
        
        {/* Dynamic Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs font-mono uppercase">MODULE //</span>
              <span className="text-pixel-green font-bold tracking-wider text-sm font-mono animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-pixel-green/50 pr-1">
                {mode === AppMode.LEARN ? "NEURAL_LEARNING" : mode === AppMode.REFACTOR ? "CODE_OPTIMIZATION" : mode === AppMode.QUIZ ? "SKILL_VERIFICATION" : "GROK_AI_SEARCH"}
              </span>
            </div>
            
            {/* Compact Mode Selector */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode(AppMode.LEARN)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  mode === AppMode.LEARN 
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 shadow-lg shadow-green-500/20' 
                    : 'bg-slate-800/50 border border-slate-700 hover:border-green-500/30'
                }`}
                title="Learn & Explore"
              >
                <ICONS.BookOpen size={16} className={mode === AppMode.LEARN ? 'text-green-400' : 'text-slate-400'} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode(AppMode.REFACTOR)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  mode === AppMode.REFACTOR 
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 shadow-lg shadow-purple-500/20' 
                    : 'bg-slate-800/50 border border-slate-700 hover:border-purple-500/30'
                }`}
                title="Refactor Engine"
              >
                <ICONS.Code2 size={16} className={mode === AppMode.REFACTOR ? 'text-purple-400' : 'text-slate-400'} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode(AppMode.QUIZ)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  mode === AppMode.QUIZ 
                    ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 shadow-lg shadow-blue-500/20' 
                    : 'bg-slate-800/50 border border-slate-700 hover:border-blue-500/30'
                }`}
                title="Skill Assessment"
              >
                <ICONS.Zap size={16} className={mode === AppMode.QUIZ ? 'text-blue-400' : 'text-slate-400'} />
              </motion.button>

              {isXAIConfigured() && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMode(AppMode.GROK)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    mode === AppMode.GROK 
                      ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/50 shadow-lg shadow-orange-500/20' 
                      : 'bg-slate-800/50 border border-slate-700 hover:border-orange-500/30'
                  }`}
                  title="Grok AI"
                >
                  <ICONS.Globe size={16} className={mode === AppMode.GROK ? 'text-orange-400' : 'text-slate-400'} />
                </motion.button>
              )}
            </div>
          </div>
          
          {/* Context Controls */}
          <div className="flex items-center gap-3 animate-fade-in">
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setShowMessageSearch(true)}
               className="p-2 hover:bg-slate-800 rounded transition-colors"
               title="Search Messages (Ctrl+/)"
             >
               <ICONS.Search size={16} className="text-slate-400" />
             </motion.button>

             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setShowHelpOverlay(true)}
               className="p-2 hover:bg-slate-800 rounded transition-colors"
               title="Help & Guide (?)"
             >
               <ICONS.HelpCircle size={16} className="text-slate-400" />
             </motion.button>

             {mode === AppMode.REFACTOR && (
               <div className="flex bg-slate-900 rounded border border-slate-700 p-0.5">
                 <select 
                   value={refactorType}
                   onChange={(e) => setRefactorType(e.target.value as RefactorType)}
                   className="bg-transparent text-xs text-slate-300 font-mono px-2 py-1 outline-none cursor-pointer uppercase"
                 >
                   {Object.values(RefactorType).map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
               </div>
             )}
             {mode === AppMode.QUIZ && (
               <div className="flex bg-slate-900 rounded border border-slate-700 p-0.5">
                 <select 
                   value={quizDifficulty}
                   onChange={(e) => setQuizDifficulty(e.target.value as QuizDifficulty)}
                   className="bg-transparent text-xs text-slate-300 font-mono px-2 py-1 outline-none cursor-pointer uppercase"
                 >
                   {Object.values(QuizDifficulty).map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>
             )}
          </div>
        </header>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth relative custom-scrollbar">
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id}
              id={`msg-${msg.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'} group`}
            >
              <div className={`max-w-[90%] md:max-w-3xl flex gap-4 ${msg.sender === Sender.USER ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
                  msg.sender === Sender.USER 
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                    : 'bg-pixel-green/10 text-pixel-green border-pixel-green/30'
                } shadow-lg`}>
                  {msg.sender === Sender.USER ? <ICONS.User size={14} /> : <ICONS.Sparkles size={14} />}
                </div>

                {/* Bubble */}
                <div className={`flex flex-col gap-2 ${msg.sender === Sender.USER ? 'items-end' : 'items-start'}`}>
                  <div className={`p-5 md:p-6 rounded-lg shadow-xl border relative overflow-hidden ${
                    msg.sender === Sender.USER 
                      ? 'bg-[#0f1520] border-purple-500/20 text-white' 
                      : 'bg-[#0a0f16] border-slate-800 text-slate-200'
                  }`}>
                    {msg.sender === Sender.AI && (
                      <>
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-pixel-green/30"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-pixel-green/30"></div>
                      </>
                    )}

                    {msg.sender === Sender.USER ? (
                      <p className="whitespace-pre-wrap font-light leading-relaxed font-sans">{msg.text}</p>
                    ) : (
                      <MarkdownRenderer content={msg.text} />
                    )}
                  </div>

                  {/* Message Actions */}
                  {msg.sender === Sender.AI && !msg.isStreaming && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                       <motion.button 
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         onClick={() => handleTTS(msg.text, msg.id)}
                         className="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-pixel-green/50 text-slate-500 hover:text-pixel-green transition-colors flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider"
                       >
                         {msg.audioData ? <ICONS.Volume2 size={12} className="animate-pulse" /> : <ICONS.Play size={12} />}
                         {msg.audioData ? "Replay" : "Read"}
                       </motion.button>

                       <motion.button
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         onClick={() => toggleBookmark(msg.id)}
                         className={`px-2 py-1 rounded bg-slate-900 border transition-colors flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider ${
                           bookmarkedMessages.includes(msg.id)
                             ? 'border-yellow-500/50 text-yellow-400'
                             : 'border-slate-800 hover:border-yellow-500/50 text-slate-500 hover:text-yellow-400'
                         }`}
                       >
                         <ICONS.Bookmark size={12} fill={bookmarkedMessages.includes(msg.id) ? 'currentColor' : 'none'} />
                         {bookmarkedMessages.includes(msg.id) ? 'Saved' : 'Save'}
                       </motion.button>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-pixel-green/70 animate-pulse ml-14"
            >
               <ICONS.Loader2 size={16} className="animate-spin" />
               <span className="text-xs font-mono uppercase tracking-widest">Processing Request...</span>
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Floating Input Area */}
        <div className="p-6 bg-gradient-to-t from-[#020617] via-[#020617] to-transparent z-20">
          <div className="max-w-4xl mx-auto space-y-4">
            
            {/* Quick Prompts */}
            {messages.length === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 mb-6"
              >
                <div className="flex gap-2 mb-2 overflow-x-auto max-w-full pb-2 scrollbar-hide">
                  {(Object.keys(CATEGORIZED_PROMPTS) as PromptCategory[]).map(cat => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 text-[10px] font-mono border rounded-full whitespace-nowrap transition-all ${
                        activeCategory === cat 
                          ? 'bg-pixel-green/20 border-pixel-green text-pixel-green'
                          : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </motion.button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  {CATEGORIZED_PROMPTS[activeCategory].map((prompt, i) => (
                    <motion.button 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInputValue(prompt)}
                      className="group relative px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-700 hover:border-pixel-green/50 rounded transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-slate-500 group-hover:bg-pixel-green transition-colors"></div>
                        <span className="text-xs text-slate-400 group-hover:text-white font-mono">{prompt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-pixel-green/20 via-blue-500/20 to-purple-500/20 rounded opacity-0 group-focus-within:opacity-100 transition duration-500 blur-sm"></div>
              
              <div className="relative flex flex-col bg-[#050a10] rounded border border-slate-700 group-focus-within:border-pixel-green/50 shadow-2xl overflow-hidden transition-colors duration-300">
                
                <div className="flex items-center justify-between px-4 py-1.5 bg-[#0a0f16] border-b border-slate-800">
                   <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <span className="ml-2 text-[10px] text-slate-500 font-mono">user@devflow:~$ input</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-pixel-green/60 font-mono animate-pulse">● LIVE</span>
                   </div>
                </div>

                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    mode === AppMode.LEARN ? "Ask command... (e.g. 'Explain closures')" : 
                    mode === AppMode.REFACTOR ? "Paste source code..." :
                    mode === AppMode.QUIZ ? "Enter quiz parameters..." :
                    "Ask Grok... (with web & X search)"
                  }
                  className="w-full bg-transparent text-slate-200 placeholder-slate-600 p-4 max-h-40 min-h-[80px] resize-none focus:outline-none text-sm font-mono leading-relaxed"
                  rows={1}
                />
                
                <div className="flex justify-between items-center px-4 py-2 bg-[#0a0f16] border-t border-slate-800">
                  <div className="flex items-center gap-3 text-[10px] text-slate-600 font-mono uppercase tracking-wider">
                     <span className="flex items-center gap-1"><ICONS.Cpu size={10} /> Gemini 3.0 Pro</span>
                     <span className="hidden sm:inline-flex items-center gap-1"><ICONS.Shield size={10} /> AES-256</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <VoiceInput onTranscript={(text) => setInputValue(prev => prev + ' ' + text)} />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isLoading}
                      className="flex items-center gap-2 px-6 py-1.5 bg-pixel-green hover:bg-green-400 disabled:bg-slate-800 disabled:text-slate-600 text-[#020617] rounded-sm transition-all text-xs font-bold font-pixel shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transform active:scale-95"
                    >
                      <span>EXECUTE</span>
                      <ICONS.Terminal size={12} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-[10px] text-slate-600 font-mono">
              &gt; Keyboard shortcuts: Ctrl+K (Commands) | Ctrl+/ (Search) | Ctrl+E (Export) | ? (Help)
            </p>
          </div>
        </div>

        {/* Quiz Modal Overlay */}
        {activeQuiz && (
          <QuizModal 
            data={activeQuiz} 
            onClose={() => setActiveQuiz(null)} 
            onComplete={(score) => {
              updateStats(prev => ({
                ...prev,
                questionsAnswered: prev.questionsAnswered + (activeQuiz?.questions.length || 0),
                correctAnswers: prev.correctAnswers + score,
                xp: prev.xp + (score * 20)
              }));
              setActiveQuiz(null);
              setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: `**Quiz Module Complete.**\n\nScore: ${score}/${activeQuiz?.questions.length}\nXP Gained: +${score * 20}`,
                sender: Sender.AI,
                timestamp: Date.now()
              }]);
            }} 
          />
        )}

        {/* NEW Ultimate Features Modals */}
        <AIComparisonMode
          isOpen={showAIComparison}
          onClose={() => setShowAIComparison(false)}
          onCompare={handleAIComparison}
        />

        <AnalyticsDashboard
          isOpen={showAnalytics}
          onClose={() => setShowAnalytics(false)}
          stats={user?.stats || { xp: 0, level: 1, conceptsLearned: 0, questionsAnswered: 0, correctAnswers: 0, refactorsPerformed: 0 }}
          streak={streak}
        />

        <LearningPath
          isOpen={showLearningPath}
          onClose={() => setShowLearningPath(false)}
          userLevel={user?.stats.level || 1}
        />

        <CodeReviewMode
          isOpen={showCodeReview}
          onClose={() => setShowCodeReview(false)}
          onReview={handleCodeReview}
        />

        {/* NEW Advanced Features */}
        <AIPersonalitySelector
          isOpen={showPersonalitySelector}
          onClose={() => setShowPersonalitySelector(false)}
          onSelect={handlePersonalitySelect}
          currentPersonality={currentPersonality}
        />

        <DailyChallenges
          isOpen={showDailyChallenge}
          onClose={() => setShowDailyChallenge(false)}
          onComplete={handleChallengeComplete}
          userStreak={streak.currentStreak}
        />

        <AccessibilityPanel
          isOpen={showAccessibility}
          onClose={() => setShowAccessibility(false)}
        />

        {selectedComingSoon && (
          <ComingSoonFeature
            isOpen={!!selectedComingSoon}
            onClose={() => setSelectedComingSoon(null)}
            feature={comingSoonFeatures.find(f => f.id === selectedComingSoon)!}
          />
        )}

      </main>

      <style>{`
        .highlight-message {
          animation: highlight 2s ease-in-out;
        }
        
        @keyframes highlight {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(34, 197, 94, 0.1); }
        }
      `}</style>
    </div>
    </ErrorBoundary>
  );
}

// Sidebar Item Component
const NavItem = ({ active, onClick, icon: Icon, label, desc }: any) => (
  <motion.button 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded transition-all duration-300 border group relative overflow-hidden ${
      active 
        ? 'bg-pixel-green/10 border-pixel-green/40 text-white' 
        : 'hover:bg-slate-800 border-transparent text-slate-400 hover:text-slate-200'
    }`}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-pixel-green"></div>}
    
    <div className={`p-2 rounded transition-colors ${active ? 'text-pixel-green' : 'text-slate-500 group-hover:text-slate-300'}`}>
      <Icon size={18} />
    </div>
    <div className="text-left">
      <div className={`font-bold text-sm tracking-wide font-mono ${active ? 'text-white' : ''}`}>{label}</div>
      <div className="text-[9px] opacity-60 font-medium uppercase tracking-wider">{desc}</div>
    </div>
  </motion.button>
);
