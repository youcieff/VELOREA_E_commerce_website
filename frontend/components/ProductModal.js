'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Info, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal() {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const handleOpen = (e) => setProduct(e.detail);
    window.addEventListener('open-order', handleOpen);
    return () => window.removeEventListener('open-order', handleOpen);
  }, []);

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/90 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="glass-card w-full max-w-5xl h-fit max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative"
          >
            <button 
              onClick={() => setProduct(null)}
              className="absolute top-6 right-6 z-50 p-2 bg-background/50 backdrop-blur-md rounded-full hover:text-accent transition-colors"
            >
              <X size={24} />
            </button>

            {/* Product Image */}
            <div className="w-full md:w-1/2 h-[400px] md:h-auto bg-white/5 relative group">
               <img 
                 src={product.images?.[0]} 
                 alt={product.name} 
                 className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Product Details */}
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-between bg-zinc-950/40">
               <div className="space-y-8">
                  <div>
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Archive Serial: {product._id?.slice(-6).toUpperCase()}</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4 text-gradient">{product.name}</h2>
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-40">
                       <Info size={14} /> <span>{product.category?.name || 'Curated Drop'}</span>
                    </div>
                  </div>

                  <p className="text-sm md:text-base leading-relaxed opacity-60 max-w-md font-light italic">
                    "{product.description}"
                  </p>

                  <div className="flex flex-wrap gap-3">
                     {product.keywords?.map(k => (
                       <span key={k} className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:border-accent transition-all cursor-default">{k}</span>
                     ))}
                  </div>
               </div>

               <div className="mt-12 space-y-8">
                  <div className="flex justify-between items-end border-t border-white/5 pt-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-30 mb-1">Standard Valuation</p>
                      <span className="text-4xl font-bold tracking-tighter text-accent">${product.price}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-1">Stock Status: {product.countInStock > 0 ? 'AVAILABLE' : 'RESERVED'}</p>
                  </div>

                  <button 
                    onClick={() => {
                        addToCart(product);
                        setProduct(null);
                    }}
                    className="w-full bg-white text-black py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all duration-500 hover:scale-[1.01] flex items-center justify-center gap-4"
                  >
                    <ShoppingCart size={18} /> Initiate Acquisition
                  </button>
                  <p className="text-[8px] uppercase tracking-[0.5em] opacity-20 text-center">Velora Standard Certified Archive</p>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
