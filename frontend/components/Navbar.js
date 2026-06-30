'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, User, Globe, LogOut, Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';
import CartOverlay from './CartOverlay';

export default function Navbar() {
  const { user, logout, toggleLanguage } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { t } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="glass-navbar fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center h-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter text-gradient cursor-pointer"
        >
          VELORA
        </motion.div>

        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search the Archive..." 
              className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-[10px] font-bold uppercase tracking-[0.2em] focus:border-accent/40 focus:bg-white/[0.07] outline-none transition-all duration-500"
              onChange={(e) => window.dispatchEvent(new CustomEvent('search', { detail: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase transition-all">
            <button 
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-accent transition-colors"
            >
              {t('products')}
            </button>
            <button 
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-accent transition-colors"
            >
              {t('categories')}
            </button>
            {user?.role === 'admin' && (
               <a href="/admin" className="text-accent hover:underline uppercase font-bold">{t('admin_dash')}</a>
            )}
          </div>

          <div className="flex items-center gap-5">
            <button onClick={toggleLanguage} className="hover:text-accent transition-transform hover:scale-110">
              <Globe size={20} />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-accent transition-transform hover:scale-110"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-accent text-background text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                 <span className="hidden md:block text-xs uppercase tracking-widest opacity-60">{user.name}</span>
                 <button onClick={logout} className="hover:text-red-500 transition-colors">
                    <LogOut size={20} />
                 </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="bg-foreground text-background px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
              >
                {t('login')}
              </button>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden relative z-[60]">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-8 flex flex-col gap-6 md:hidden"
          >
             <div className="flex flex-col gap-8 mt-10 text-xs font-bold tracking-[0.2em] uppercase">
                <button 
                  onClick={() => {
                    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left w-full border-b border-white/10 pb-4 flex items-center justify-between"
                >
                  {t('products')} <span className="text-accent">{">"}</span>
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left w-full border-b border-white/10 pb-4 flex items-center justify-between"
                >
                  {t('categories')} <span className="text-accent">{">"}</span>
                </button>
                {user?.role === 'admin' && (
                   <a 
                     href="/admin" 
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="text-accent text-left w-full border-b border-white/10 pb-4 flex items-center justify-between"
                   >
                     {t('admin_dash')} <span>{">"}</span>
                   </a>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartOverlay />
    </>
  );
}
