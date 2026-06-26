'use client';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar';
import { LayoutDashboard, ShoppingBag, List, Users, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
         <p className="text-sm uppercase tracking-widest opacity-50">Access Denied</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-28 px-6 md:px-12 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <button className="w-full text-left p-4 bg-accent/10 border border-accent/20 text-accent flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <LayoutDashboard size={18} /> {t('admin_dash')}
          </button>
          <a href="/admin/products" className="w-full text-left p-4 hover:bg-white/5 flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-all">
            <ShoppingBag size={18} /> {t('products')}
          </a>
          <a href="/admin/categories" className="w-full text-left p-4 hover:bg-white/5 flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-all">
            <List size={18} /> {t('categories')}
          </a>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter text-gradient">VELORA ARCHIVE</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 mt-1">Management Portal</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 space-y-4">
              <BarChart3 className="text-accent" size={24} />
              <div className="text-4xl font-bold tracking-tighter">124</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50">Total Orders</div>
            </div>
            <div className="glass-card p-8 space-y-4">
              <ShoppingBag className="text-accent" size={24} />
              <div className="text-4xl font-bold tracking-tighter">48</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50">Products Active</div>
            </div>
            <div className="glass-card p-8 space-y-4">
              <Users className="text-accent" size={24} />
              <div className="text-4xl font-bold tracking-tighter">1,204</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50">Registered Users</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
