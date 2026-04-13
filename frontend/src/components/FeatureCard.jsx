export default function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '2rem',
      transition: 'all 0.3s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.border = '1px solid rgba(59,130,246,0.4)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(59,130,246,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        fontSize: '2rem',
        marginBottom: '1rem',
        width: '52px', height: '52px',
        background: 'rgba(249,115,22,0.12)',
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <h3 style={{
        fontFamily: 'Outfit, sans-serif',
        fontWeight: '600',
        fontSize: '1.1rem',
        color: '#e6edf3',
        marginBottom: '0.6rem',
      }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.65' }}>{description}</p>
    </div>
  );
}
