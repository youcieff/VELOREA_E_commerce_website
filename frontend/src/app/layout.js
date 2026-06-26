'use client';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import CustomToaster from '../components/CustomToaster';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Velora | Premium E-Commerce</title>
      </head>
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <CustomToaster />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
