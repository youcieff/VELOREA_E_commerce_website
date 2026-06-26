'use client';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQty, totalPrice, totalItems } = useCart();

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background pb-20">
            <Navbar />
            
            <div className="pt-32 px-8 md:px-16 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-20 animate-fade-in">
                    <Link href="/" className="hover:text-accent transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-5xl font-bold tracking-tighter uppercase italic">The Collection <span className="text-white/20 ml-4 font-light">({totalItems})</span></h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 border border-white/5 bg-white/[0.02] rounded-2xl opacity-40">
                         <ShoppingBag size={64} className="mb-8" />
                         <p className="text-xs uppercase tracking-[0.4em] mb-8 text-center">Your Selection is empty</p>
                         <Link href="/" className="bg-white text-black px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors">
                            Return to Archive
                         </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-12">
                            {cartItems.map((item, idx) => (
                                <motion.div 
                                    key={item._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col md:flex-row gap-10 group pb-12 border-b border-white/5 last:border-0"
                                >
                                    <div className="w-full md:w-48 h-64 overflow-hidden border border-white/10 bg-white/5">
                                        <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-2xl font-bold tracking-tighter uppercase mb-2">{item.name}</h3>
                                                <p className="text-[10px] uppercase tracking-widest opacity-40 max-w-sm line-clamp-2">{item.description}</p>
                                            </div>
                                            <p className="text-2xl font-bold tracking-tighter text-accent">${item.price}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-8">
                                            <div className="flex items-center gap-6 bg-white/5 px-6 py-4 border border-white/10">
                                                <button onClick={() => updateQty(item._id, item.qty - 1)} className="hover:text-accent transition-colors"><Minus size={14} /></button>
                                                <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                                <button onClick={() => updateQty(item._id, item.qty + 1)} className="hover:text-accent transition-colors"><Plus size={14} /></button>
                                            </div>
                                            <button onClick={() => removeFromCart(item._id)} className="text-red-500/40 hover:text-red-500 transition-colors flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
                                                <Trash2 size={16} /> <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-32 glass-card p-10 bg-white/[0.03] border border-white/5">
                                <h2 className="text-xl font-bold uppercase tracking-widest mb-10 pb-6 border-b border-white/10">Order Summary</h2>
                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between text-xs uppercase tracking-widest opacity-40">
                                        <span>Subtotal</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-xs uppercase tracking-widest opacity-40">
                                        <span>Logistics</span>
                                        <span className="text-accent italic">Complimentary</span>
                                    </div>
                                    <div className="h-[1px] bg-white/10 my-8" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs uppercase tracking-widest font-bold">Total</span>
                                        <span className="text-3xl font-bold tracking-tighter text-accent">${totalPrice}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-white text-black py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all duration-500 hover:scale-[1.02]">
                                    Secure Checkout
                                </button>
                                <p className="text-[8px] uppercase tracking-widest opacity-30 mt-6 text-center">Encrypted Transaction Service</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
