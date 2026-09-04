import React from 'react';
import { ContactPage } from './ContactPage';

export const AboutPage: React.FC = () => {
  return (
    <section style={{ maxWidth: '900px', margin: '3rem auto', padding: '0 1.5rem' }}>
      <h1 style={{ fontSize: '2rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>
        About Me
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
        <div>
          <img
            src="/assets/about-sandra.jpg"
            alt="Portrait of Sandra Suh"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          />
        </div>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.25rem' }}>
            Hello! I am Sandra Suh, an artist currently studying Illustration & Animation at California State University, Fullerton (CSUF).
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            I enjoy pushing my limits as an artist and challenging myself with every art project.
          </p>
          <p>
            For inquiries, collaborations, or freelance projects, feel free to reach out via the contact form or directly through email.
          </p>
        </div>
      </div>
      <ContactPage />
    </section>
  );
};
