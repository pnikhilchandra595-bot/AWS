import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#0a0f16',
          color: '#e2e8f0',
          border: '1px solid #334155',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'monospace'
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#0a0f16',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#0a0f16',
          },
        },
      }}
    />
  );
}
