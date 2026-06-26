'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartOverlay() {
    const { cartItems, removeFromCart, updateQty, totalPrice, totalItems, isCartOpen, setIsCartOpen } = useCart();

    if (!isCartOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex justify-end">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCartOpen(false)}
                    className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                />

                {/* Drawer */}
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-md h-full bg-background border-l border-white/5 shadow-2xl flex flex-col"
                >
                    <div className="p-8 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <ShoppingBag className="text-accent" />
                            <h2 className="text-xl font-bold tracking-tighter uppercase">Your Archive <span className="opacity-30 ml-2">({totalItems})</span></h2>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="hover:text-accent transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                                <ShoppingBag size={48} className="mb-4" />
                                <p className="text-xs uppercase tracking-[0.2em]">The Archive is empty</p>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <motion.div key={item._id} layout className="flex gap-6 group">
                                    <div className="w-24 h-32 overflow-hidden bg-white/5 border border-white/10">
                                        <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div>
                                            <h3 className="font-bold tracking-tight text-sm uppercase">{item.name}</h3>
                                            <p className="text-accent font-bold mt-1 tracking-tighter">${item.price}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 bg-white/5 px-3 py-2 border border-white/10">
                                                <button onClick={() => updateQty(item._id, item.qty - 1)} className="hover:text-accent"><Minus size={12} /></button>
                                                <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                                                <button onClick={() => updateQty(item._id, item.qty + 1)} className="hover:text-accent"><Plus size={12} /></button>
                                            </div>
                                            <button onClick={() => removeFromCart(item._id)} className="text-red-500/40 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    <div className="p-8 border-t border-white/5 bg-white/[0.02]">
                        <div className="flex justify-between items-end mb-8">
                            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Estimated Total</span>
                            <span className="text-2xl font-bold tracking-tighter">${totalPrice}</span>
                        </div>
                        <Link 
                            href="/cart" 
                            onClick={() => setIsCartOpen(false)}
                            className="block w-full bg-foreground text-background py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent transition-colors text-center"
                        >
                            <span className="flex items-center justify-center gap-3">
                                View Full Cart <ArrowRight size={14} />
                            </span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
