import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteConfig } from '../config';
import styles from './ProjectDetailPage.module.css';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentIndex = siteConfig.projects.findIndex((p) => p.id === id);
  const project = siteConfig.projects[currentIndex];

  if (!project) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Project Not Found</h2>
        <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const prevIndex = (currentIndex - 1 + siteConfig.projects.length) % siteConfig.projects.length;
  const nextIndex = (currentIndex + 1) % siteConfig.projects.length;
  const prevProject = siteConfig.projects[prevIndex];
  const nextProject = siteConfig.projects[nextIndex];

  return (
    <article className={styles.container}>
      <div className={styles.backNav}>
        <Link to="/" className={styles.backLink}>
          ← Back to All Projects
        </Link>
      </div>

      <header className={styles.headerSection}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.metaRow}>
            <span className={styles.categoryTag}>{project.category.replace('-', ' ')}</span>
            {project.role && <span>• {project.role}</span>}
            {project.period && <span>• {project.period}</span>}
          </div>
        </div>

        <div className={styles.actions}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionBtn} ${styles.primaryBtn}`}
            >
              Live Demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionBtn} ${styles.secondaryBtn}`}
            >
              GitHub Repo ↗
            </a>
          )}
        </div>
      </header>

      {project.tags && project.tags.length > 0 && (
        <div className={styles.tagContainer}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {project.status && (
        <aside className={styles.statusNotice} aria-label="Development status">
          <strong>{project.status}</strong>
          {project.statusNote && <p>{project.statusNote}</p>}
        </aside>
      )}

      {/* Keep recorded demos readable instead of cropping them into a backdrop. */}
      {project.image && project.imagePresentation === 'demo' ? (
        <figure className={styles.demoMedia}>
          <img
            src={project.image}
            alt={project.imageAlt || `${project.title} demo`}
            style={{ aspectRatio: project.aspectRatio }}
          />
          <figcaption>{project.title} — recorded application demo</figcaption>
        </figure>
      ) : (
        <div
          className={styles.banner}
          style={{
            background: project.image
              ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('${project.image}') center/cover no-repeat`
              : project.gradient || 'linear-gradient(135deg, #111, #222)'
          }}
        >
          <div className={styles.bannerBadge}>{project.title}</div>
          <div className={styles.bannerSubtitle}>[ Architecture & System Overview ]</div>
        </div>
      )}

      {/* Metrics / Stats Grid */}
      {project.stats && project.stats.length > 0 && (
        <div className={styles.statsGrid}>
          {project.stats.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Overview */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionHeading}>Project Overview</h2>
        <p className={styles.summaryText}>
          {project.summary ||
            `A deep dive into the engineering, architecture, and deployment strategy for ${project.title}.`}
        </p>
      </section>

      {project.openSource && (
        <section className={styles.contentSection} aria-labelledby="open-source-heading">
          <h2 id="open-source-heading" className={styles.sectionHeading}>Ownership & Open Source</h2>
          <p className={styles.summaryText}>{project.openSource.summary}</p>
          <ul className={styles.highlightsList}>
            {project.openSource.practices.map((practice) => (
              <li key={practice} className={styles.highlightItem}>{practice}</li>
            ))}
          </ul>
          <div className={styles.resourceLinks}>
            {project.openSource.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resourceLink}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Key Highlights & Challenges Solved */}
      {project.highlights && project.highlights.length > 0 && (
        <section className={styles.contentSection}>
          <h2 className={styles.sectionHeading}>Highlights</h2>
          <ul className={styles.highlightsList}>
            {project.highlights.map((highlight, index) => (
              <li key={index} className={styles.highlightItem}>
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* System Architecture */}
      {project.architecture && (
        <section className={styles.contentSection}>
          <h2 className={styles.sectionHeading}>System Architecture</h2>
          <p className={styles.summaryText}>{project.architecture}</p>
        </section>
      )}

      {/* Next / Previous Project Navigation */}
      <footer className={styles.footerNav}>
        <Link to={prevProject.path} className={styles.navProjectLink}>
          <span className={styles.navDirection}>← Previous Project</span>
          <span className={styles.navTargetTitle}>{prevProject.title}</span>
        </Link>
        <Link
          to={nextProject.path}
          className={styles.navProjectLink}
          style={{ textAlign: 'right' }}
        >
          <span className={styles.navDirection}>Next Project →</span>
          <span className={styles.navTargetTitle}>{nextProject.title}</span>
        </Link>
      </footer>
    </article>
  );
};
