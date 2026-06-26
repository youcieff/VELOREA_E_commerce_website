'use client';
import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/Navbar';
import { Plus, Trash2, Edit2, ShoppingBag, List } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProd, setNewProd] = useState({ name: '', description: '', price: '', category: '', countInStock: '' });
  const { user } = useAuth();
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const prodRes = await api.get('products');
      const catRes = await api.get('categories');
      setProducts(prodRes.data.data);
      setCategories(catRes.data.data);
    } catch (err) {
      toast.error('Data Fetch Failed');
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchData();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('products', newProd);
      toast.success('Product Created');
      setNewProd({ name: '', description: '', price: '', category: '', countInStock: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`products/${id}`);
      toast.success('Product Removed');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (!user || user.role !== 'admin') return <p>Access Denied</p>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-64 space-y-2">
           <a href="/admin" className="w-full text-left p-4 hover:bg-white/5 flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60 transition-all">
             <List size={18} /> Overview
           </a>
           <button className="w-full text-left p-4 bg-accent/10 border border-accent/20 text-accent flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <ShoppingBag size={18} /> Inventory
          </button>
           <a href="/admin/categories" className="w-full text-left p-4 hover:bg-white/5 flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60 transition-all">
            <List size={18} /> Categories
          </a>
        </aside>

        <main className="flex-1 space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter uppercase">PRODUCT ARCHIVE</h2>

          <form onSubmit={handleAdd} className="glass-card p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-widest opacity-50">Product Name</label>
               <input 
                 className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none"
                 value={newProd.name}
                 onChange={e => setNewProd({...newProd, name: e.target.value})}
                 required
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-widest opacity-50">Category</label>
               <select 
                 className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none appearance-none"
                 value={newProd.category}
                 onChange={e => setNewProd({...newProd, category: e.target.value})}
                 required
               >
                 <option value="" className="bg-secondary">Select Category</option>
                 {categories.map(cat => (
                   <option key={cat._id} value={cat._id} className="bg-secondary">{cat.name}</option>
                 ))}
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-widest opacity-50">Price ($)</label>
               <input 
                 type="number"
                 className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none"
                 value={newProd.price}
                 onChange={e => setNewProd({...newProd, price: e.target.value})}
                 required
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] uppercase tracking-widest opacity-50">Stock Count</label>
               <input 
                 type="number"
                 className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none"
                 value={newProd.countInStock}
                 onChange={e => setNewProd({...newProd, countInStock: e.target.value})}
                 required
               />
            </div>
            <div className="md:col-span-2 space-y-2">
               <label className="text-[10px] uppercase tracking-widest opacity-50">Description</label>
               <textarea 
                 className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-accent outline-none h-24 resize-none"
                 value={newProd.description}
                 onChange={e => setNewProd({...newProd, description: e.target.value})}
                 required
               />
            </div>
            <button type="submit" className="md:col-span-2 bg-foreground text-background py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent transition-colors flex items-center justify-center gap-3">
               <Plus size={18} /> Create Listing
            </button>
          </form>

          <div className="glass-card overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-[10px] uppercase tracking-widest opacity-50 border-b border-white/10">
                   <tr>
                      <th className="p-6">Product</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Price</th>
                      <th className="p-6 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                   {products.map(prod => (
                      <tr key={prod._id} className="hover:bg-white/5 transition-colors">
                         <td className="p-6">
                            <div className="font-bold">{prod.name}</div>
                            <div className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Stock: {prod.countInStock}</div>
                         </td>
                         <td className="p-6 opacity-70 uppercase text-xs tracking-widest">{prod.category?.name}</td>
                         <td className="p-6 font-mono text-accent">${prod.price}</td>
                         <td className="p-6 text-right space-x-4">
                            <button className="hover:text-accent"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(prod._id)} className="hover:text-red-500"><Trash2 size={16} /></button>
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
