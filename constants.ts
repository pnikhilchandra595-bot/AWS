
import { 
  BookOpen, 
  Code2, 
  BrainCircuit, 
  Send, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  BarChart2, 
  Menu, 
  X, 
  Copy, 
  Terminal, 
  ChevronRight, 
  Zap, 
  Shield, 
  Layout, 
  Play, 
  Volume2, 
  Loader2, 
  Trophy, 
  Cpu, 
  LogOut, 
  User, 
  Mail, 
  Lock, 
  ArrowRight,
  Database,
  Globe,
  Layers,
  Server,
  Users,
  Award,
  Briefcase,
  Chrome,
  Github,
  Figma,
  Slack
} from 'lucide-react';

export const ICONS = {
  BookOpen,
  Code2,
  BrainCircuit,
  Send,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  XCircle,
  BarChart2,
  Menu,
  X,
  Copy,
  Terminal,
  ChevronRight,
  Zap,
  Shield,
  Layout,
  Play,
  Volume2,
  Loader2,
  Trophy,
  Cpu,
  LogOut,
  User,
  Mail,
  Lock,
  ArrowRight,
  Database,
  Globe,
  Layers,
  Server,
  Users,
  Award,
  Briefcase,
  Chrome,
  Github,
  Figma,
  Slack
};

export const SAMPLE_PROMPTS = [
  "Explain React useEffect hook",
  "How does Rust ownership work?",
  "Explain Big O Notation",
  "Design a scalable API architecture"
];

export const CATEGORIZED_PROMPTS = {
  FRONTEND: [
    "Explain React useEffect hook",
    "CSS Grid vs Flexbox",
    "Optimize React Performance",
    "Explain Hydration in Next.js"
  ],
  BACKEND: [
    "Design a scalable API architecture",
    "How to prevent SQL Injection?",
    "Redis Caching Strategies",
    "Explain Microservices Patterns"
  ],
  CS_FUNDAMENTALS: [
    "Explain Big O Notation",
    "How does Garbage Collection work?",
    "Explain TCP vs UDP",
    "Binary Search Tree implementation"
  ],
  DEVOPS: [
    "Explain Docker vs Kubernetes",
    "CI/CD Pipeline Best Practices",
    "AWS Lambda Cold Starts",
    "Terraform State Management"
  ]
};

export const SYSTEM_INSTRUCTION_LEARN = `
You are DevFlow, an elite senior software architect and mentor. 
Your goal is to accelerate developer learning.
- Be concise but profound. Use analogies (e.g., "Think of Redux as a bank vault...").
- Always provide modern, type-safe code examples.
- Use Markdown.
- If the user is a beginner, be encouraging. If advanced, be technical and precise.
`;

export const getRefactorInstruction = (type: string) => `
You are DevFlow's Code Engine. 
Refactor the User's code specifically focusing on: **${type}**.
1. Provide the refactored code block first.
2. List the specific improvements made in bullet points.
3. Be strict about the chosen focus area.
`;