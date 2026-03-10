import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useApp } from '../App';

export default function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const stars = Math.round(product.rating);
  const savings = product.originalPrice - product.price;

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(40,116,240,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'white', borderRadius: 14, overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
        cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column',
        border: '1px solid #f0f0f0'
      }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Image */}
        <div style={{ position: 'relative', background: '#fafafa', paddingTop: compact ? '75%' : '80%', overflow: 'hidden' }}>
          {!imgLoaded && (
            <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />
          )}
          <img
            src={product.image} alt={product.title}
            onLoad={() => setImgLoaded(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', transition: 'transform 0.5s ease',
              opacity: imgLoaded ? 1 : 0,
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />

          {/* Discount Badge */}
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: '#ff6161', color: 'white',
            fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px',
            borderRadius: 6, letterSpacing: '0.3px'
          }}>
            {product.discount}% OFF
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            style={{
              position: 'absolute', top: 10, right: 10,
              background: 'white', border: 'none', borderRadius: '50%',
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {wishlisted
              ? <FaHeart size={14} color="#ff6161" />
              : <FiHeart size={14} color="#878787" />
            }
          </button>

          {/* Stock badge */}
          {product.stock <= 5 && (
            <div style={{
              position: 'absolute', bottom: 8, left: 10,
              background: '#ff9f00', color: 'white',
              fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px',
              borderRadius: 4
            }}>Only {product.stock} left!</div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: compact ? '10px' : '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Brand */}
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2874f0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {product.brand}
          </div>

          {/* Title */}
          <div style={{
            fontSize: compact ? '0.82rem' : '0.88rem', fontWeight: 600, color: '#212121',
            lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
            {product.title}
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              background: '#388e3c', color: 'white',
              fontSize: '0.72rem', fontWeight: 700, padding: '2px 7px',
              borderRadius: 4, display: 'flex', alignItems: 'center', gap: 3
            }}>
              {product.rating} <FiStar size={9} fill="white" />
            </div>
            <span style={{ fontSize: '0.72rem', color: '#878787' }}>
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
            <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: compact ? '1rem' : '1.1rem', color: '#212121' }}>
              ₹{product.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#bdbdbd', textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#26a541', fontWeight: 600 }}>
            Save ₹{savings.toLocaleString()}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div style={{ padding: '0 14px 14px' }}>
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.96 }}
          style={{
            width: '100%', background: adding ? '#26a541' : '#2874f0',
            border: 'none', color: 'white', padding: '9px 0',
            borderRadius: 8, fontFamily: 'Sora', fontWeight: 600,
            fontSize: '0.82rem', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'background 0.3s',
          }}
        >
          <FiShoppingCart size={14} />
          {adding ? 'Added!' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}
