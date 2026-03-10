import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer style={{ background: '#212121', color: '#bdbdbd', marginTop: 0 }}>
      {/* Top section */}
      <div style={{ background: '#2874f0', padding: '20px 0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 style={{ fontFamily: 'Sora', color: 'white', fontWeight: 700, margin: 0 }}>
                📧 Subscribe to our Newsletter
              </h5>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.875rem' }}>
                Get exclusive deals and offers delivered to your inbox
              </p>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              {subscribed ? (
                <div style={{ color: '#7fffb0', fontWeight: 600 }}>✅ You're subscribed! Welcome aboard 🎉</div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0 }}>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={{
                      flex: 1, padding: '11px 16px', border: 'none', borderRadius: '8px 0 0 8px',
                      outline: 'none', fontSize: '0.875rem', fontFamily: 'DM Sans'
                    }} />
                  <button type="submit" style={{
                    background: '#ff9f00', border: 'none', color: 'white',
                    padding: '11px 20px', borderRadius: '0 8px 8px 0',
                    fontFamily: 'Sora', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem'
                  }}>
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-5">
        <div className="row g-4">
          {/* About */}
          <div className="col-lg-3 col-md-6">
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  background: '#2874f0', color: 'white',
                  fontFamily: 'Sora', fontWeight: 800, fontSize: '1.4rem',
                  padding: '4px 10px', borderRadius: 8
                }}>E</div>
                <div>
                  <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.3rem', color: 'white' }}>Kart</div>
                  <div style={{ fontSize: '0.6rem', color: '#878787', letterSpacing: '0.5px' }}>SMART SHOPPING</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 16 }}>
                India's fastest-growing online shopping destination offering millions of products across categories with the best prices, fast delivery, and excellent customer service.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {[FiFacebook, FiTwitter, FiInstagram, FiYoutube].map((Icon, i) => (
                  <a key={i} href="#" style={{
                    width: 36, height: 36, background: '#333', borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#bdbdbd', textDecoration: 'none', transition: 'all 0.3s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#2874f0'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#bdbdbd'; }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6">
            <h6 style={{ fontFamily: 'Sora', color: 'white', fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Customer Service
            </h6>
            {['Help Center', 'Track Order', 'Returns & Refunds', 'Cancellations', 'Report a Problem', 'Gift Cards'].map(item => (
              <a key={item} href="#" style={{ display: 'block', color: '#9e9e9e', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2874f0'}
                onMouseLeave={e => e.currentTarget.style.color = '#9e9e9e'}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Policies */}
          <div className="col-lg-2 col-md-6">
            <h6 style={{ fontFamily: 'Sora', color: 'white', fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Policies
            </h6>
            {['Privacy Policy', 'Terms of Service', 'Return Policy', 'Shipping Policy', 'Cookie Policy', 'Disclaimer'].map(item => (
              <a key={item} href="#" style={{ display: 'block', color: '#9e9e9e', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2874f0'}
                onMouseLeave={e => e.currentTarget.style.color = '#9e9e9e'}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 style={{ fontFamily: 'Sora', color: 'white', fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Links
            </h6>
            {[
              { label: 'Home', to: '/' },
              { label: 'All Products', to: '/products' },
              { label: 'My Wishlist', to: '/wishlist' },
              { label: 'My Cart', to: '/cart' },
              { label: 'Login', to: '/login' },
              { label: 'Register', to: '/login' },
            ].map(item => (
              <Link key={item.label} to={item.to} style={{ display: 'block', color: '#9e9e9e', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2874f0'}
                onMouseLeave={e => e.currentTarget.style.color = '#9e9e9e'}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 style={{ fontFamily: 'Sora', color: 'white', fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Contact Us
            </h6>
            {[
              { icon: FiPhone, text: '+91 1800-208-9898', sub: 'Mon–Sat 9AM–8PM' },
              { icon: FiMail, text: 'support@ekart.in', sub: 'Response within 24hrs' },
              { icon: FiMapPin, text: 'E-Kart House, Bengaluru', sub: 'Karnataka, India 560001' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, background: '#2874f020', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={16} color="#2874f0" />
                </div>
                <div>
                  <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{text}</div>
                  <div style={{ color: '#878787', fontSize: '0.75rem' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #333', padding: '16px 0' }}>
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2">
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#878787' }}>
            © 2025 E-Kart Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {['VISA', 'MC', 'UPI', 'Paytm', 'GPay'].map(pm => (
              <div key={pm} style={{
                background: '#333', borderRadius: 4, padding: '4px 8px',
                fontSize: '0.65rem', fontWeight: 700, color: '#bdbdbd', letterSpacing: '0.5px'
              }}>{pm}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
