'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('velora_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('velora_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const exists = cartItems.find(item => item._id === product._id);
        if (exists) {
            setCartItems(prev => prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item));
            toast.success('Quantity Updated');
        } else {
            setCartItems(prev => [...prev, { ...product, qty: 1 }]);
            toast.success('Added to Archive');
        }
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
        toast.error('Removed from Archive');
    };

    const updateQty = (id, qty) => {
        if (qty < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems(prev => prev.map(item => item._id === id ? { ...item, qty } : item));
    };

    const clearCart = () => setCartItems([]);

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0);
    const totalItems = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQty, 
            clearCart, 
            totalPrice, 
            totalItems,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
