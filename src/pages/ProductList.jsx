import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiGrid, FiList, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import LoaderSkeleton from '../components/LoaderSkeleton';
import { products, categories } from '../data/products';

const brands = [...new Set(products.map(p => p.brand))];

export default function ProductList() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [filters, setFilters] = useState({
    categories: category ? [category] : [],
    brands: [],
    minPrice: 0,
    maxPrice: 200000,
    minRating: 0,
    minDiscount: 0,
    sort: 'popularity',
  });
  const [expandedFilters, setExpandedFilters] = useState({ categories: true, brands: true, price: true, rating: true, discount: true });

  useEffect(() => {
    setLoading(true);
    if (category) setFilters(f => ({ ...f, categories: [category] }));
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [category]);

  useEffect(() => {
    if (query) setFilters(f => ({ ...f, categories: [] }));
  }, [query]);

  const toggleFilter = (key, value) => {
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter(v => v !== value)
        : [...f[key], value]
    }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (query) result = result.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));
    if (filters.categories.length) result = result.filter(p => filters.categories.includes(p.category));
    if (filters.brands.length) result = result.filter(p => filters.brands.includes(p.brand));
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    result = result.filter(p => p.rating >= filters.minRating);
    result = result.filter(p => p.discount >= filters.minDiscount);
    switch (filters.sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [filters, query]);

  const FilterSection = ({ title, filterKey, children }) => (
    <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 16, marginBottom: 16 }}>
      <button
        onClick={() => setExpandedFilters(e => ({ ...e, [filterKey]: !e[filterKey] }))}
        style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: 0, marginBottom: expandedFilters[filterKey] ? 12 : 0 }}
      >
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: '#212121' }}>{title}</span>
        {expandedFilters[filterKey] ? <FiChevronUp size={16} color="#878787" /> : <FiChevronDown size={16} color="#878787" />}
      </button>
      <AnimatePresence>
        {expandedFilters[filterKey] && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const Checkbox = ({ label, checked, onChange, count }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 8 }}>
      <input type="checkbox" checked={checked} onChange={onChange}
        style={{ accentColor: '#2874f0', width: 16, height: 16, cursor: 'pointer' }} />
      <span style={{ fontSize: '0.83rem', color: '#333', flex: 1 }}>{label}</span>
      {count !== undefined && <span style={{ fontSize: '0.72rem', color: '#878787' }}>({count})</span>}
    </label>
  );

  const FilterPanel = () => (
    <div style={{ background: 'white', borderRadius: 14, padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', height: 'fit-content', position: 'sticky', top: 80 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1rem', margin: 0 }}>Filters</h3>
        <button onClick={() => setFilters({ categories: [], brands: [], minPrice: 0, maxPrice: 200000, minRating: 0, minDiscount: 0, sort: 'popularity' })}
          style={{ fontSize: '0.78rem', color: '#2874f0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontFamily: 'Sora' }}>
          Clear All
        </button>
      </div>

      <FilterSection title="Categories" filterKey="categories">
        {categories.map(cat => (
          <Checkbox key={cat.name} label={`${cat.icon} ${cat.name}`}
            checked={filters.categories.includes(cat.name)}
            onChange={() => toggleFilter('categories', cat.name)}
            count={products.filter(p => p.category === cat.name).length}
          />
        ))}
      </FilterSection>

      <FilterSection title="Brand" filterKey="brands">
        {brands.slice(0, 8).map(b => (
          <Checkbox key={b} label={b}
            checked={filters.brands.includes(b)}
            onChange={() => toggleFilter('brands', b)}
            count={products.filter(p => p.brand === b).length}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range" filterKey="price">
        <div style={{ marginBottom: 8 }}>
          <input type="range" min={0} max={200000} step={1000}
            value={filters.maxPrice}
            onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#878787' }}>
            <span>₹0</span>
            <span style={{ color: '#2874f0', fontWeight: 700 }}>Up to ₹{filters.maxPrice.toLocaleString()}</span>
            <span>₹2L</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Customer Rating" filterKey="rating">
        {[4, 3, 2, 1].map(r => (
          <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 8 }}>
            <input type="radio" name="rating" checked={filters.minRating === r}
              onChange={() => setFilters(f => ({ ...f, minRating: f.minRating === r ? 0 : r }))}
              style={{ accentColor: '#2874f0', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.83rem', color: '#333' }}>
              {'★'.repeat(r)}{'☆'.repeat(4 - r)} & above
            </span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Discount" filterKey="discount">
        {[10, 20, 30, 40].map(d => (
          <label key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 8 }}>
            <input type="radio" name="discount" checked={filters.minDiscount === d}
              onChange={() => setFilters(f => ({ ...f, minDiscount: f.minDiscount === d ? 0 : d }))}
              style={{ accentColor: '#2874f0', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.83rem', color: '#333' }}>{d}% or more</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh' }}>
      <div className="container-fluid py-3 px-3 px-lg-4">
        {/* Breadcrumb */}
        <div style={{ marginBottom: 16, fontSize: '0.8rem', color: '#878787' }}>
          <Link to="/" style={{ color: '#2874f0', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <span>{category || (query ? `Search: "${query}"` : 'All Products')}</span>
        </div>

        {/* Top bar */}
        <div style={{
          background: 'white', borderRadius: 12, padding: '12px 16px',
          marginBottom: 16, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setShowFilters(!showFilters)}
              className="d-lg-none"
              style={{ background: '#f0f5ff', border: 'none', color: '#2874f0', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: '0.85rem' }}>
              <FiFilter size={14} /> Filters
            </button>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.1rem', margin: 0, color: '#212121' }}>
              {category || (query ? `Results for "${query}"` : 'All Products')}
            </h1>
            <span style={{ fontSize: '0.8rem', color: '#878787' }}>({filteredProducts.length} items)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Sort */}
            <select value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
              style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: '8px 12px', fontSize: '0.85rem', fontFamily: 'DM Sans', color: '#333', outline: 'none', cursor: 'pointer' }}>
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="discount">Discount</option>
            </select>
            {/* Grid/List toggle */}
            <div style={{ display: 'flex', gap: 4 }}>
              {[{ icon: FiGrid, val: true }, { icon: FiList, val: false }].map(({ icon: Icon, val }) => (
                <button key={String(val)} onClick={() => setGridView(val)}
                  style={{
                    background: gridView === val ? '#2874f0' : 'transparent',
                    border: `1px solid ${gridView === val ? '#2874f0' : '#e0e0e0'}`,
                    color: gridView === val ? 'white' : '#878787',
                    width: 34, height: 34, borderRadius: 6, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="row g-3">
          {/* Mobile filter drawer */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -320, opacity: 0 }}
                style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 300, background: 'white', zIndex: 1100, overflowY: 'auto', padding: 20, boxShadow: '4px 0 20px rgba(0,0,0,0.15)' }}
                className="d-lg-none"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 800, margin: 0 }}>Filters</h3>
                  <button onClick={() => setShowFilters(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FiX size={22} />
                  </button>
                </div>
                <FilterPanel />
              </motion.div>
            )}
          </AnimatePresence>
          {showFilters && <div className="d-lg-none" onClick={() => setShowFilters(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1099 }} />}

          {/* Desktop sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <FilterPanel />
          </div>

          {/* Products */}
          <div className="col-lg-9">
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                <LoaderSkeleton count={9} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, color: '#212121' }}>No Products Found</h3>
                <p style={{ color: '#878787' }}>Try adjusting your filters or search terms</p>
                <button onClick={() => setFilters({ categories: [], brands: [], minPrice: 0, maxPrice: 200000, minRating: 0, minDiscount: 0, sort: 'popularity' })}
                  className="btn-primary-custom" style={{ marginTop: 12 }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                style={{ display: 'grid', gridTemplateColumns: gridView ? 'repeat(auto-fill, minmax(200px, 1fr))' : '1fr', gap: 16 }}
              >
                <AnimatePresence>
                  {filteredProducts.map((p, i) => (
                    <motion.div key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <ProductCard product={p} compact={gridView} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
