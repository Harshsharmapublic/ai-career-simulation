import { useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🐙',
    color: '#2563eb',
    title: 'GitHub Skill Analysis',
    description: 'Connect your GitHub profile to automatically detect your programming languages and map your current skill level.',
  },
  {
    icon: '⚡',
    color: '#f97316',
    title: 'AI Career Roadmap',
    description: 'Get a personalized, week-by-week roadmap based on your current skills and your target role in tech.',
  },
  {
    icon: '🎯',
    color: '#2563eb',
    title: 'Skill Gap Challenges',
    description: 'Receive targeted coding challenges and projects that address the exact gaps between where you are and where you want to be.',
  },
];

const roadmapData = [
  {
    week: 1,
    title: 'HTML & CSS Foundations',
    description: 'Master the core building blocks of the web. Learn semantic HTML, CSS layouts with Flexbox and Grid, and responsive design principles.',
    tag: 'CORE',
    tagColor: '#2563eb',
  },
  {
    week: 2,
    title: 'JavaScript Fundamentals',
    description: 'Dive into JavaScript essentials. Variables, functions, arrays, objects, and DOM manipulation. Build interactive web experiences.',
    tag: 'CORE',
    tagColor: '#f97316',
  },
  {
    week: 3,
    title: 'React Basics',
    description: 'Introduction to React library. Learn components, props, state, and hooks. Build your first single-page application.',
    tag: 'FRAMEWORK',
    tagColor: '#111111',
  },
];

const interests = [
  'Choose one...',
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Data Science / ML',
  'DevOps / Cloud',
  'Mobile Development',
  'Cybersecurity',
];

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '0.88rem',
  color: '#111111',
  outline: 'none',
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.15s',
};

