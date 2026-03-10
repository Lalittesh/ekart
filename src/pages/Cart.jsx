import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight, FiShield, FiTruck } from 'react-icons/fi';
import { useApp } from '../App';

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useApp();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const originalTotal = cart.reduce((s, i) => s + i.originalPrice * i.qty, 0);
  const discount = originalTotal - subtotal;
  const delivery = subtotal > 499 ? 0 : 40;
  const total = subtotal + delivery;

  if (cart.length === 0) return (
    <div className="page-wrapper" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '5rem', marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, color: '#212121', marginBottom: 8 }}>Your Cart is Empty</h2>
        <p style={{ color: '#878787', marginBottom: 24 }}>Looks like you haven't added anything yet. Start shopping!</p>
        <Link to="/products">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ background: '#2874f0', border: 'none', color: 'white', padding: '14px 32px', borderRadius: 10, fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <FiShoppingBag size={18} /> Start Shopping
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container py-3">
        <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.5rem', marginBottom: 20, color: '#212121' }}>
          Shopping Cart <span style={{ color: '#878787', fontSize: '1rem', fontWeight: 500 }}>({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
        </h1>

        <div className="row g-3">
          {/* Cart Items */}
          <div className="col-lg-8">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'white', borderRadius: 14, padding: 20, marginBottom: 12,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0'
                  }}
                >
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {/* Image */}
                    <Link to={`/product/${item.id}`}>
                      <div style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden', background: '#fafafa', flexShrink: 0 }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </Link>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2874f0', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                        {item.brand}
                      </div>
                      <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ fontWeight: 600, color: '#212121', fontSize: '0.95rem', marginBottom: 6, lineHeight: 1.4,
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.title}
                        </div>
                      </Link>

                      {/* Price row */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.1rem' }}>₹{item.price.toLocaleString()}</span>
                        <span style={{ fontSize: '0.82rem', color: '#bdbdbd', textDecoration: 'line-through' }}>₹{item.originalPrice.toLocaleString()}</span>
                        <span style={{ fontSize: '0.8rem', color: '#26a541', fontWeight: 600 }}>{item.discount}% off</span>
                      </div>

                      {/* Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        {/* Qty */}
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: '#f5f5f5', border: 'none', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e8f0fe'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}
                          >
                            <FiMinus size={13} />
                          </button>
                          <span style={{ width: 40, textAlign: 'center', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: '#f5f5f5', border: 'none', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e8f0fe'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}
                          >
                            <FiPlus size={13} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button onClick={() => removeFromCart(item.id)}
                          style={{ background: 'none', border: 'none', color: '#ff6161', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', fontWeight: 600, padding: '6px 10px', borderRadius: 6, transition: 'background 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#fff0f0'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <FiTrash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Item total (right) */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.1rem', color: '#212121' }}>
                        ₹{(item.price * item.qty).toLocaleString()}
                      </div>
                      {item.qty > 1 && (
                        <div style={{ fontSize: '0.72rem', color: '#878787' }}>₹{item.price.toLocaleString()} each</div>
                      )}
                      <div style={{ fontSize: '0.75rem', color: '#26a541', fontWeight: 600, marginTop: 4 }}>
                        Save ₹{((item.originalPrice - item.price) * item.qty).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="col-lg-4">
            <motion.div layout style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', position: 'sticky', top: 80 }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1rem', marginBottom: 20, color: '#878787', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Price Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 16, borderBottom: '1px dashed #e0e0e0', marginBottom: 16 }}>
                {[
                  { label: `Price (${cart.reduce((s, i) => s + i.qty, 0)} items)`, value: `₹${originalTotal.toLocaleString()}`, color: '#212121' },
                  { label: 'Discount', value: `-₹${discount.toLocaleString()}`, color: '#26a541' },
                  { label: 'Delivery Charges', value: delivery === 0 ? 'FREE' : `₹${delivery}`, color: delivery === 0 ? '#26a541' : '#212121' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#555' }}>{label}</span>
                    <span style={{ fontWeight: 600, color }}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1rem' }}>Total Amount</span>
                <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.2rem' }}>₹{total.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div style={{ background: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: 8, padding: '8px 14px', marginBottom: 16, color: '#26a541', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
                  🎉 You'll save ₹{discount.toLocaleString()} on this order!
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(255,159,0,0.35)' }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%', background: '#ff9f00', border: 'none', color: 'white', padding: '14px', borderRadius: 10, fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                Proceed to Checkout <FiArrowRight size={16} />
              </motion.button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14 }}>
                <FiShield size={14} color="#878787" />
                <span style={{ fontSize: '0.75rem', color: '#878787' }}>Safe and Secure Payments</span>
              </div>

              <div style={{ marginTop: 12, padding: '10px', background: '#f8f9ff', borderRadius: 8, fontSize: '0.8rem', color: '#555', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiTruck size={13} color="#2874f0" />
                {subtotal > 499 ? 'You get FREE delivery on this order!' : `Add ₹${(499 - subtotal).toLocaleString()} more for FREE delivery`}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
