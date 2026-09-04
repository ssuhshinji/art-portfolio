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
      {submitted ? (
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '4px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Thank you for your message!</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>I will respond shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Name</label>
            <input
              required
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
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email</label>
            <input
              required
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
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Message</label>
            <textarea
              required
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
