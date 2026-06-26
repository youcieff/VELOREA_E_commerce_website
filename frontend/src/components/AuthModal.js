'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const { login, register } = useAuth();
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
        return toast.error('All fields are required');
      }
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success(t('welcome'));
      } else {
        await register(formData);
        toast.success(t('register_success'));
      }
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Authentication Failed');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-md p-8 relative overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-6 right-6 hover:text-accent transition-colors">
            <X size={20} />
          </button>

          <h2 className="text-3xl font-bold tracking-tighter mb-2 text-gradient">
            {isLogin ? t('login') : t('register')}
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] opacity-50 mb-8">
            Experience the Velora Standard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 py-4 px-12 text-sm focus:border-accent outline-none transition-colors"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 py-4 px-12 text-sm focus:border-accent outline-none transition-colors"
                onChange={e => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 py-4 px-12 text-sm focus:border-accent outline-none transition-colors"
                onChange={e => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input 
                  type="text" 
                  placeholder="Phone Number"
                  className="w-full bg-white/5 border border-white/10 py-4 px-12 text-sm focus:border-accent outline-none transition-colors"
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            )}

            <button type="submit" className="w-full bg-foreground text-background py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent transition-colors">
               {isLogin ? t('login') : t('register')}
            </button>
          </form>

          <div className="mt-8 text-center sm:mt-10">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-accent hover:underline font-bold"
              >
                {isLogin ? 'Create Archive Access' : 'Login to Archive'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
