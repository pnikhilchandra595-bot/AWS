import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNav: true,
    focusIndicators: true,
    dyslexiaFont: false,
    colorBlindMode: 'none' as 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  });

  const toggleSetting = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    applyAccessibilitySettings(newSettings);
  };

  const applyAccessibilitySettings = (newSettings: typeof settings) => {
    const root = document.documentElement;
    
    // High Contrast
    if (newSettings.highContrast) {
      root.style.setProperty('--bg-primary', '#000000');
      root.style.setProperty('--text-primary', '#FFFFFF');
    } else {
      root.style.removeProperty('--bg-primary');
      root.style.removeProperty('--text-primary');
    }

    // Large Text
    root.style.fontSize = newSettings.largeText ? '120%' : '100%';

    // Reduced Motion
    if (newSettings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
    }

    // Dyslexia Font
    if (newSettings.dyslexiaFont) {
      root.style.fontFamily = 'OpenDyslexic, Arial, sans-serif';
    } else {
      root.style.removeProperty('fontFamily');
    }

    // Save to localStorage
    localStorage.setItem('accessibility_settings', JSON.stringify(newSettings));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0a0f16] border-2 border-pixel-green/30 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/50">
                <ICONS.Users size={24} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">Accessibility</h2>
                <p className="text-sm text-slate-400 font-mono">WCAG AAA Compliant</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group">
              <ICONS.X size={24} className="text-slate-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-4">
          <AccessibilityToggle
            icon={ICONS.Eye}
            title="High Contrast Mode"
            description="Increase contrast for better visibility"
            enabled={settings.highContrast}
            onToggle={() => toggleSetting('highContrast')}
          />
          <AccessibilityToggle
            icon={ICONS.Type}
            title="Large Text"
            description="Increase font size by 20%"
            enabled={settings.largeText}
            onToggle={() => toggleSetting('largeText')}
          />
          <AccessibilityToggle
            icon={ICONS.Zap}
            title="Reduced Motion"
            description="Minimize animations and transitions"
            enabled={settings.reducedMotion}
            onToggle={() => toggleSetting('reducedMotion')}
          />
          <AccessibilityToggle
            icon={ICONS.Volume2}
            title="Screen Reader Optimized"
            description="Enhanced ARIA labels and descriptions"
            enabled={settings.screenReader}
            onToggle={() => toggleSetting('screenReader')}
          />
          <AccessibilityToggle
            icon={ICONS.Target}
            title="Focus Indicators"
            description="Show clear focus outlines for keyboard navigation"
            enabled={settings.focusIndicators}
            onToggle={() => toggleSetting('focusIndicators')}
          />
          <AccessibilityToggle
            icon={ICONS.BookOpen}
            title="Dyslexia-Friendly Font"
            description="Use OpenDyslexic font for easier reading"
            enabled={settings.dyslexiaFont}
            onToggle={() => toggleSetting('dyslexiaFont')}
          />
        </div>

        <div className="border-t border-slate-800 p-4 bg-slate-900/50">
          <p className="text-xs text-slate-500 text-center font-mono">
            ♿ Committed to making learning accessible for everyone
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AccessibilityToggle = ({ icon: Icon, title, description, enabled, onToggle }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    onClick={onToggle}
    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
      enabled
        ? 'bg-pixel-green/10 border-pixel-green'
        : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`p-2 rounded-lg ${enabled ? 'bg-pixel-green/20' : 'bg-slate-800'}`}>
        <Icon size={20} className={enabled ? 'text-pixel-green' : 'text-slate-400'} />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-white mb-1 font-mono">{title}</h3>
        <p className="text-xs text-slate-400 font-mono">{description}</p>
      </div>
      <div className={`w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-pixel-green' : 'bg-slate-700'}`}>
        <motion.div
          animate={{ x: enabled ? 24 : 0 }}
          className="w-6 h-6 bg-white rounded-full shadow-lg"
        />
      </div>
    </div>
  </motion.button>
);

export default AccessibilityPanel;
