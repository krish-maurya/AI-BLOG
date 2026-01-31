import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/appContext';

import React from 'react'

export default function UserLogin() {
  const { axios, setToken , navigate } = useAppContext();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint = isLogin ? '/api/user/login' : '/api/user/signup';
      const payload = isLogin 
        ? { email, password }
        : { name, email, password };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
        navigate("/")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-950/30 rounded-full blur-3xl"></div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="text-xs font-semibold text-white uppercase tracking-widest">{isLogin ? "Welcome Back" : "Get Started"}</span>
          </div>

          <h1 className="font-serif text-5xl text-white mb-3 italic">
            inspier
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Sign in to access your dashboard' : 'Create your admin account'}
          </p>
        </div>

        {/* Auth Form Card */}
        <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Name Input - Only for Sign Up */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-slate-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="inspier"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@inspier.ai"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-slate-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-lime-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password - Only for Login */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-lime-400 text-sm font-medium hover:text-lime-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-lime-400 text-emerald-950 font-bold py-4 rounded-2xl transition-all hover:bg-lime-500 active:scale-95 shadow-lg shadow-lime-400/20"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            {/* Toggle Mode */}
            <div className="text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-slate-400 text-sm hover:text-lime-400 transition-colors"
              >
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <span className="text-lime-400 font-semibold">Sign Up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <span className="text-lime-400 font-semibold">Sign In</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-xs">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}
