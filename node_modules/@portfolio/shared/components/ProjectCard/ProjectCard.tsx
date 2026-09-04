import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ProjectData } from '../../types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: ProjectData;
  showOverlay?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, showOverlay = true }) => {
  const location = useLocation();
  const [isContentRevealed, setIsContentRevealed] = useState(false);
  const sizeClass = styles[project.size] || styles.medium;
  const isContentHidden = Boolean(project.contentWarning) && !isContentRevealed;

  const isPlaceholder =
    !project.title ||
    project.title.toLowerCase().includes('placeholder') ||
    project.title.startsWith('[');
  const shouldShowOverlay = Boolean(project.overlayLabel) || (showOverlay && !isPlaceholder);

  const wrapStyle: React.CSSProperties = {
    ...(project.aspectRatio ? { aspectRatio: project.aspectRatio } : {}),
    ...(project.maxWidth ? { maxWidth: project.maxWidth } : {})
  };

  const imgStyle: React.CSSProperties = {
    ...(project.objectFit ? { objectFit: project.objectFit } : {})
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isContentHidden) {
      e.preventDefault();
      setIsContentRevealed(true);
      return;
    }

    const imgEl = e.currentTarget.querySelector('img');
    if (imgEl) {
      const rect = imgEl.getBoundingClientRect();
      sessionStorage.setItem(
        'last_card_rect',
        JSON.stringify({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        })
      );
    }
  };

  return (
    <Link
      to={project.path}
      state={{ backgroundLocation: location }}
      onClick={handleClick}
      className={`${styles.card} ${sizeClass}`}
    >
      <div className={styles.imageWrap} style={wrapStyle}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt || project.title || 'Artwork'}
            className={`${styles.image} ${isContentHidden ? styles.sensitiveImage : ''}`}
            style={imgStyle}
          />
        ) : (
          <div
            className={styles.gradientBg}
            style={{ background: project.gradient || 'linear-gradient(135deg, #2a2a2a, #444)' }}
          />
        )}

        {shouldShowOverlay && (
          <div className={`${styles.overlay} ${project.overlayLabel ? styles.sectionOverlay : ''}`}>
            <h3 className={styles.title}>
              {project.overlayLabel ? (
                project.overlayLabel
              ) : (
                <>PROJECT:<br />{project.title}</>
              )}
            </h3>
            {!project.overlayLabel && project.summary && (
              <p className={styles.summary}>{project.summary}</p>
            )}
            {!project.overlayLabel && project.tags && project.tags.length > 0 && (
              <div className={styles.tagList}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tagBadge}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {isContentHidden && (
          <span className={styles.contentWarning} role="note">
            <strong>{project.contentWarning}</strong>
            <span>Click to reveal</span>
          </span>
        )}
      </div>
      {project.status && <span className={styles.statusBadge}>{project.status}</span>}
    </Link>
  );
};
