import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiTrash2, FiHeart } from 'react-icons/fi';
import { useApp } from '../App';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  if (wishlist.length === 0) return (
    <div className="page-wrapper" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '5rem', marginBottom: 16 }}>💔</div>
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, color: '#212121', marginBottom: 8 }}>Your Wishlist is Empty</h2>
        <p style={{ color: '#878787', marginBottom: 24 }}>Save items you love for later by clicking the ❤️ on any product</p>
        <Link to="/products">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ background: '#2874f0', border: 'none', color: 'white', padding: '14px 32px', borderRadius: 10, fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <FiHeart size={18} /> Discover Products
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container py-3">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.5rem', color: '#212121', margin: 0 }}>
            My Wishlist <span style={{ color: '#878787', fontSize: '1rem', fontWeight: 500 }}>({wishlist.length} items)</span>
          </h1>
          <button
            onClick={() => { wishlist.forEach(p => addToCart(p)); }}
            style={{ background: '#2874f0', border: 'none', color: 'white', padding: '10px 20px', borderRadius: 8, fontFamily: 'Sora', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem' }}>
            <FiShoppingCart size={14} /> Move All to Cart
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          <AnimatePresence>
            {wishlist.map((item, i) => (
              <motion.div key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ delay: i * 0.04 }}
                style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}
              >
                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative', height: 200, background: '#fafafa', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', top: 10, left: 10, background: '#ff6161', color: 'white', padding: '2px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700 }}>
                      {item.discount}% OFF
                    </div>
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(item); }}
                      style={{ position: 'absolute', top: 10, right: 10, background: 'white', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', color: '#ff6161' }}>
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2874f0', textTransform: 'uppercase', marginBottom: 4 }}>{item.brand}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#212121', marginBottom: 8, lineHeight: 1.4,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1rem' }}>₹{item.price.toLocaleString()}</span>
                      <span style={{ fontSize: '0.78rem', color: '#bdbdbd', textDecoration: 'line-through' }}>₹{item.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
                <div style={{ padding: '0 14px 14px' }}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addToCart(item)}
                    style={{ width: '100%', background: '#2874f0', border: 'none', color: 'white', padding: '9px', borderRadius: 8, fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <FiShoppingCart size={13} /> Move to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
