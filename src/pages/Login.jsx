import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useApp } from '../App';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && form.password !== form.confirm) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    showToast(isLogin ? 'Welcome back! 👋' : 'Account created successfully! 🎉');
    navigate('/');
  };

  const InputField = ({ icon: Icon, placeholder, type = 'text', name, value, onChange, rightElement }) => (
    <div style={{ position: 'relative', marginBottom: 14 }}>
      <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }}>
        <Icon size={16} />
      </div>
      <input
        type={type} placeholder={placeholder} name={name} value={value} onChange={onChange}
        required
        style={{
          width: '100%', border: '1.5px solid #e0e0e0', borderRadius: 10, padding: '12px 44px',
          fontSize: '0.9rem', fontFamily: 'DM Sans', color: '#212121', outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s', background: 'rgba(255,255,255,0.8)'
        }}
        onFocus={e => { e.target.style.borderColor = '#2874f0'; e.target.style.boxShadow = '0 0 0 3px rgba(40,116,240,0.1)'; }}
        onBlur={e => { e.target.style.borderColor = '#e0e0e0'; e.target.style.boxShadow = 'none'; }}
      />
      {rightElement && (
        <button type="button" onClick={rightElement.onClick}
          style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
          {rightElement.icon}
        </button>
      )}
    </div>
  );

  return (
    <div className="page-wrapper" style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background decorations */}
      {[[-200, -200, 400], [400, 100, 300], [-100, 400, 250]].map(([x, y, size], i) => (
        <div key={i} style={{
          position: 'absolute', left: x, top: y, width: size, height: size,
          borderRadius: '50%', background: 'rgba(40,116,240,0.1)', pointerEvents: 'none',
          filter: 'blur(40px)'
        }} />
      ))}

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 2 }}>
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'white', color: '#2874f0', fontFamily: 'Sora', fontWeight: 800, fontSize: '1.6rem', padding: '6px 12px', borderRadius: 10 }}>E</div>
            <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.6rem', color: 'white', letterSpacing: '-1px' }}>Kart</div>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: '8px 0 0' }}>
            Smart Online Shopping
          </p>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 20, padding: '32px 28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.4)'
          }}
        >
          {/* Tab switcher */}
          <div style={{ display: 'flex', background: '#f5f5f5', borderRadius: 10, padding: 4, marginBottom: 24 }}>
            {[{ label: 'Login', val: true }, { label: 'Register', val: false }].map(({ label, val }) => (
              <button key={label} onClick={() => setIsLogin(val)} style={{
                flex: 1, padding: '9px', border: 'none', borderRadius: 8, cursor: 'pointer',
                fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.3s',
                background: isLogin === val ? 'white' : 'transparent',
                color: isLogin === val ? '#2874f0' : '#878787',
                boxShadow: isLogin === val ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}>
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <AnimatePresence>
                {!isLogin && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <InputField icon={FiUser} placeholder="Full Name" name="name" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </motion.div>
                )}
              </AnimatePresence>

              <InputField icon={FiMail} placeholder="Email Address" type="email" name="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />

              <InputField icon={FiLock} placeholder="Password" type={showPass ? 'text' : 'password'} name="password" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                rightElement={{ icon: showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />, onClick: () => setShowPass(!showPass) }}
              />

              <AnimatePresence>
                {!isLogin && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <InputField icon={FiLock} placeholder="Confirm Password" type="password" name="confirm" value={form.confirm}
                      onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />
                  </motion.div>
                )}
              </AnimatePresence>

              {isLogin && (
                <div style={{ textAlign: 'right', marginBottom: 16, marginTop: -6 }}>
                  <a href="#" style={{ color: '#2874f0', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600 }}>
                    Forgot Password?
                  </a>
                </div>
              )}

              <motion.button
                type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                style={{
                  width: '100%', background: loading ? '#a0b8f5' : '#2874f0', border: 'none', color: 'white',
                  padding: '13px', borderRadius: 10, fontFamily: 'Sora', fontWeight: 700,
                  fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(40,116,240,0.35)',
                  transition: 'all 0.2s', marginBottom: 20
                }}
              >
                {loading ? (
                  <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                ) : (
                  <>{isLogin ? 'Login to E-Kart' : 'Create Account'} <FiArrowRight size={16} /></>
                )}
              </motion.button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: '#e0e0e0' }} />
                <span style={{ fontSize: '0.78rem', color: '#aaa', fontWeight: 500 }}>or continue with</span>
                <div style={{ flex: 1, height: 1, background: '#e0e0e0' }} />
              </div>

              {/* Social Login */}
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { icon: <FcGoogle size={20} />, label: 'Google', bg: 'white', border: '#e0e0e0', color: '#333' },
                  { icon: <FaFacebook size={20} color="#1877f2" />, label: 'Facebook', bg: 'white', border: '#e0e0e0', color: '#333' },
                ].map(({ icon, label, bg, border, color }) => (
                  <button key={label} type="button" style={{
                    flex: 1, background: bg, border: `1.5px solid ${border}`, color, borderRadius: 10,
                    padding: '10px', cursor: 'pointer', fontFamily: 'Sora', fontWeight: 600, fontSize: '0.85rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8f8f8'}
                    onMouseLeave={e => e.currentTarget.style.background = bg}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            </motion.form>
          </AnimatePresence>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.82rem', color: '#878787' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={() => setIsLogin(!isLogin)}
              style={{ background: 'none', border: 'none', color: '#2874f0', fontWeight: 700, cursor: 'pointer', fontFamily: 'Sora', fontSize: '0.82rem' }}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </motion.div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', marginTop: 16 }}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