export default function Home() {
  const [role, setRole] = useState('');
  const [interest, setInterest] = useState('Choose one...');
  const [generated, setGenerated] = useState(false);
  const [simStatus, setSimStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [simError, setSimError]   = useState('');

  const handleGenerate = async () => {
    if (!role.trim()) {
      alert('Please enter a target role first.');
      return;
    }
    if (interest === 'Choose one...') {
      alert('Please select an interest area.');
      return;
    }

    setSimStatus('loading');
    setSimError('');

    try {
      await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, interest }),
      });
      // Show roadmap regardless of server response
      setGenerated(true);
      setSimStatus('success');
    } catch (_err) {
      // Backend offline — still show sample roadmap locally
      setSimError('Backend offline — showing sample roadmap.');
      setGenerated(true);
      setSimStatus('error');
    }

    setTimeout(() => {
      document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  return (
    <div>
      {/* ─── Hero ─── */}
      <section style={{
        padding: '5rem 2rem 4rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap',
          gap: '3rem', alignItems: 'center',
        }}>
          {/* Left */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            <p style={{
              fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#6b7280', marginBottom: '1rem',
            }}>AI-POWERED ROADMAPS</p>

            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '800',
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              lineHeight: '1.1',
              color: '#111111',
              marginBottom: '1.25rem',
            }}>
              Simulate Your Tech<br />Career Journey
            </h1>

            <p style={{
              color: '#6b7280', fontSize: '1rem', lineHeight: '1.65',
              marginBottom: '2rem', maxWidth: '420px',
            }}>
              Connect your skills, set your goal, and get a personalized AI roadmap
            </p>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                backgroundColor: '#2563eb', color: '#ffffff',
                padding: '11px 24px', borderRadius: '6px',
                textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Get Started →
            </Link>
          </div>

          {/* Right: Quick Simulator widget */}
          <div style={{
            flex: '0 1 340px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            padding: '1.75rem',
            backgroundColor: '#ffffff',
          }}>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700',
              fontSize: '1.05rem', color: '#111111', marginBottom: '1.25rem',
            }}>Quick Simulator</h3>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                Target Role
              </label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Backend Developer"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                Select Interest
              </label>
              <select
                value={interest}
                onChange={e => setInterest(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {interests.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <button
              id="generate-roadmap"
              onClick={handleGenerate}
              disabled={simStatus === 'loading'}
              style={{
                width: '100%', padding: '11px',
                backgroundColor: simStatus === 'loading' ? '#6b7280' : '#111111',
                color: '#ffffff',
                border: 'none', borderRadius: '6px',
                fontWeight: '600', fontSize: '0.9rem',
                cursor: simStatus === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.15s',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => { if (simStatus !== 'loading') e.target.style.backgroundColor = '#374151'; }}
              onMouseLeave={e => { if (simStatus !== 'loading') e.target.style.backgroundColor = '#111111'; }}
            >
              {simStatus === 'loading' ? 'Generating…' : 'Generate Roadmap'}
            </button>

            {simStatus === 'success' && generated && (
              <p style={{ fontSize: '0.8rem', color: '#16a34a', marginTop: '10px', textAlign: 'center' }}>
                ✓ Roadmap ready for "{role}" › {interest}
              </p>
            )}
            {simStatus === 'error' && (
              <p style={{ fontSize: '0.78rem', color: '#f97316', marginTop: '10px', textAlign: 'center' }}>
                ⚠ {simError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: '800',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#111111', marginBottom: '0.6rem',
            }}>What We Offer</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
              Everything you need to plan and launch your tech career
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {features.map(({ icon, color, title, description }) => (
              <div key={title} style={{
                backgroundColor: '#ffffff', border: '1px solid #e5e7eb',
                borderRadius: '10px', padding: '2rem',
                transition: 'box-shadow 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '8px',
                  backgroundColor: color, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.2rem', marginBottom: '1rem',
                }}>{icon}</div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700', color: '#111111', marginBottom: '0.5rem', fontSize: '1rem' }}>
                  {title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: '1.65' }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Roadmap Timeline ─── */}
      <section id="roadmap-section" style={{ padding: '5rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            {generated && role && (
              <p style={{ fontSize: '0.75rem', color: '#f97316', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Roadmap for: {role}
              </p>
            )}
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: '800',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#111111',
            }}>
              {generated && role ? 'Your Personalized Roadmap' : 'Sample Roadmap'}
            </h2>
          </div>

          {/* Center timeline */}
          <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '50%', top: '24px', bottom: '24px',
              width: '2px', backgroundColor: '#e5e7eb', transform: 'translateX(-50%)',
            }} />

            {roadmapData.map((item, i) => (
              <div key={item.week} style={{
                display: 'flex', justifyContent: 'flex-end',
                alignItems: 'flex-start', gap: '1.5rem',
                marginBottom: i < roadmapData.length - 1 ? '2rem' : '0',
                position: 'relative',
              }}>
                {/* Spacer left */}
                <div style={{ flex: 1 }} />

                {/* Number badge (centered on line) */}
                <div style={{
                  position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                  width: '40px', height: '40px',
                  backgroundColor: '#111111', color: '#ffffff',
                  borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700', fontSize: '0.85rem',
                  zIndex: 1,
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 0 2px #e5e7eb',
                }}>
                  {String(item.week).padStart(2, '0')}
                </div>

                {/* Card (right side) */}
                <div style={{
                  flex: 1,
                  border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  marginLeft: '2.5rem',
                  transition: 'box-shadow 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 10px', borderRadius: '4px',
                    backgroundColor: i === 1 ? '#fff7ed' : '#f0f9ff',
                    border: `1px solid ${i === 1 ? '#fed7aa' : '#bfdbfe'}`,
                    color: i === 1 ? '#f97316' : '#2563eb',
                    fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.08em',
                    marginBottom: '0.6rem', textTransform: 'uppercase',
                  }}>WEEK {item.week}</span>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700',
                    color: '#111111', fontSize: '1.05rem', marginBottom: '0.5rem',
                  }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.87rem', lineHeight: '1.65', marginBottom: '0.75rem' }}>
                    {item.description}
                  </p>
                  <span style={{
                    display: 'inline-block', padding: '3px 10px',
                    border: `1px solid ${item.tagColor === '#111111' ? '#d1d5db' : item.tagColor === '#f97316' ? '#fed7aa' : '#bfdbfe'}`,
                    borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600',
                    letterSpacing: '0.08em', color: item.tagColor, textTransform: 'uppercase',
                    backgroundColor: item.tagColor === '#111111' ? '#f9fafb' : 'transparent',
                  }}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
