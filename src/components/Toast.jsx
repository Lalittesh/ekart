import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiInfo, FiAlertCircle } from 'react-icons/fi';

const icons = {
  success: <FiCheckCircle size={20} />,
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
};
const colors = {
  success: '#26a541',
  info: '#2874f0',
  error: '#ff6161',
};

export default function Toast({ message, type = 'success' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.9 }}
      style={{
        position: 'fixed', top: 80, right: 20, zIndex: 9999,
        background: 'white', borderRadius: 12, padding: '14px 20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        display: 'flex', alignItems: 'center', gap: 10,
        borderLeft: `4px solid ${colors[type]}`,
        minWidth: 260, maxWidth: 360,
        fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
      }}
    >
      <span style={{ color: colors[type] }}>{icons[type]}</span>
      <span style={{ fontSize: '0.9rem' }}>{message}</span>
    </motion.div>
  );
}
