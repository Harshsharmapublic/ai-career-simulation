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

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  username: '',
  password: '',
  confirm_password: '',
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const { first_name, email, phone_number, username, password, confirm_password } = form;
    if (!first_name || !email || !phone_number || !username || !password) {
      setErrorMsg('Please fill in all required fields.');
      setStatus('error');
      return;
    }
    if (password !== confirm_password) {
      setErrorMsg('Passwords do not match.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone_number: form.phone_number,
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setForm(EMPTY_FORM);
        setTimeout(() => setStatus(null), 6000);
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg('Could not reach the server. Make sure the backend is running.');
      setStatus('error');
    }
  };

  const fields = [
    { name: 'first_name',       label: 'First Name',      icon: '👤', placeholder: 'e.g. Jane',        type: 'text',     required: true  },
    { name: 'last_name',        label: 'Last Name',        icon: '👤', placeholder: 'e.g. Doe',          type: 'text',     required: false },
    { name: 'email',            label: 'Email',            icon: '✉️', placeholder: 'jane@example.com',  type: 'email',    required: true  },
    { name: 'phone_number',     label: 'Phone Number',     icon: '📞', placeholder: '+91 9876543210',    type: 'tel',      required: true  },
    { name: 'username',         label: 'Username',         icon: '🔖', placeholder: 'e.g. jane_doe42',   type: 'text',     required: true  },
    { name: 'password',         label: 'Password',         icon: '🔒', placeholder: 'Create a password', type: 'password', required: true  },
    { name: 'confirm_password', label: 'Confirm Password', icon: '🔒', placeholder: 'Repeat password',   type: 'password', required: true  },
  ];

  return (
    <div style={{ padding: '5rem 2rem', backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#2563eb', marginBottom: '0.75rem',
          }}>Early Access</p>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: '800',
            fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#111111', marginBottom: '0.75rem',
          }}>Join the Waitlist</h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.65' }}>
            Be the first to get your personalized AI career roadmap. Sign up below and we'll reach out when you're ready to start.
          </p>
        </div>

        {/* ── Success Banner ── */}
        {status === 'success' && (
          <div style={{
            backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '8px', padding: '1rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '1.5rem', color: '#16a34a', fontSize: '0.9rem',
          }}>
            <span>✅</span> You're on the list! We'll be in touch soon.
          </div>
        )}

        {/* ── Error Banner ── */}
        {status === 'error' && (
          <div style={{
            backgroundColor: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '8px', padding: '1rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '1.5rem', color: '#dc2626', fontSize: '0.9rem',
          }}>
            <span>⚠️</span> {errorMsg}
          </div>
        )}

        {/* ── Form Card ── */}
        <div style={{
          border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2.5rem',
          backgroundColor: '#ffffff', boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>

            {fields.map(({ name, label, icon, placeholder, type, required }) => {
              const isPassword = type === 'password';
              const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;
              return (
                <div key={name}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{icon}</span>
                    <label htmlFor={name} style={{
                      fontSize: '0.75rem', fontWeight: '700', color: '#6b7280',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                      {label}{required && <span style={{ color: '#dc2626', marginLeft: '2px' }}>*</span>}
                    </label>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      id={name}
                      type={resolvedType}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      style={{ ...inputStyle, paddingRight: isPassword ? '44px' : inputStyle.padding }}
                      onFocus={e => (e.target.style.borderColor = '#2563eb')}
                      onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                    />
                    {isPassword && (
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
                    )}
                  </div>
                </div>
              );
            })}

            <button
              id="waitlist-submit"
              type="submit"
              disabled={status === 'loading'}
              style={{
                backgroundColor: status === 'loading' ? '#93c5fd' : '#2563eb',
                color: '#ffffff',
                border: 'none', padding: '13px 24px',
                borderRadius: '6px', fontWeight: '600', fontSize: '0.95rem',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.15s',
                fontFamily: 'Inter, sans-serif', width: '100%',
                marginTop: '0.25rem',
              }}
              onMouseEnter={e => { if (status !== 'loading') e.target.style.backgroundColor = '#1d4ed8'; }}
              onMouseLeave={e => { if (status !== 'loading') e.target.style.backgroundColor = '#2563eb'; }}
            >
              {status === 'loading' ? 'Submitting…' : 'Join Waitlist →'}
            </button>

            <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.78rem', margin: 0 }}>
              * Required fields. We'll never share your data.
            </p>
          </form>
        </div>

        {/* Sign in link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: '#6b7280' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}
            onMouseEnter={e => (e.target.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.target.style.textDecoration = 'none')}
          >
            Sign In →
          </Link>
        </p>
      </div>
    </div>
  );
}
