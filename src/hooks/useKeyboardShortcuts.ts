import { useEffect } from 'react';

interface Shortcuts {
  [key: string]: () => void;
}

export const useKeyboardShortcuts = (shortcuts: Shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        shortcuts['ctrl+k']?.();
      }
      // Ctrl/Cmd + /
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        shortcuts['ctrl+/']?.();
      }
      // Ctrl/Cmd + E
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        shortcuts['ctrl+e']?.();
      }
      // Ctrl/Cmd + Shift + T
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        shortcuts['ctrl+shift+t']?.();
      }
      // Escape
      if (e.key === 'Escape') {
        shortcuts['escape']?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
