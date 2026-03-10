export default function LoaderSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <div className="skeleton" style={{ height: 200 }} />
          <div style={{ padding: 14 }}>
            <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 14, width: '90%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: 12 }} />
            <div className="skeleton" style={{ height: 20, width: '50%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 36, width: '100%', borderRadius: 8 }} />
          </div>
        </div>
      ))}
    </>
  );
}
