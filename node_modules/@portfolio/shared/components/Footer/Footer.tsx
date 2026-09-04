import React from 'react';
import type { SiteConfig } from '../../types';
import styles from './Footer.module.css';

interface FooterProps {
  config: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const { socialLinks, name } = config;
  const externalProps = (href: string) => href.startsWith('/')
    ? {}
    : { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        {socialLinks?.instagram && (
          <a
            href={socialLinks.instagram}
            {...externalProps(socialLinks.instagram)}
            className={styles.iconLink}
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
            {...externalProps(socialLinks.twitter)}
            className={styles.iconLink}
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
            {...externalProps(socialLinks.bluesky)}
            className={styles.iconLink}
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
            className={styles.iconLink}
            aria-label="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        )}
        {socialLinks?.github && (
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        )}
        {socialLinks?.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        )}
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} {name}. All rights reserved.
      </p>
    </footer>
  );
};
