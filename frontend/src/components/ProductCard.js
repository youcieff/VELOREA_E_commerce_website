'use client';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card group flex flex-col overflow-hidden h-[500px]"
    >
      <div className="relative h-2/3 overflow-hidden bg-secondary/50">
        <img 
          src={product.images?.[0] || '/no-photo.jpg'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000';
          }}
        />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 border-2 border-accent/0 group-hover:border-accent/10">
           <button 
             onClick={() => addToCart(product)}
             className="bg-background p-4 rounded-full hover:bg-accent hover:text-background transition-colors"
           >
              <ShoppingCart size={20} />
           </button>
           <button 
             onClick={() => window.dispatchEvent(new CustomEvent('open-order', { detail: product }))}
             className="bg-background p-4 rounded-full hover:bg-accent hover:text-background transition-colors"
           >
              <Eye size={20} />
           </button>
        </div>
        <div className="absolute top-6 left-6 px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/20 text-[10px] font-bold uppercase tracking-widest text-accent">
           {product.category?.name || 'Category'}
        </div>
      </div>

      <div className="p-8 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
          <p className="text-xs opacity-50 uppercase tracking-widest line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-2xl font-bold tracking-tighter">${product.price}</span>
          <span className="text-[10px] opacity-30 uppercase tracking-[0.2em]">In Stock: {product.countInStock}</span>
        </div>
      </div>
    </motion.div>
  );
}
