import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Autoplay } from 'swiper/modules';
import HeroCarousel from '../components/HeroCarousel';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import LoaderSkeleton from '../components/LoaderSkeleton';
import { products, categories } from '../data/products';
import { FiArrowRight, FiClock, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';

function SectionReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProductSection({ title, badge, products: prods, viewAllLink }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);

  return (
    <SectionReveal>
      <div style={{ background: 'white', borderRadius: 16, padding: '24px', marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>{title}</h2>
            {badge && <span className="section-badge">{badge}</span>}
          </div>
          <Link to={viewAllLink || '/products'} style={{
            color: '#2874f0', textDecoration: 'none', fontSize: '0.85rem',
            fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Sora'
          }}>
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            <LoaderSkeleton count={5} />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, FreeMode]}
            spaceBetween={16} slidesPerView="auto" freeMode navigation
            style={{ paddingBottom: 8 }}
          >
            {prods.map(p => (
              <SwiperSlide key={p.id} style={{ width: 200 }}>
                <ProductCard product={p} compact />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </SectionReveal>
  );
}

function MegaOfferCard({ product }) {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 23, s: 47 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 5, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: 16, overflow: 'hidden', position: 'relative', cursor: 'pointer'
    }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div style={{ position: 'relative', height: 180 }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
          <div style={{
            position: 'absolute', top: 10, right: 10, background: '#ff6161',
            color: 'white', padding: '3px 10px', borderRadius: 20,
            fontSize: '0.75rem', fontWeight: 800
          }}>
            {product.discount}% OFF
          </div>
        </div>
        <div style={{ padding: '14px' }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginBottom: 4 }}>{product.brand}</div>
          <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: 8,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
            {product.title}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontFamily: 'Sora', fontWeight: 800, color: 'white', fontSize: '1.1rem' }}>₹{product.price.toLocaleString()}</span>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
          </div>
          {/* Timer */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <FiClock size={12} color="#ff9f00" />
            <span style={{ color: '#ff9f00', fontSize: '0.7rem', fontWeight: 600 }}>Ends in:</span>
            {[timeLeft.h, timeLeft.m, timeLeft.s].map((val, i) => (
              <span key={i}>
                <span style={{
                  background: '#ff9f00', color: 'white', fontFamily: 'Sora', fontWeight: 700,
                  fontSize: '0.75rem', padding: '2px 6px', borderRadius: 4
                }}>
                  {String(val).padStart(2, '0')}
                </span>
                {i < 2 && <span style={{ color: '#ff9f00', fontWeight: 700, margin: '0 1px' }}>:</span>}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const trending = products.filter(p => p.trending);
  const electronics = products.filter(p => p.category === 'Electronics');
  const fashion = products.filter(p => p.category === 'Fashion');
  const bestsellers = products.filter(p => p.bestseller);
  const megaOffers = products.filter(p => p.discount >= 30).slice(0, 6);
  const recommended = products.slice(0, 10);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <HeroCarousel />

      {/* Trust badges */}
      <div style={{ background: 'white', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container">
          <div className="row g-2 text-center">
            {[
              { icon: FiTruck, text: 'Free Delivery', sub: 'On orders ₹499+' },
              { icon: FiRefreshCw, text: 'Easy Returns', sub: '7-day returns' },
              { icon: FiShield, text: '100% Authentic', sub: 'Verified products' },
              { icon: FiClock, text: '24/7 Support', sub: 'Always available' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="col-6 col-md-3">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <div style={{ background: '#e8f0fe', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color="#2874f0" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.8rem', color: '#212121' }}>{text}</div>
                    <div style={{ fontSize: '0.7rem', color: '#878787' }}>{sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-3">
        {/* Categories */}
        <SectionReveal>
          <div style={{ background: 'white', borderRadius: 16, padding: '24px', marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className="section-title">Shop by Category</h2>
              <Link to="/products" style={{ color: '#2874f0', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Sora' }}>
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 14 }}>
              {categories.map((cat, i) => (
                <motion.div key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CategoryCard category={cat} />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Trending Deals */}
        <ProductSection title="🔥 Trending Deals" badge="HOT" products={trending} viewAllLink="/products" />

        {/* Mega Offers */}
        <SectionReveal>
          <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: 16, padding: '24px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontFamily: 'Sora', fontWeight: 800, color: 'white', marginBottom: 4, fontSize: '1.4rem' }}>
                  ⚡ Today's Mega Offers
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.85rem' }}>
                  Massive discounts, limited time only!
                </p>
              </div>
              <Link to="/products" style={{
                color: '#ff9f00', textDecoration: 'none', fontSize: '0.85rem',
                fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Sora'
              }}>
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {megaOffers.map(p => <MegaOfferCard key={p.id} product={p} />)}
            </div>
          </div>
        </SectionReveal>

        {/* Top Electronics */}
        <ProductSection title="💻 Top Electronics" products={electronics} viewAllLink="/products/Electronics" />

        {/* Fashion Picks */}
        <ProductSection title="👗 Fashion Picks" badge="NEW" products={fashion} viewAllLink="/products/Fashion" />

        {/* Best Sellers */}
        <ProductSection title="⭐ Best Sellers" badge="POPULAR" products={bestsellers} viewAllLink="/products" />

        {/* Recommended */}
        <SectionReveal>
          <div style={{ background: 'white', borderRadius: 16, padding: '24px', marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className="section-title">🎯 Recommended for You</h2>
              <Link to="/products" style={{ color: '#2874f0', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Sora', display: 'flex', alignItems: 'center', gap: 4 }}>
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
              {recommended.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <ProductCard product={p} compact />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* App Download Banner */}
        <SectionReveal>
          <div style={{
            background: 'linear-gradient(135deg, #2874f0 0%, #1a5dc8 100%)',
            borderRadius: 16, padding: '32px', marginBottom: 16,
            display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 800, color: 'white', fontSize: '1.5rem', marginBottom: 8 }}>
                📱 Get the E-Kart App
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '0.9rem' }}>
                Exclusive app-only deals • Track orders live • Faster checkout
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['App Store', 'Play Store'].map(store => (
                <button key={store} style={{
                  background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
                  color: 'white', padding: '10px 20px', borderRadius: 10, cursor: 'pointer',
                  fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s',
                  backdropFilter: 'blur(8px)'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  {store === 'App Store' ? '🍎' : '🤖'} {store}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
