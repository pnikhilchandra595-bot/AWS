import React, { useState } from 'react';
import { QuizData } from '../types';
import { ICONS } from '../constants';

interface QuizModalProps {
  data: QuizData;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ data, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = data.questions[currentIndex];
  const isLast = currentIndex === data.questions.length - 1;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    setShowResult(true);
    if (selectedOption === question.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(score + (selectedOption === question.correctAnswerIndex ? 1 : 0));
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <ICONS.BrainCircuit className="text-purple-400" size={20} />
              Quiz: {data.topic}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Question {currentIndex + 1} of {data.questions.length}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <ICONS.X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <h4 className="text-lg text-slate-100 mb-6 font-medium">{question.question}</h4>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between group ";
              
              if (showResult) {
                if (idx === question.correctAnswerIndex) {
                  btnClass += "bg-green-500/10 border-green-500/50 text-green-300";
                } else if (idx === selectedOption) {
                  btnClass += "bg-red-500/10 border-red-500/50 text-red-300";
                } else {
                  btnClass += "bg-slate-800 border-slate-700 opacity-50";
                }
              } else {
                if (idx === selectedOption) {
                  btnClass += "bg-sky-500/20 border-sky-500 text-white";
                } else {
                  btnClass += "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-750";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={btnClass}
                >
                  <span>{option}</span>
                  {showResult && idx === question.correctAnswerIndex && <ICONS.CheckCircle2 className="text-green-400" size={18} />}
                  {showResult && idx === selectedOption && idx !== question.correctAnswerIndex && <ICONS.XCircle className="text-red-400" size={18} />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in slide-in-from-top-2">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">Explanation: </span>
                {question.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          {!showResult ? (
            <button
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="px-6 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isLast ? "Finish Quiz" : "Next Question"} <ICONS.ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
