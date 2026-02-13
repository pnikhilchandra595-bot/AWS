import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';

interface Props {
  isOpen: boolean;
  onComplete: () => void;
  userName: string;
}

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  features: string[];
  tip?: string;
  image?: string;
}

export default function OnboardingTutorial({ isOpen, onComplete, userName }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: `Welcome, ${userName}! 👋`,
      description: "Let's take a quick tour of DevFlow AI and unlock your learning potential.",
      icon: 'Sparkles',
      features: [
        '🎯 AI-powered learning tailored to your level',
        '🚀 Code refactoring with instant feedback',
        '🎮 Gamified experience with XP and achievements',
        '⚡ Multiple ways to interact: text, voice, and more'
      ],
      tip: 'This tutorial takes just 2 minutes!'
    },
    {
      id: 2,
      title: 'Learn Mode 📚',
      description: 'Ask any technical question and get AI-powered explanations.',
      icon: 'BookOpen',
      features: [
        '💬 Natural language questions',
        '📖 Streaming responses with markdown',
        '🔊 Text-to-speech for audio learning',
        '🔖 Bookmark important responses',
        '🔍 Search through conversation history'
      ],
      tip: 'Try: "Explain React hooks" or "How does async/await work?"'
    },
    {
      id: 3,
      title: 'Refactor Engine 🔧',
      description: 'Paste your code and get AI-powered optimization suggestions.',
      icon: 'Code2',
      features: [
        '✨ Clean Code & Readability improvements',
        '⚡ Performance optimization',
        '🛡️ Security hardening',
        '🆕 Modern syntax upgrades (ES6+)',
        '📝 Detailed explanations for each change'
      ],
      tip: 'Paste any code snippet and select your optimization focus!'
    },
    {
      id: 4,
      title: 'Quiz Mode ⚡',
      description: 'Test your knowledge with adaptive quizzes on any topic.',
      icon: 'Zap',
      features: [
        '🎯 AI-generated questions on demand',
        '📊 Three difficulty levels',
        '✅ Instant feedback with explanations',
        '🏆 Earn XP for correct answers',
        '📈 Track your accuracy over time'
      ],
      tip: 'Request: "Quiz me on JavaScript closures" or any topic!'
    },
    {
      id: 5,
      title: 'Power User Features ⚡',
      description: 'Keyboard shortcuts and advanced tools for maximum productivity.',
      icon: 'Terminal',
      features: [
        '⌨️ Ctrl+K - Command palette',
        '🔍 Ctrl+/ - Search messages',
        '💾 Ctrl+E - Export chat',
        '🎨 Ctrl+Shift+T - Toggle theme',
        '🎤 Voice input for hands-free learning',
        '💻 Code playground for live execution'
      ],
      tip: 'Press ? anytime to see all shortcuts!'
    },
    {
      id: 6,
      title: 'Gamification System 🎮',
      description: 'Level up, earn achievements, and track your progress.',
      icon: 'Trophy',
      features: [
        '⭐ Earn XP for every interaction',
        '📈 Level up as you learn',
        '🏆 Unlock achievements',
        '🔥 Maintain daily learning streaks',
        '📊 Visualize your progress',
        '🎊 Celebrate milestones with confetti!'
      ],
      tip: 'Your current streak: Check the sidebar!'
    },
    {
      id: 7,
      title: 'Themes & Customization 🎨',
      description: 'Personalize your learning environment.',
      icon: 'Layout',
      features: [
        '🌙 Dark theme (default)',
        '☀️ Light theme',
        '💜 Cyberpunk theme',
        '🎨 Smooth theme transitions',
        '💾 Preferences saved automatically'
      ],
      tip: 'Click the theme button in sidebar or press Ctrl+Shift+T'
    },
    {
      id: 8,
      title: 'Tips for Success 💡',
      description: 'Get the most out of DevFlow AI.',
      icon: 'Target',
      features: [
        '📅 Use daily to maintain your streak',
        '🔖 Bookmark important explanations',
        '🎯 Start with easier topics, progress gradually',
        '🔊 Use audio for multitasking',
        '💾 Export chats to review later',
        '❓ Press ? for help anytime'
      ],
      tip: 'Consistency is key - even 10 minutes daily makes a difference!'
    },
    {
      id: 9,
      title: "You're All Set! 🚀",
      description: 'Ready to start your learning journey?',
      icon: 'CheckCircle2',
      features: [
        '✅ All features unlocked',
        '✅ Tutorial complete',
        '✅ Help available anytime (?)',
        '✅ Your progress is being tracked',
        '🎯 First achievement: "First Steps" awaits!'
      ],
      tip: 'Start by asking a question or exploring the quick prompts below!'
    }
  ];

  const currentSlideData = slides[currentSlide];
  const Icon = ICONS[currentSlideData.icon];
  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      // Mark tutorial as completed
      localStorage.setItem('devflow_tutorial_completed', 'true');
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('devflow_tutorial_completed', 'true');
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0f16] border border-slate-700 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pixel-green/10 rounded-lg">
              <Icon size={24} className="text-pixel-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{currentSlideData.title}</h2>
              <p className="text-sm text-slate-400">Slide {currentSlide + 1} of {slides.length}</p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="text-slate-500 hover:text-slate-300 text-sm font-mono uppercase tracking-wider transition-colors"
          >
            Skip Tour
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed">
                {currentSlideData.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {currentSlideData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-pixel-green/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-pixel-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ICONS.CheckCircle2 size={14} className="text-pixel-green" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>

              {/* Tip */}
              {currentSlideData.tip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <ICONS.Zap size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Pro Tip</p>
                      <p className="text-sm text-slate-300">{currentSlideData.tip}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between">
            {/* Progress Dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-pixel-green'
                      : index < currentSlide
                      ? 'w-2 bg-pixel-green/50'
                      : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {currentSlide > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors flex items-center gap-2"
                >
                  <ICONS.ChevronRight size={16} className="rotate-180" />
                  Previous
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-6 py-2 bg-pixel-green hover:bg-green-400 text-black font-bold rounded transition-colors flex items-center gap-2"
              >
                {isLastSlide ? (
                  <>
                    Start Learning
                    <ICONS.Sparkles size={16} />
                  </>
                ) : (
                  <>
                    Next
                    <ICONS.ChevronRight size={16} />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
