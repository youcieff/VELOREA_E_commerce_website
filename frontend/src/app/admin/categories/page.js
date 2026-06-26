'use client';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar';
import { Plus, Trash2, Edit2, List } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState({ name: '', description: '' });
  const { user } = useAuth();
  const { t } = useTranslation();

  const fetchCategories = async () => {
    try {
      const res = await api.get('categories');
      setCategories(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchCategories();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('categories', newCat);
      toast.success('Category Added');
      setNewCat({ name: '', description: '' });
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`categories/${id}`);
      toast.success('Category Deleted');
      fetchCategories();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (!user || user.role !== 'admin') return <p>Access Denied</p>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Sidebar Mini */}
        <aside className="w-full md:w-64 space-y-2">
           <a href="/admin" className="w-full text-left p-4 hover:bg-white/5 flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60 transition-all">
             <List size={18} /> Overview
           </a>
           <button className="w-full text-left p-4 bg-accent/10 border border-accent/20 text-accent flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <List size={18} /> Categories
          </button>
        </aside>

        <main className="flex-1 space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter uppercase">{t('categories')}</h2>

          <form onSubmit={handleAdd} className="glass-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-widest opacity-50">Category Name</label>
               <input 
                 className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none"
                 value={newCat.name}
                 onChange={e => setNewCat({...newCat, name: e.target.value})}
                 required
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-widest opacity-50">Description</label>
               <input 
                 className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none"
                 value={newCat.description}
                 onChange={e => setNewCat({...newCat, description: e.target.value})}
               />
            </div>
            <button type="submit" className="bg-foreground text-background py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center gap-2">
               <Plus size={16} /> Add Category
            </button>
          </form>

          <div className="glass-card overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-[10px] uppercase tracking-widest opacity-50">
                   <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Description</th>
                      <th className="p-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                   {categories.map(cat => (
                      <tr key={cat._id} className="hover:bg-white/5 transition-colors">
                         <td className="p-4 font-bold">{cat.name}</td>
                         <td className="p-4 opacity-70">{cat.description}</td>
                         <td className="p-4 text-right space-x-4">
                            <button className="hover:text-accent"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(cat._id)} className="hover:text-red-500"><Trash2 size={16} /></button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </main>
      </div>
    </div>
  );
}
