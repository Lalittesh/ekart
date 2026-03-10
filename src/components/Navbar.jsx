import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { products, categories } from '../data/products';

export default function Navbar({ cartCount, wishlistCount }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSuggestions([]);
      navigate(`/products?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (p) => {
    setSuggestions([]);
    setQuery('');
    navigate(`/product/${p.id}`);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: scrolled ? 'rgba(40,116,240,0.97)' : '#2874f0',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
    }}>
      <div className="container-fluid px-3 px-lg-4">
        <div className="d-flex align-items-center gap-3 py-2">
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                background: 'white', color: '#2874f0',
                fontFamily: 'Sora, sans-serif', fontWeight: 800,
                fontSize: '1.4rem', padding: '4px 10px', borderRadius: 8,
                letterSpacing: '-0.5px', lineHeight: 1.2
              }}>
                E
              </div>
              <div>
                <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.3rem', color: 'white', lineHeight: 1, letterSpacing: '-0.5px' }}>
                  Kart
                </div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.5px', fontWeight: 500 }}>
                  SMART SHOPPING
                </div>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div ref={searchRef} style={{ flex: 1, maxWidth: 600, position: 'relative' }} className="d-none d-md-block">
            <form onSubmit={handleSearch}>
              <div style={{ display: 'flex', background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  style={{
                    flex: 1, border: 'none', outline: 'none', padding: '10px 16px',
                    fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', color: '#333'
                  }}
                />
                <button type="submit" style={{
                  background: '#2874f0', border: 'none', padding: '0 18px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center'
                }}>
                  <FiSearch size={18} color="white" />
                </button>
              </div>
            </form>
            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute', top: '110%', left: 0, right: 0,
                    background: 'white', borderRadius: 8,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: 999,
                    overflow: 'hidden'
                  }}
                >
                  {suggestions.map(s => (
                    <div key={s.id} onClick={() => handleSuggestionClick(s)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 16px', cursor: 'pointer',
                        borderBottom: '1px solid #f5f5f5', transition: 'background 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f0f5ff'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}
                    >
                      <img src={s.image} alt={s.title} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#212121' }}>{s.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#878787' }}>{s.category}</div>
                      </div>
                      <div style={{ marginLeft: 'auto', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: '#2874f0' }}>
                        ₹{s.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nav Items */}
          <div className="d-none d-lg-flex align-items-center gap-1 ms-auto" style={{ flexShrink: 0 }}>
            {/* Categories */}
            <div style={{ position: 'relative' }}
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button style={{
                background: 'transparent', border: 'none',
                color: 'white', padding: '8px 14px', borderRadius: 8,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                fontSize: '0.9rem', fontWeight: 600, fontFamily: 'Sora',
                transition: 'background 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Categories <FiChevronDown size={14} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      position: 'absolute', top: '100%', left: 0,
                      background: 'white', borderRadius: 12, minWidth: 200,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: 999,
                      padding: '8px 0', overflow: 'hidden'
                    }}
                  >
                    {categories.map(cat => (
                      <Link key={cat.name} to={`/products/${cat.name}`} style={{ textDecoration: 'none' }}
                        onClick={() => setCatOpen(false)}
                      >
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '9px 18px', cursor: 'pointer', transition: 'background 0.2s'
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f0f5ff'}
                          onMouseLeave={e => e.currentTarget.style.background = 'white'}
                        >
                          <span style={{ fontSize: '1.1rem' }}>{cat.icon}</span>
                          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#212121' }}>{cat.name}</span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login */}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'white', border: 'none', color: '#2874f0',
                padding: '8px 18px', borderRadius: 8, cursor: 'pointer',
                fontWeight: 700, fontFamily: 'Sora', fontSize: '0.875rem',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f0f5ff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
              >
                <FiUser size={16} /> Login
              </button>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative', cursor: 'pointer', padding: '8px 12px', borderRadius: 8, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <FiHeart size={22} color="white" />
                {wishlistCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 4, right: 4, background: '#ff6161',
                    color: 'white', borderRadius: '50%', width: 18, height: 18,
                    fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{wishlistCount}</span>
                )}
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', textAlign: 'center', fontWeight: 500 }}>Wishlist</div>
              </div>
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative', cursor: 'pointer', padding: '8px 12px', borderRadius: 8, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <FiShoppingCart size={22} color="white" />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 4, right: 4, background: '#ff9f00',
                    color: 'white', borderRadius: '50%', width: 18, height: 18,
                    fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{cartCount}</span>
                )}
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', textAlign: 'center', fontWeight: 500 }}>Cart</div>
              </div>
            </Link>
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="d-lg-none d-flex align-items-center gap-2 ms-auto">
            <Link to="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
              <FiShoppingCart size={22} color="white" />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4, background: '#ff9f00',
                  color: 'white', borderRadius: '50%', width: 16, height: 16,
                  fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{cartCount}</span>
              )}
            </Link>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={24} color="white" /> : <FiMenu size={24} color="white" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="d-md-none pb-2" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <div style={{ display: 'flex', background: 'white', borderRadius: 8, overflow: 'hidden' }}>
              <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search products..." style={{
                  flex: 1, border: 'none', outline: 'none', padding: '8px 12px', fontSize: '0.85rem'
                }} />
              <button type="submit" style={{ background: '#ff9f00', border: 'none', padding: '0 14px', cursor: 'pointer' }}>
                <FiSearch size={16} color="white" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ background: 'rgba(255,255,255,0.98)', borderTop: '1px solid rgba(255,255,255,0.2)', overflow: 'hidden' }}
          >
            <div className="p-3">
              {[{ to: '/', label: 'Home' }, { to: '/products', label: 'All Products' },
                { to: '/wishlist', label: `Wishlist (${wishlistCount})` }, { to: '/login', label: 'Login / Register' }
              ].map(item => (
                <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', padding: '12px 0', color: '#212121', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #eee', fontFamily: 'Sora' }}>
                  {item.label}
                </Link>
              ))}
              <div style={{ paddingTop: 12 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#878787', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Categories</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {categories.map(cat => (
                    <Link key={cat.name} to={`/products/${cat.name}`} onClick={() => setMenuOpen(false)}
                      style={{ textDecoration: 'none', padding: '6px 12px', background: cat.bg, borderRadius: 20, fontSize: '0.8rem', color: cat.color, fontWeight: 600 }}>
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
