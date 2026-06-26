import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import CustomToaster from '../components/CustomToaster';
import "./globals.css";

export const metadata = {
  title: 'Velora | Premium E-Commerce',
  description: 'The Smarter Way to Shop Premium',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
