export default function RoadmapStep({ week, topics, isLast }) {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
      {/* Timeline line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '44px', height: '44px',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: '700',
          fontSize: '0.8rem',
          color: 'white',
          flexShrink: 0,
          boxShadow: '0 0 20px rgba(59,130,246,0.3)',
        }}>W{week}</div>
        {!isLast && (
          <div style={{
            width: '2px',
            flex: 1,
            minHeight: '40px',
            background: 'linear-gradient(to bottom, rgba(59,130,246,0.5), transparent)',
            margin: '6px 0',
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
        padding: '1.2rem 1.5rem',
        flex: 1,
        marginBottom: isLast ? '0' : '0.5rem',
      }}>
        <h4 style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: '600',
          color: '#e6edf3',
          marginBottom: '0.4rem',
          fontSize: '1rem',
        }}>Week {week}</h4>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{topics}</p>
      </div>
    </div>
  );
}
