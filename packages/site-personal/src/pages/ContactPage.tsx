import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1.5rem' }}>
      <h1 style={{ fontSize: '2rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
        Contact
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Email</div>
          <a href="mailto:juan.sanchez620@outlook.com" style={{ color: '#fff', fontSize: '0.9rem', wordBreak: 'break-all' }}>juan.sanchez620@outlook.com</a>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>GitHub</div>
          <a href="https://github.com/Rowrow620" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>github.com/Rowrow620 ↗</a>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>LinkedIn</div>
          <a href="https://www.linkedin.com/in/juan-sanchez-b7b276348/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>linkedin.com/in/juan-sanchez ↗</a>
        </div>
      </div>

      {submitted ? (
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '4px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Thank you for your message!</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>I will get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Name</label>
            <input
              required
              id="contact-name"
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--bg-card)',
                border: '1px solid #333',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
          </div>
          <div>
            <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email</label>
            <input
              required
              id="contact-email"
              type="email"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--bg-card)',
                border: '1px solid #333',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
          </div>
          <div>
            <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Message</label>
            <textarea
              required
              id="contact-message"
              rows={5}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--bg-card)',
                border: '1px solid #333',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            Send Message
          </button>
        </form>
      )}
    </section>
  );
};
