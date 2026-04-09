const visionItems = [
  {
    icon: '🎯',
    iconBg: '#2563eb',
    title: 'Our Vision',
    description:
      'The AI Career Simulator is designed to help students and aspiring developers navigate their career paths with clarity and confidence. We believe that career planning should be data-driven, personalized, and accessible to everyone.',
  },
  {
    icon: '⚡',
    iconBg: '#f97316',
    title: 'Why This Matters',
    description:
      'The tech industry evolves rapidly, and career paths are no longer linear. Traditional education often fails to prepare students for the dynamic nature of modern software development roles.',
  },
];

const stats = [
  { value: '500+', label: 'Career Paths Mapped' },
  { value: '50+', label: 'Tech Roles Covered' },
  { value: '8 Weeks', label: 'Avg Roadmap Length' },
  { value: '100%', label: 'Free to Use' },
];

export default function About() {
  return (
    <div>
      {/* ─── Hero with image ─── */}
      <section style={{
        position: 'relative', height: '340px', overflow: 'hidden',
        backgroundColor: '#111111',
        display: 'flex', alignItems: 'flex-end',
      }}>
        {/* Background image overlay — architectural pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop&q=60")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.45,
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)',
        }} />
        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 2.5rem', width: '100%' }}>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: '800',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: '#ffffff',
            lineHeight: '1.1',
          }}>About This Project</h1>
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <section style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {stats.map(({ value, label }, i) => (
              <div key={label} style={{
                padding: '1.75rem 1.5rem', textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid #e5e7eb' : 'none',
              }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: '800',
                  fontSize: '1.75rem', color: '#111111', marginBottom: '4px',
                }}>{value}</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Description ─── */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.75rem' }}>
              What This Project Does
            </p>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: '800',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#111111', marginBottom: '1rem',
            }}>Built to help students navigate the tech industry</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.75', fontSize: '0.95rem' }}>
              This project helps students simulate their career path using AI concepts like roadmap generation
              and skill analysis. By understanding where you are and where you want to go, we generate a clear,
              structured learning plan tailored specifically to you.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'Analyzes your GitHub repositories to detect your current skill set',
              'Maps skill gaps between where you are and where you want to be',
              'Generates a structured, week-by-week learning roadmap',
              'Provides coding challenges tailored to your specific gaps',
              'Tracks your progress and adapts the roadmap as you grow',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  backgroundColor: '#2563eb', color: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: '700', flexShrink: 0, marginTop: '2px',
                }}>✓</div>
                <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: '1.6' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vision + Why This Matters ─── */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {visionItems.map(({ icon, iconBg, title, description }) => (
              <div key={title}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '8px',
                    backgroundColor: iconBg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.1rem',
                  }}>{icon}</div>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700',
                    fontSize: '1.15rem', color: '#111111',
                  }}>{title}</h3>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.75' }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
