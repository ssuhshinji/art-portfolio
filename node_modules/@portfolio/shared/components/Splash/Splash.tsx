import React, { useState } from 'react';
import type { SiteConfig } from '../../types';
import styles from './Splash.module.css';

interface SplashProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroGradient?: string;
  socialLinks?: SiteConfig['socialLinks'];
  buttonText?: string;
  onEnter?: () => void;
  children: React.ReactNode;
}

export const Splash: React.FC<SplashProps> = ({
  title,
  subtitle,
  heroImage,
  heroGradient = 'linear-gradient(135deg, #1e2638 0%, #303a52 50%, #171b26 100%)',
  socialLinks,
  buttonText = 'ENTER',
  onEnter,
  children
}) => {
  const [entered, setEntered] = useState<boolean>(() => {
    return sessionStorage.getItem('has_entered_portfolio') === 'true';
  });
  const [fading, setFading] = useState<boolean>(false);

  const handleEnter = () => {
    setFading(true);
    setTimeout(() => {
      setEntered(true);
      sessionStorage.setItem('has_entered_portfolio', 'true');
      if (onEnter) onEnter();
    }, 400);
  };

  const internalSocialProps = (href: string) => {
    const internal = href.startsWith('/');
    return {
      target: internal ? undefined : '_blank',
      rel: internal ? undefined : 'noopener noreferrer',
      onClick: internal
        ? () => sessionStorage.setItem('has_entered_portfolio', 'true')
        : undefined
    };
  };

  if (entered) {
    return <>{children}</>;
  }

  const artBackgroundStyle: React.CSSProperties = heroImage
    ? { backgroundImage: `url(${heroImage})` }
    : { background: heroGradient };

  return (
    <div className={`${styles.splashOverlay} ${fading ? styles.fadeOut : ''}`}>
      <div className={styles.container}>
        {/* Featured Artwork Display */}
        <div className={styles.artFrame} style={artBackgroundStyle}>
          {!heroImage && (
            <div className={styles.artPlaceholderText}>
              [Featured Artwork / Hero Image]
            </div>
          )}
          <div className={styles.textOverlay}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <button className={styles.enterButton} onClick={handleEnter}>
              {buttonText}
            </button>
          </div>
        </div>

        {/* Social Icons at the bottom center of the opening page */}
        <div className={styles.socialBar}>
          {socialLinks?.instagram && (
            <a
              href={socialLinks.instagram}
              {...internalSocialProps(socialLinks.instagram)}
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          )}
          {socialLinks?.twitter && (
            <a
              href={socialLinks.twitter}
              {...internalSocialProps(socialLinks.twitter)}
              className={styles.socialIcon}
              aria-label="Twitter / X"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          {socialLinks?.bluesky && (
            <a
              href={socialLinks.bluesky}
              {...internalSocialProps(socialLinks.bluesky)}
              className={styles.socialIcon}
              aria-label="Bluesky"
            >
              <svg width="20" height="20" viewBox="0 0 568 501" fill="currentColor">
                <path d="M123.121 33.664C187.985 82.379 257.438 181.879 284 234.873c26.562-52.994 96.015-152.494 160.879-201.209C491.566 -1.785 568 -22.753 568 62.474c0 17.004-9.757 142.842-15.5 163.344-20.016 71.458-92.935 89.65-158.4 78.583 114.391 19.467 143.5 86.828 80.5 151.781-119.743 123.46-177.301-30.985-188.089-66.273-2.51-8.212-2.511-8.212-5.022 0-10.788 35.288-68.346 189.733-188.089 66.273-63-64.953-33.891-132.314 80.5-151.781C68.435 315.468-4.484 297.276-24.5 225.818 -30.243 205.316-40 79.478-40 62.474c0-85.227 76.434-64.259 123.121-28.81z" />
              </svg>
            </a>
          )}
          {socialLinks?.email && (
            <a
              href={`mailto:${socialLinks.email}`}
              className={styles.socialIcon}
              aria-label="Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
