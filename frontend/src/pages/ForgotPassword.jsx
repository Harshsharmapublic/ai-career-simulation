import { useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
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
          }}>Forgot Password?</h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Success State */}
        {status === 'success' ? (
          <div style={{
            backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '12px', padding: '2rem', textAlign: 'center',
            boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📬</div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700',
              fontSize: '1.15rem', color: '#111111', marginBottom: '0.5rem',
            }}>Check your inbox</h2>
            <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              If an account exists for <strong>{email}</strong>, a password reset link has been sent.
            </p>
            <Link to="/login" style={{
              display: 'inline-block', backgroundColor: '#2563eb', color: '#ffffff',
              padding: '10px 20px', borderRadius: '6px', fontWeight: '600',
              fontSize: '0.88rem', textDecoration: 'none',
            }}>
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
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
                <div>
                  <label htmlFor="forgot-email" style={{
                    display: 'block', fontSize: '0.75rem', fontWeight: '700',
                    color: '#6b7280', letterSpacing: '0.08em',
                    textTransform: 'uppercase', marginBottom: '6px',
                  }}>Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#2563eb')}
                    onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                  />
                </div>

                <button
                  id="forgot-submit"
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
                  }}
                  onMouseEnter={e => { if (status !== 'loading') e.target.style.backgroundColor = '#1d4ed8'; }}
                  onMouseLeave={e => { if (status !== 'loading') e.target.style.backgroundColor = '#2563eb'; }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Reset Link →'}
                </button>
              </form>
            </div>

            {/* Back link */}
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: '#6b7280' }}>
              Remember it?{' '}
              <Link to="/login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}
                onMouseEnter={e => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={e => (e.target.style.textDecoration = 'none')}
              >
                Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
