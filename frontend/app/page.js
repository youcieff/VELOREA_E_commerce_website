'use client';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../utils/mockData';
import { ArrowRight, Sparkles, Search } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('products?limit=12'),
          api.get('categories')
        ]);
        setProducts(prodRes.data.data);
        setCategories(catRes.data.data);
        setFilteredProducts(prodRes.data.data);
      } catch (err) {
        console.warn('API Offline - Staying in Demo Mode');
      } finally {
        setLoading(false);
      }
    };

    const handleSearchEvent = (e) => {
      setSearchTerm(e.detail);
    };

    window.addEventListener('search', handleSearchEvent);
    fetchProducts();
    return () => window.removeEventListener('search', handleSearchEvent);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term) ||
      (p.keywords && p.keywords.some(k => k.toLowerCase().includes(term)))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const scrollToFeatured = () => {
    const el = document.getElementById('featured');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8 md:px-16 flex flex-col items-center justify-center min-h-screen overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -z-10" />
        
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
             <Sparkles size={16} className="text-accent animate-pulse" />
             <p className="text-xs uppercase tracking-[0.5em] text-accent font-bold">
               {t('tagline') || 'THE SMARTER WAY TO SHOP PREMIUM'}
             </p>
          </div>
          
          <h1 className="text-7xl md:text-[11rem] font-bold leading-[0.85] tracking-tighter mb-12 text-white">
            VELORA <br /> 
            <span className="text-accent">ARCHIVE.</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <button 
              onClick={scrollToFeatured}
              className="group bg-white text-black px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300"
            >
              <span className="flex items-center gap-4">
                {t('shop_now')} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>

            <div className="max-w-md text-sm md:text-base leading-relaxed opacity-40 uppercase tracking-[0.1em] font-light">
              Designing the future of e-commerce. A curated selection of high-end essentials delivered with a glassmorphic standard.
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-[1px] h-12 bg-white" />
          <span className="text-[8px] uppercase tracking-[0.5em]">Scroll</span>
        </motion.div>
      </section>
      
      {/* Categories Section */}
      <section id="categories" className="px-8 md:px-16 py-32 border-y border-white/5 bg-white/[0.01]">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-8">
               <div>
                  <h2 className="text-4xl font-bold tracking-tighter uppercase opacity-90">Curated Collections</h2>
                  <div className="h-1 w-20 bg-accent mt-4" />
               </div>
               <div className="max-w-sm text-[10px] uppercase tracking-[0.2em] opacity-40 leading-relaxed font-light">
                  Browse our meticulously selected archives organized by standard and architectural category.
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {categories.map((cat, idx) => (
                  <motion.div 
                    key={cat._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="group relative h-[450px] overflow-hidden cursor-pointer border border-white/5 bg-zinc-900"
                    onClick={() => {
                       setSearchTerm('');
                       document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                     {/* Background Image */}
                     <div className="absolute inset-0 z-0">
                        <img 
                           src={cat.image || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000'} 
                           alt={cat.name}
                           className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75"
                        />
                     </div>

                     {/* Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                     {/* Content */}
                     <div className="absolute inset-0 flex flex-col justify-end p-10 z-20">
                        <motion.div
                           initial={{ x: -10, opacity: 0 }}
                           whileInView={{ x: 0, opacity: 1 }}
                           transition={{ delay: 0.3 + (idx * 0.1) }}
                        >
                           <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Archive {idx.toString().padStart(2, '0')}</span>
                           <h3 className="text-3xl font-bold tracking-tighter uppercase mb-6 leading-none">{cat.name}</h3>
                           
                           <div className="flex items-center gap-4 group-hover:gap-6 transition-all duration-500">
                              <div className="w-12 h-[1px] bg-accent transition-all duration-500 group-hover:w-24" />
                              <span className="text-[8px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Explore Collection</span>
                           </div>
                        </motion.div>
                     </div>

                     {/* Decorative Borders */}
                     <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 group-hover:border-accent transition-colors" />
                     <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 group-hover:border-accent transition-colors" />
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="px-8 md:px-16 py-32 bg-secondary/20">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-20">
               <div>
                  <h2 className="text-4xl font-bold tracking-tighter uppercase opacity-90">Featured Drops</h2>
                  <div className="h-1 w-20 bg-accent mt-4" />
               </div>
               <p className="text-[10px] uppercase tracking-widest opacity-40">Archive Selection</p>
            </div>

            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1,2,3].map(i => <div key={i} className="glass-card h-[500px] animate-pulse bg-white/5" />)}
               </div>
            ) : filteredProducts.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-40 bg-zinc-950/20 rounded-2xl border border-white/5 opacity-50">
                  <Search size={48} className="mb-6 text-accent" />
                  <h3 className="text-xl font-bold tracking-tighter uppercase mb-2">The Archive yields no results</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em]">We couldn't find anything matching "{searchTerm}"</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                     <ProductCard key={product._id} product={product} />
                  ))}
               </div>
            )}
         </div>
      </section>

      <ProductModal />
    </main>
  );
}
