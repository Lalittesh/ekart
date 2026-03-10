import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';
import { heroBanners } from '../data/products';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function HeroCarousel() {
  return (
    <div style={{ position: 'relative', borderRadius: 0, overflow: 'hidden' }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation loop pagination={{ clickable: true }}
        style={{ width: '100%' }}
      >
        {heroBanners.map(banner => (
          <SwiperSlide key={banner.id}>
            <div style={{
              background: banner.bg,
              minHeight: 360, position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center'
            }}>
              {/* Background image */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${banner.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.3
              }} />

              {/* Content */}
              <div className="container" style={{ position: 'relative', zIndex: 2, padding: '60px 24px' }}>
                <div className="row align-items-center">
                  <div className="col-md-7">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div style={{
                        display: 'inline-block', background: banner.accent,
                        color: banner.id === 2 ? '#212121' : 'white',
                        padding: '4px 14px', borderRadius: 20,
                        fontSize: '0.75rem', fontWeight: 700, marginBottom: 16,
                        letterSpacing: '1px', textTransform: 'uppercase'
                      }}>
                        🔥 Limited Time Offer
                      </div>
                      <h1 style={{
                        fontFamily: 'Sora', fontWeight: 800,
                        fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                        color: banner.id === 2 ? '#212121' : 'white',
                        lineHeight: 1.2, marginBottom: 12
                      }}>
                        {banner.title}
                      </h1>
                      <p style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                        color: banner.id === 2 ? '#555' : 'rgba(255,255,255,0.9)',
                        fontWeight: 500, marginBottom: 8
                      }}>
                        {banner.subtitle}
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: banner.id === 2 ? '#777' : 'rgba(255,255,255,0.75)',
                        marginBottom: 28
                      }}>
                        {banner.description}
                      </p>
                      <Link to="/products" style={{ textDecoration: 'none' }}>
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            background: banner.id === 2 ? '#2874f0' : 'white',
                            color: banner.id === 2 ? 'white' : '#2874f0',
                            border: 'none', padding: '13px 28px',
                            borderRadius: 10, fontFamily: 'Sora',
                            fontWeight: 700, fontSize: '1rem',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                          }}
                        >
                          {banner.cta} <FiArrowRight size={16} />
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Decorative shapes */}
              <div style={{
                position: 'absolute', right: -80, top: -80,
                width: 400, height: 400, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)', pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute', right: 60, bottom: -100,
                width: 260, height: 260, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)', pointerEvents: 'none'
              }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
