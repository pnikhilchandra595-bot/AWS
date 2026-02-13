
import React, { useEffect, useState } from 'react';
import { ICONS } from '../constants';

interface IntroOverlayProps {
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  // Timing constants
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),    // Slide 1: Welcome
      setTimeout(() => setStep(2), 4000),   // Slide 2: Refactor Engine (Detailed Animation)
      setTimeout(() => setStep(3), 9000),   // Slide 3: Skill Assessment (Interactive Quiz)
      setTimeout(() => setStep(4), 14000),  // Slide 4: Gamification
      setTimeout(() => setStep(5), 18000),  // Slide 5: Vision
      setTimeout(() => setStep(6), 21000),  // Slide 6: CTA
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const skipIntro = () => {
    setStep(6);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#051a10] flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      
      {/* Skip Button */}
      {step < 6 && (
        <button 
          onClick={skipIntro}
          className="absolute top-8 right-8 text-pixel-green/60 hover:text-pixel-green font-mono text-xs z-50 uppercase tracking-widest border border-transparent hover:border-pixel-green/30 px-3 py-1 rounded transition-all"
        >
          Skip Intro &gt;&gt;
        </button>
      )}

      {/* Animated Pixel Background Layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-900/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl px-6 text-center w-full">
        
        {/* =========================================================================
            SLIDE 1: WELCOME
           ========================================================================= */}
        {step === 1 && (
           <div className="animate-fade-in-up">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-pixel-green/10 rounded-2xl flex items-center justify-center border border-pixel-green/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                   <ICONS.Cpu size={40} className="text-pixel-green animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
                SYSTEM <span className="text-pixel-green">ONLINE</span>
              </h1>
              <p className="text-xl text-slate-400 font-mono">Initializing DevFlow Neural Core...</p>
           </div>
        )}

        {/* =========================================================================
            SLIDE 2: REFACTOR ENGINE (Simulated Terminal Animation)
           ========================================================================= */}
        {step === 2 && (
           <div className="animate-fade-in-up flex flex-col items-center">
              <div className="bg-[#0a0f16] w-full max-w-lg rounded-lg border border-slate-700 shadow-2xl overflow-hidden mb-8 relative">
                {/* Header */}
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                   </div>
                   <div className="text-[10px] font-mono text-slate-500">refactor_engine.ts</div>
                </div>
                
                {/* Code Area */}
                <div className="p-6 text-left font-mono text-sm relative">
                   {/* Scanning Bar */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-pixel-green/50 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
                   
                   {/* Dirty Code (Fades Out) */}
                   <div className="animate-[fadeOut_0.5s_2.5s_forwards] text-red-300 opacity-100 absolute inset-0 p-6">
                      <p>function calc(x) &#123;</p>
                      <p className="pl-4">var r = 0;</p>
                      <p className="pl-4">for(i=0;i&lt;x.length;i++)</p>
                      <p className="pl-8">r += x[i];</p>
                      <p className="pl-4">return r;</p>
                      <p>&#125;</p>
                   </div>

                   {/* Clean Code (Fades In) */}
                   <div className="animate-[fadeIn_0.5s_2.8s_forwards] text-green-400 opacity-0 relative z-10">
                      <p><span className="text-purple-400">const</span> calculateTotal = (items: <span className="text-yellow-400">number[]</span>) =&gt; &#123;</p>
                      <p className="pl-4"><span className="text-purple-400">return</span> items.reduce((acc, curr) =&gt;</p>
                      <p className="pl-8">acc + curr, 0</p>
                      <p className="pl-4">);</p>
                      <p>&#125;;</p>
                   </div>
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Refactor Engine</h2>
              <div className="flex gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1"><ICONS.CheckCircle2 size={12} className="text-pixel-green"/> Clean Code</span>
                <span className="flex items-center gap-1"><ICONS.CheckCircle2 size={12} className="text-pixel-green"/> Performance</span>
                <span className="flex items-center gap-1"><ICONS.CheckCircle2 size={12} className="text-pixel-green"/> Security</span>
              </div>
           </div>
        )}

        {/* =========================================================================
            SLIDE 3: SKILL ASSESSMENT (Simulated Interactive Quiz)
           ========================================================================= */}
        {step === 3 && (
           <div className="animate-fade-in-up flex flex-col items-center">
              <div className="relative w-full max-w-md mb-8">
                 {/* Floating XP Bubble */}
                 <div className="absolute -right-4 -top-6 animate-[float_3s_ease-in-out_infinite] delay-1000 z-20">
                    <div className="bg-yellow-500 text-black font-bold font-mono px-3 py-1 rounded-full text-xs shadow-lg animate-[bounce_1s_3.5s]">
                       +50 XP
                    </div>
                 </div>

                 {/* Quiz Card */}
                 <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-xs font-mono text-purple-400 uppercase">React Proficiency</span>
                       <span className="text-xs font-mono text-slate-500">Q: 1/10</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-4 text-left">What hook handles side effects?</h3>
                    
                    <div className="space-y-2">
                       <div className="p-3 rounded border border-slate-700 bg-slate-900/50 text-slate-400 text-sm text-left opacity-50">useState</div>
                       
                       {/* Correct Answer Animation */}
                       <div className="p-3 rounded border text-sm text-left relative overflow-hidden animate-[pulse_1s_1s] border-pixel-green bg-pixel-green/20 text-white transition-colors duration-500">
                          <div className="flex justify-between items-center">
                             <span>useEffect</span>
                             <ICONS.CheckCircle2 size={16} className="text-pixel-green animate-[scaleIn_0.3s_1.5s_backwards]" />
                          </div>
                       </div>
                       
                       <div className="p-3 rounded border border-slate-700 bg-slate-900/50 text-slate-400 text-sm text-left opacity-50">useReducer</div>
                    </div>
                 </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Skill Verification</h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                 Validate your knowledge with adaptive quizzes. Instant feedback, detailed explanations, and XP rewards.
              </p>
           </div>
        )}

        {/* =========================================================================
            SLIDE 4: GAMIFICATION (Rank System)
           ========================================================================= */}
        {step === 4 && (
           <div className="animate-fade-in-up">
              <div className="mb-8 flex justify-center">
                 <div className="relative bg-[#0a0f16] border border-slate-700 p-8 rounded-2xl flex flex-col items-center gap-4 shadow-[0_0_40px_rgba(34,197,94,0.15)] max-w-xs w-full">
                    {/* Floating Badge */}
                    <div className="absolute -top-6 bg-slate-900 p-3 rounded-full border border-yellow-500/50 shadow-lg animate-bounce">
                       <ICONS.Trophy size={32} className="text-yellow-400" />
                    </div>
                    
                    <div className="mt-4 text-center space-y-1">
                      <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">Current Rank</div>
                      <div className="text-4xl font-bold text-white font-mono flex items-center justify-center gap-2">
                        <span>LVL</span>
                        <span className="text-pixel-green">10</span>
                      </div>
                    </div>

                    <div className="w-full space-y-2">
                       <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>XP</span>
                          <span>9,500 / 10,000</span>
                       </div>
                       <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                          <div className="h-full bg-pixel-green w-[95%] shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full mt-2">
                       <div className="bg-slate-900/50 p-2 rounded border border-slate-800 flex flex-col items-center">
                          <ICONS.Zap size={14} className="text-yellow-400 mb-1" />
                          <span className="text-[10px] text-slate-400 font-mono">STREAK</span>
                       </div>
                       <div className="bg-slate-900/50 p-2 rounded border border-slate-800 flex flex-col items-center">
                          <ICONS.Award size={14} className="text-purple-400 mb-1" />
                          <span className="text-[10px] text-slate-400 font-mono">BADGES</span>
                       </div>
                    </div>
                 </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Rise Through the Ranks</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                 Compete on the global leaderboard. Earn badges for consistency, complexity, and community contribution.
              </p>
           </div>
        )}

        {/* =========================================================================
            SLIDE 5: VISION
           ========================================================================= */}
        {step === 5 && (
          <div className="animate-fade-in-up">
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4">
                SKILLS BUILD <span className="text-pixel-green inline-block animate-pulse">FUTURES</span>
             </h1>
             <h2 className="text-2xl md:text-4xl font-bold text-slate-300 mb-8 delay-100">
               WE HELP YOU <span className="border-b-4 border-pixel-green pb-1">BUILD THEM.</span>
             </h2>
          </div>
        )}

        {/* =========================================================================
            SLIDE 6: FINAL CTA
           ========================================================================= */}
        {step >= 6 && (
          <div className="animate-scale-in">
            <h1 className="text-5xl md:text-7xl font-pixel text-white mb-8 leading-tight">
               READY PLAYER <span className="text-pixel-green">ONE?</span>
            </h1>
            
            <div className="max-w-xl mx-auto mb-12 space-y-4">
               <div className="flex items-center gap-3 text-left bg-slate-900/50 p-3 rounded border border-white/5">
                  <ICONS.CheckCircle2 className="text-pixel-green shrink-0" />
                  <span className="text-slate-300">Advanced Refactoring Engine Loaded</span>
               </div>
               <div className="flex items-center gap-3 text-left bg-slate-900/50 p-3 rounded border border-white/5">
                  <ICONS.CheckCircle2 className="text-pixel-green shrink-0" />
                  <span className="text-slate-300">Adaptive Quiz Modules Ready</span>
               </div>
               <div className="flex items-center gap-3 text-left bg-slate-900/50 p-3 rounded border border-white/5">
                  <ICONS.CheckCircle2 className="text-pixel-green shrink-0" />
                  <span className="text-slate-300">Voice-Enabled Guidance Active</span>
               </div>
            </div>

            <button
              onClick={onComplete}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-pixel-green text-[#051a10] font-pixel text-base md:text-lg uppercase tracking-widest hover:bg-green-400 transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
            >
              <span className="mr-3">Start Journey</span>
              <ICONS.ChevronRight className="group-hover:translate-x-1 transition-transform" />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#051a10] opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#051a10] opacity-50"></div>
            </button>
            
            <p className="mt-6 text-xs text-slate-500 font-mono">v2.0.4 stable // connected to gemini-pro</p>
          </div>
        )}
      </div>

      {/* Slide Indicators (Updated to 6) */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2">
         {[1,2,3,4,5,6].map((s) => (
            <div 
               key={s} 
               className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? 'w-8 bg-pixel-green' : 'w-2 bg-slate-700'}`}
            />
         ))}
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 border-2 border-pixel-green/20 rounded-full animate-float delay-1000"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-pixel-green/10 rotate-45 animate-float delay-2000"></div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fadeOut {
          to { opacity: 0; display: none; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default IntroOverlay;
