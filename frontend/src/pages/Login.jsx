import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '0.9rem',
  color: '#111111',
  outline: 'none',
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null); // null | 'loading' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setErrorMsg('Both email and password are required.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Store basic user info in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setErrorMsg(data.message || 'Login failed. Please try again.');
        setStatus('error');
      }
    } catch (_err) {
      setErrorMsg('Could not reach the server. Make sure the backend is running.');
      setStatus('error');
    }
  };

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '3rem 2rem',
      backgroundColor: '#f9fafb',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: '800',
            fontSize: '1.9rem', color: '#111111', marginBottom: '0.4rem',
          }}>Welcome back</h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Sign in to your AI Career Simulator account
          </p>
        </div>

        {/* Error Banner */}
        {status === 'error' && (
          <div style={{
            backgroundColor: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '8px', padding: '0.9rem 1.1rem',
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '1.5rem', color: '#dc2626', fontSize: '0.88rem',
          }}>
            <span>⚠️</span> {errorMsg}
          </div>
        )}

        {/* Form Card */}
        <div style={{
          backgroundColor: '#ffffff', border: '1px solid #e5e7eb',
          borderRadius: '12px', padding: '2.25rem',
          boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>

            {/* Email */}
            <div>
              <label htmlFor="login-email" style={{
                display: 'block', fontSize: '0.75rem', fontWeight: '700',
                color: '#6b7280', letterSpacing: '0.08em',
                textTransform: 'uppercase', marginBottom: '6px',
              }}>Email</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#2563eb')}
                onBlur={e => (e.target.style.borderColor = '#d1d5db')}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label htmlFor="login-password" style={{
                  fontSize: '0.75rem', fontWeight: '700',
                  color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>Password</label>
                <Link to="/forgot-password" style={{
                  fontSize: '0.78rem', color: '#2563eb',
                  textDecoration: 'none', fontWeight: '500',
                }}
                  onMouseEnter={e => (e.target.style.textDecoration = 'underline')}
                  onMouseLeave={e => (e.target.style.textDecoration = 'none')}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{ ...inputStyle, paddingRight: '44px' }}
                  onFocus={e => (e.target.style.borderColor = '#2563eb')}
                  onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '1rem', color: '#9ca3af', padding: 0,
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={status === 'loading'}
              style={{
                backgroundColor: status === 'loading' ? '#93c5fd' : '#2563eb',
                color: '#ffffff', border: 'none',
                padding: '13px', borderRadius: '6px',
                fontWeight: '600', fontSize: '0.95rem',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.15s',
                fontFamily: 'Inter, sans-serif', width: '100%',
                marginTop: '0.25rem',
              }}
              onMouseEnter={e => { if (status !== 'loading') e.target.style.backgroundColor = '#1d4ed8'; }}
              onMouseLeave={e => { if (status !== 'loading') e.target.style.backgroundColor = '#2563eb'; }}
            >
              {status === 'loading' ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
        </div>

        {/* Sign up link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: '#6b7280' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}
            onMouseEnter={e => (e.target.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.target.style.textDecoration = 'none')}
          >
            Create one →
          </Link>
        </p>
      </div>
    </div>
  );
}
