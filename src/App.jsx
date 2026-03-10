import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Toast from './components/Toast';

export const AppContext = createContext(null);

export function useApp() { return useContext(AppContext); }

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        showToast(`${product.title.slice(0,25)}... qty updated!`);
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      showToast(`Added to cart! 🛒`);
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    showToast('Removed from cart', 'info');
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(i => i.id !== product.id);
      }
      showToast('Added to wishlist! ❤️');
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some(i => i.id === id);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQty, toggleWishlist, isWishlisted, cartCount, showToast }}>
      <BrowserRouter>
        <Navbar cartCount={cartCount} wishlistCount={wishlist.length} />
        {toast && <Toast message={toast.msg} type={toast.type} />}
        <div style={{ minHeight: '100vh', paddingTop: '0' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
