import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw, FiMapPin, FiShare2, FiChevronRight } from 'react-icons/fi';
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { useApp } from '../App';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const reviews = [
  { id: 1, user: 'Arjun Sharma', rating: 5, date: 'Jan 2025', title: 'Absolutely love it!', body: 'Exceeded all my expectations. The build quality is top-notch and performance is stellar. Highly recommend to everyone.', verified: true },
  { id: 2, user: 'Priya Mehta', rating: 4, date: 'Dec 2024', title: 'Great product, minor issues', body: 'Overall a fantastic product. Delivery was super fast. Only minor nitpick is the packaging could be better.', verified: true },
  { id: 3, user: 'Rahul Kumar', rating: 5, date: 'Nov 2024', title: 'Best purchase this year!', body: 'Incredible value for money. I\'ve been using this for 2 months and still very impressed. Will definitely buy again.', verified: false },
];

function StarRating({ rating, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: '#ff9f00' }}>
          {rating >= s ? <FaStar size={size} /> : rating >= s - 0.5 ? <FaStarHalfAlt size={size} /> : <FaRegStar size={size} />}
        </span>
      ))}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === +id);
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [delivery, setDelivery] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');

  const wishlisted = product ? isWishlisted(product.id) : false;
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 8);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0);
  }, [id]);

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontSize: '4rem' }}>😕</div>
      <h2 style={{ fontFamily: 'Sora' }}>Product not found</h2>
      <Link to="/products" className="btn-primary-custom" style={{ display: 'inline-block', marginTop: 16 }}>Back to Products</Link>
    </div>
  );

  const images = product.images || [product.image];
  const savings = product.originalPrice - product.price;

  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDelivery({ date: 'Tomorrow, by 10 PM', free: product.price > 499 });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container py-3">
        {/* Breadcrumb */}
        <nav style={{ marginBottom: 16, fontSize: '0.8rem', color: '#878787', display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#2874f0', textDecoration: 'none' }}>Home</Link>
          <FiChevronRight size={12} />
          <Link to={`/products/${product.category}`} style={{ color: '#2874f0', textDecoration: 'none' }}>{product.category}</Link>
          <FiChevronRight size={12} />
          <span style={{ color: '#333' }}>{product.title.slice(0, 40)}...</span>
        </nav>

        <div className="row g-4">
          {/* Left: Images */}
          <div className="col-lg-5">
            <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', position: 'sticky', top: 80 }}>
              {/* Main Image */}
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#fafafa', marginBottom: 12 }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={product.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', height: 380, objectFit: 'contain' }}
                  />
                </AnimatePresence>

                {/* Discount badge */}
                <div style={{ position: 'absolute', top: 12, left: 12, background: '#ff6161', color: 'white', padding: '4px 10px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700 }}>
                  {product.discount}% OFF
                </div>

                {/* Wishlist + Share */}
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                  {[
                    { icon: wishlisted ? <FaHeart size={16} color="#ff6161" /> : <FiHeart size={16} />, action: () => toggleWishlist(product) },
                    { icon: <FiShare2 size={16} />, action: () => { navigator.clipboard?.writeText(window.location.href); showToast('Link copied! 🔗'); } }
                  ].map(({ icon, action }, i) => (
                    <button key={i} onClick={action} style={{
                      background: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)', color: '#555', transition: 'transform 0.2s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} style={{
                      border: `2px solid ${activeImg === i ? '#2874f0' : '#e0e0e0'}`,
                      borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                      background: 'none', padding: 0, transition: 'border-color 0.2s', flexShrink: 0
                    }}>
                      <img src={img} alt="" style={{ width: 64, height: 64, objectFit: 'cover', display: 'block' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="col-lg-7">
            <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              {/* Brand */}
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2874f0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>
                {product.brand}
              </div>

              {/* Title */}
              <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', lineHeight: 1.3, marginBottom: 14, color: '#212121' }}>
                {product.title}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#388e3c', color: 'white', padding: '4px 12px', borderRadius: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{product.rating}</span>
                  <FaStar size={12} />
                </div>
                <StarRating rating={product.rating} />
                <span style={{ color: '#878787', fontSize: '0.85rem' }}>{product.reviews.toLocaleString()} ratings & reviews</span>
              </div>

              {/* Price */}
              <div style={{ padding: '16px 0', borderTop: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '2rem', color: '#212121' }}>
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#bdbdbd', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: 'Sora', fontWeight: 700, color: '#26a541', fontSize: '1rem' }}>
                    {product.discount}% off
                  </span>
                </div>
                <div style={{ color: '#878787', fontSize: '0.85rem', marginTop: 4 }}>
                  You save: <strong style={{ color: '#26a541' }}>₹{savings.toLocaleString()}</strong>
                  {product.price <= 499 && <span style={{ marginLeft: 12, color: '#ff9f00', fontWeight: 600 }}>+ FREE Delivery</span>}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 20 }}>
                {product.description}
              </p>

              {/* Quantity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.9rem' }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: '#f5f5f5', border: 'none', width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700, transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e8f0fe'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}
                  >−</button>
                  <span style={{ width: 40, textAlign: 'center', fontFamily: 'Sora', fontWeight: 700 }}>{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{ background: '#f5f5f5', border: 'none', width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700, transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e8f0fe'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}
                  >+</button>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#878787' }}>({product.stock} available)</span>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <motion.button
                  whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
                  onClick={() => addToCart(product, qty)}
                  style={{
                    flex: 1, minWidth: 160, background: '#ff9f00', border: 'none', color: 'white',
                    padding: '14px', borderRadius: 10, fontFamily: 'Sora', fontWeight: 700,
                    fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 4px 16px rgba(255,159,0,0.35)'
                  }}
                >
                  <FiShoppingCart size={18} /> Add to Cart
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
                  onClick={() => { addToCart(product, qty); }}
                  style={{
                    flex: 1, minWidth: 160, background: '#2874f0', border: 'none', color: 'white',
                    padding: '14px', borderRadius: 10, fontFamily: 'Sora', fontWeight: 700,
                    fontSize: '1rem', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(40,116,240,0.35)'
                  }}
                >
                  ⚡ Buy Now
                </motion.button>
              </div>

              {/* Delivery check */}
              <div style={{ background: '#f8f9ff', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FiTruck size={16} color="#2874f0" /> Delivery Options
                </div>
                <form onSubmit={checkDelivery} style={{ display: 'flex', gap: 8 }}>
                  <input type="text" value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit pincode"
                    style={{ flex: 1, border: '1px solid #ddd', borderRadius: 8, padding: '8px 12px', fontSize: '0.85rem', outline: 'none' }} />
                  <button type="submit" style={{ background: '#2874f0', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'Sora' }}>
                    Check
                  </button>
                </form>
                {delivery && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 10, color: '#26a541', fontSize: '0.85rem', fontWeight: 600 }}>
                    ✅ Delivery by {delivery.date} {delivery.free ? '(FREE)' : '(₹40 charge)'}
                  </motion.div>
                )}
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { icon: FiShield, text: '100% Authentic' },
                  { icon: FiRefreshCw, text: '7 Day Return' },
                  { icon: FiTruck, text: 'Fast Delivery' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#555', fontWeight: 500 }}>
                    <Icon size={13} color="#2874f0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs: Specs / Reviews */}
            <div style={{ background: 'white', borderRadius: 16, marginTop: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
                {['specs', 'reviews'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    flex: 1, padding: '16px', border: 'none', background: 'none', cursor: 'pointer',
                    fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem',
                    color: activeTab === tab ? '#2874f0' : '#878787',
                    borderBottom: `3px solid ${activeTab === tab ? '#2874f0' : 'transparent'}`,
                    transition: 'all 0.2s'
                  }}>
                    {tab === 'specs' ? '📋 Specifications' : `⭐ Reviews (${reviews.length})`}
                  </button>
                ))}
              </div>

              <div style={{ padding: 24 }}>
                <AnimatePresence mode="wait">
                  {activeTab === 'specs' ? (
                    <motion.div key="specs" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          {Object.entries(product.specs).map(([key, val], i) => (
                            <tr key={key} style={{ background: i % 2 === 0 ? '#fafafa' : 'white' }}>
                              <td style={{ padding: '10px 14px', fontWeight: 600, color: '#555', fontSize: '0.85rem', width: '35%', borderRadius: i === 0 ? '8px 0 0 0' : 0 }}>
                                {key}
                              </td>
                              <td style={{ padding: '10px 14px', color: '#212121', fontSize: '0.85rem' }}>
                                {val}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  ) : (
                    <motion.div key="reviews" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      {/* Rating summary */}
                      <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: '0 0 20px', borderBottom: '1px solid #f0f0f0', marginBottom: 20, flexWrap: 'wrap' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '3rem', color: '#212121', lineHeight: 1 }}>{product.rating}</div>
                          <StarRating rating={product.rating} size={18} />
                          <div style={{ color: '#878787', fontSize: '0.78rem', marginTop: 4 }}>{product.reviews.toLocaleString()} reviews</div>
                        </div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          {[5, 4, 3, 2, 1].map(s => (
                            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                              <span style={{ fontSize: '0.75rem', color: '#555', width: 20 }}>{s}★</span>
                              <div style={{ flex: 1, background: '#f0f0f0', height: 6, borderRadius: 3 }}>
                                <div style={{ background: s >= 4 ? '#388e3c' : s === 3 ? '#ff9f00' : '#ff6161', height: '100%', borderRadius: 3, width: `${[70, 20, 5, 3, 2][5 - s]}%` }} />
                              </div>
                              <span style={{ fontSize: '0.72rem', color: '#878787', width: 30 }}>{[70, 20, 5, 3, 2][5 - s]}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {reviews.map(r => (
                        <div key={r.id} style={{ padding: '16px 0', borderBottom: '1px solid #f5f5f5' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2874f020', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#2874f0', fontSize: '0.9rem', fontFamily: 'Sora' }}>
                                  {r.user[0]}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{r.user}</div>
                                  {r.verified && <div style={{ fontSize: '0.7rem', color: '#26a541', fontWeight: 600 }}>✅ Verified Purchase</div>}
                                </div>
                              </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#878787' }}>{r.date}</span>
                          </div>
                          <StarRating rating={r.rating} size={13} />
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', marginTop: 6, marginBottom: 4 }}>{r.title}</div>
                          <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{r.body}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24, marginTop: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}>Related Products</h2>
            <Swiper modules={[Navigation, FreeMode]} spaceBetween={16} slidesPerView="auto" freeMode navigation>
              {related.map(p => (
                <SwiperSlide key={p.id} style={{ width: 200 }}>
                  <ProductCard product={p} compact />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
