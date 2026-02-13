<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# DevFlow AI - Next-Gen Developer Learning Platform

An intelligent, AI-powered learning platform that combines Google's Gemini AI with gamification mechanics to create an engaging, personalized coding education experience.

## ✨ Key Features

### 🎨 **Theme System**
- Dark, Light, and Cyberpunk themes
- Persistent theme preferences
- Smooth transitions with `Ctrl+Shift+T`

### ⌨️ **Command Palette**
- Quick access to all features with `Ctrl+K`
- Fuzzy search for commands
- Keyboard-first navigation

### 🔍 **Message Search**
- Full-text search through conversations
- Jump to messages with `Ctrl+/`
- Highlight matching results

### 💻 **Code Playground**
- Live JavaScript execution
- Syntax highlighting
- Console output display

### 🔖 **Smart Bookmarks**
- Save important AI responses
- Persistent storage per user
- Quick access to saved content

### 🔥 **Learning Streaks**
- Track consecutive learning days
- Visual streak counter
- Motivation to maintain consistency

### 🏆 **Achievement System**
- Unlock badges for milestones
- Confetti celebrations
- XP rewards for achievements

### 📢 **Toast Notifications**
- Instant feedback for actions
- Success/error states
- Non-intrusive design

### 🎯 **Core AI Features**
- **Learn Mode**: Interactive Q&A with streaming responses
- **Refactor Engine**: AI-powered code optimization
- **Quiz System**: Adaptive skill assessment
- **Text-to-Speech**: Audio explanations

## 🚀 Quick Start

**Prerequisites:** Node.js 16+

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up API keys:**
   - Copy `.env.example` to `.env.local`
   - Add your API keys:
     ```
     VITE_API_KEY=your_gemini_api_key
     VITE_XAI_API_KEY=your_xai_api_key (optional)
     VITE_OPENAI_API_KEY=your_openai_api_key (optional)
     ```
   - Get Gemini key from: https://aistudio.google.com/apikey
   - Get xAI key from: https://console.x.ai/

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

### 🌐 Deploy to Vercel (Recommended for Hackathons)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pnikhilchandra595-bot/AWS)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Add environment variables in Vercel dashboard:
   - `VITE_API_KEY` = Your Gemini API key
   - `VITE_XAI_API_KEY` = Your xAI API key (optional)
4. Deploy!

**Or manually:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add VITE_API_KEY
vercel env add VITE_XAI_API_KEY

# Deploy to production
vercel --prod
```

### 📦 For Hackathon Judges

**Option 1: Use Live Demo** (Recommended)
- Visit the deployed URL (will be provided in submission)
- No setup required!

**Option 2: Run Locally**
1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Request API keys from submission contact
4. Run `npm install && npm run dev`

**Option 3: Use Provided Keys**
- API keys will be shared securely via hackathon submission form
- Keys are rate-limited for demo purposes only

## ⌨️ Keyboard Shortcuts

- `Ctrl+K` - Open command palette
- `Ctrl+/` - Search messages
- `Ctrl+E` - Export chat history
- `Ctrl+Shift+T` - Toggle theme
- `Escape` - Close modals
- `Enter` - Send message
- `Shift+Enter` - New line

## 📚 Documentation

- [FEATURES.md](FEATURES.md) - Detailed feature documentation
- [requirements.md](requirements.md) - Project requirements
- [design.md](design.md) - System design and architecture

## 🎯 Use Cases

- **Learning**: Ask technical questions in natural language
- **Code Review**: Get AI-powered refactoring suggestions
- **Skill Testing**: Take adaptive quizzes on any topic
- **Interview Prep**: Practice with realistic questions
- **Knowledge Retention**: Track progress with XP and levels

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript 5.8
- **Build Tool**: Vite 6.2
- **AI**: Google Gemini API
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

## 📈 Performance

- Initial load: <2s on 3G
- Time to interactive: <3s
- Lighthouse score: 90+
- 60 FPS animations
- Responsive on all devices

## 🤝 Contributing

Contributions welcome! Please read [FEATURES.md](FEATURES.md) for development guidelines.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Framer Motion for animations
- Lucide for beautiful icons
- The open-source community

---

**DevFlow AI v2.0** - Empowering developers with AI-assisted learning 🚀
