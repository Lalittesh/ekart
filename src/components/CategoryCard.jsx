import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/products/${category.name}`} style={{ textDecoration: 'none' }}>
      <motion.div
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '20px 16px', background: 'white', borderRadius: 16,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: 'pointer',
          border: `2px solid transparent`, transition: 'border-color 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = category.color}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
      >
        <div style={{
          width: 64, height: 64, borderRadius: 16, background: category.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', marginBottom: 10, transition: 'transform 0.3s',
          boxShadow: `0 4px 16px ${category.color}22`
        }}>
          {category.icon}
        </div>
        <span style={{
          fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem',
          color: '#212121', textAlign: 'center'
        }}>
          {category.name}
        </span>
      </motion.div>
    </Link>
  );
}
