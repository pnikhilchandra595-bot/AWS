import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';
import toast from 'react-hot-toast';

interface Props {
  onTranscript: (text: string) => void;
}

export default function VoiceInput({ onTranscript }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);

      if (event.results[current].isFinal) {
        onTranscript(transcriptText);
        setIsListening(false);
      }
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      toast.error('Voice input failed. Please try again.');
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Voice input not supported in this browser');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
      toast.success('Listening... Speak now');
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        className={`p-2 rounded transition-colors ${
          isListening 
            ? 'bg-red-500/20 text-red-400 animate-pulse' 
            : 'hover:bg-slate-800 text-slate-400 hover:text-white'
        }`}
        title="Voice Input"
      >
        {isListening ? <ICONS.Volume2 size={18} /> : <ICONS.Mic size={18} />}
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-slate-900 border border-red-500/50 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs text-red-400 font-mono uppercase">Recording...</span>
            </div>
            {transcript && (
              <p className="text-sm text-slate-300">{transcript}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
