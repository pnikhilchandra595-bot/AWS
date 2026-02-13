
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await authService.login(formData.email, formData.password);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
        } else {
          setError(res.error || 'Login failed');
        }
      } else {
        if (!formData.name) {
          setError("Name is required");
          setIsLoading(false);
          return;
        }
        const res = await authService.signup(formData.name, formData.email, formData.password);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
        } else {
          setError(res.error || 'Signup failed');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-pixel-pattern relative overflow-hidden font-sans text-white">
      
      {/* Background Decor reflecting the screenshots' forest/nature vibe using CSS gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-[#051a10] to-transparent"></div>
        {/* Pixel Moon/Sun */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-pixel-green/10 blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 my-auto">
        
        {/* Left Side: Motivational Text (Matching Screenshot) */}
        <div className="flex flex-col justify-center space-y-6 md:pr-10 animate-slide-in-right">
           <div className="inline-block px-3 py-1 bg-pixel-green/20 border border-pixel-green/40 text-pixel-green font-mono text-xs tracking-widest rounded mb-2 w-fit">
              SYSTEM_READY // V2.0
           </div>
           
           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
             SKILLS BUILD <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pixel-green to-emerald-400">FUTURES.</span>
           </h1>
           
           <p className="text-slate-400 text-lg md:text-xl font-light">
             DevFlow AI helps you grow what matters - real skills. Not theory. Not fluff. Just outcomes.
           </p>

           <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-4">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded bg-slate-800 border-2 border-[#051a10] flex items-center justify-center text-xs font-bold font-mono">
                      {i}
                    </div>
                 ))}
              </div>
              <div className="text-sm font-mono text-slate-400">
                <span className="text-pixel-green font-bold">10,000+</span> Learners
              </div>
           </div>
        </div>

        {/* Right Side: Auth Box (Matching "Join Now" Screenshot) */}
        <div className="bg-[#0a2015] border-2 border-pixel-green/30 rounded-lg p-8 shadow-[0_0_40px_rgba(34,197,94,0.1)] relative group">
          
          {/* Decorative Corner Pixels */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-pixel-green"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-pixel-green"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pixel-green"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-pixel-green"></div>

          <h2 className="text-3xl font-pixel text-center mb-8 text-white uppercase tracking-wider">
            {isLogin ? "Login" : "Join Now"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="font-mono text-xs text-pixel-green uppercase">Player Name</label>
                <input
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#051a10] border-2 border-slate-700 focus:border-pixel-green text-white p-3 rounded-none outline-none font-mono transition-colors"
                  placeholder="ENTER NAME"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-mono text-xs text-pixel-green uppercase">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#051a10] border-2 border-slate-700 focus:border-pixel-green text-white p-3 rounded-none outline-none font-mono transition-colors"
                placeholder="EMAIL@DOMAIN.COM"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs text-pixel-green uppercase">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#051a10] border-2 border-slate-700 focus:border-pixel-green text-white p-3 rounded-none outline-none font-mono transition-colors"
                placeholder="********"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 text-xs font-mono text-center">
                ERROR: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-4 bg-pixel-green hover:bg-green-400 text-[#051a10] font-pixel text-xs md:text-sm uppercase tracking-widest shadow-lg hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "PROCESSING..." : (isLogin ? "ENTER SYSTEM" : "START GAME")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-xs font-mono text-slate-400 hover:text-pixel-green transition-colors underline decoration-dotted underline-offset-4"
            >
              {isLogin ? "CREATE NEW CHARACTER" : "LOAD EXISTING SAVE"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Information / Features Slider Section */}
      <div className="relative z-10 w-full max-w-6xl mt-12 border-t border-slate-800/50 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
           <FeatureItem icon={ICONS.Globe} title="Remote First" desc="Learn anywhere" />
           <FeatureItem icon={ICONS.Users} title="Community" desc="Join the discord" />
           <FeatureItem icon={ICONS.Award} title="Certified" desc="Industry standard" />
           <FeatureItem icon={ICONS.Briefcase} title="Jobs" desc="Career support" />
        </div>
        <div className="mt-8 flex justify-center gap-6 opacity-50">
           <div className="font-pixel text-xs text-slate-500">TRUSTED BY</div>
           <ICONS.Chrome className="text-slate-500" />
           <ICONS.Github className="text-slate-500" />
           <ICONS.Figma className="text-slate-500" />
           <ICONS.Slack className="text-slate-500" />
        </div>
      </div>

    </div>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }: any) => (
  <div className="flex flex-col items-center gap-2 p-3 hover:bg-slate-800/30 rounded-lg transition-colors cursor-pointer group">
    <div className="p-3 bg-slate-900 rounded-full border border-slate-700 group-hover:border-pixel-green group-hover:text-pixel-green transition-all">
       {Icon ? <Icon size={20} /> : <div className="w-5 h-5 bg-slate-700 rounded-full" />}
    </div>
    <div>
      <h4 className="font-bold text-white text-sm">{title}</h4>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  </div>
);

export default AuthPage;
