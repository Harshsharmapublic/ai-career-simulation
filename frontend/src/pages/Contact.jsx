import { useState } from 'react';

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
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div style={{ padding: '5rem 2rem', backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: '800',
            fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#111111', marginBottom: '0.75rem',
          }}>Get In Touch</h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.65' }}>
            Have questions about the AI Career Simulator? We'd love to hear from you.
          </p>
        </div>

        {/* Success banner */}
        {submitted && (
          <div style={{
            backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '8px', padding: '1rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '1.5rem', color: '#16a34a', fontSize: '0.9rem',
          }}>
            <span>✅</span> Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {/* Form card */}
        <div style={{
          border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2.5rem',
          backgroundColor: '#ffffff',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Name */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>👤</span>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Name
                </label>
              </div>
              <input
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Your full name" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {/* Email */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>✉️</span>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Email
                </label>
              </div>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="your.email@example.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {/* Message */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>💬</span>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Message
                </label>
              </div>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us what's on your mind..." rows={5}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '130px', lineHeight: '1.6' }}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#2563eb', color: '#ffffff',
                border: 'none', padding: '12px 24px',
                borderRadius: '6px', fontWeight: '600', fontSize: '0.9rem',
                cursor: 'pointer', transition: 'background-color 0.15s',
                fontFamily: 'Inter, sans-serif', width: '100%',
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={e => e.target.style.backgroundColor = '#2563eb'}
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
