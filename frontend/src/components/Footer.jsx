export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      padding: '1.5rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
          © 2026 AI Career Simulator. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy', 'Terms', 'Support'].map(label => (
            <a
              key={label}
              href="#"
              style={{ fontSize: '0.85rem', color: '#6b7280', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = '#111111'}
              onMouseLeave={e => e.target.style.color = '#6b7280'}
            >{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
