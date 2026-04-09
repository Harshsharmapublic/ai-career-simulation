import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px',
            background: '#2563eb',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.1rem',
          }}>⚡</div>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: '600',
            fontSize: '1rem',
            color: '#111111',
          }}>AI Career Simulator</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '0' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  color: active ? '#111111' : '#6b7280',
                  fontWeight: active ? '600' : '400',
                  textDecoration: 'none',
                  padding: '6px 18px',
                  fontSize: '0.9rem',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { if (!active) e.target.style.color = '#111111'; }}
                onMouseLeave={e => { if (!active) e.target.style.color = '#6b7280'; }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
