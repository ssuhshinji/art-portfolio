import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactPage } from './ContactPage';
import styles from './ComingSoonPage.module.css';

export const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.page} aria-labelledby="coming-soon-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>SOCIALS</p>
        <h2 id="coming-soon-title" className={styles.title}>Coming Soon!</h2>
        <p className={styles.message}>This social page is still being prepared.</p>
        <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
          Back to portfolio
        </button>
      </div>
      <ContactPage />
    </section>
  );
};
