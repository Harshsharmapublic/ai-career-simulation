import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Re-check sessionStorage whenever the route changes
  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    setLoggedInUser(stored ? JSON.parse(stored) : null);
  }, [location.pathname]);

  const handleSignOut = () => {
    sessionStorage.removeItem('user');
    setLoggedInUser(null);
    navigate('/');
  };

  const navLinks = [['/', 'Home'], ['/about', 'About'], ['/contact', 'Contact']];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', height: '60px',
      }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: '700', fontSize: '1.05rem', color: '#111111',
          }}>AI Career Simulator</span>
        </Link>

        {/* ── Nav Links ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {navLinks.map(([to, label]) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to} to={to}
                style={{
                  color: active ? '#111111' : '#6b7280',
                  fontWeight: active ? '600' : '400',
                  textDecoration: 'none',
                  padding: '6px 16px',
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

        {/* ── Auth Buttons ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {loggedInUser ? (
            <>
              <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                👋 <strong style={{ color: '#111111' }}>{loggedInUser.first_name}</strong>
              </span>
              <button
                id="sign-out-btn"
                onClick={handleSignOut}
                style={{
                  backgroundColor: 'transparent', color: '#6b7280',
                  border: '1px solid #d1d5db', padding: '6px 14px',
                  borderRadius: '6px', fontWeight: '500', fontSize: '0.85rem',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.target.style.borderColor = '#111111'; e.target.style.color = '#111111'; }}
                onMouseLeave={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.color = '#6b7280'; }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                id="nav-signin"
                to="/login"
                style={{
                  color: '#6b7280', fontWeight: '500',
                  textDecoration: 'none', padding: '6px 14px',
                  border: '1px solid transparent',
                  borderRadius: '6px', fontSize: '0.88rem',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.target.style.color = '#111111')}
                onMouseLeave={e => (e.target.style.color = '#6b7280')}
              >
                Sign In
              </Link>
              <Link
                id="nav-signup"
                to="/register"
                style={{
                  backgroundColor: '#2563eb', color: '#ffffff',
                  textDecoration: 'none', padding: '7px 16px',
                  borderRadius: '6px', fontWeight: '600', fontSize: '0.88rem',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={e => (e.target.style.backgroundColor = '#1d4ed8')}
                onMouseLeave={e => (e.target.style.backgroundColor = '#2563eb')}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
