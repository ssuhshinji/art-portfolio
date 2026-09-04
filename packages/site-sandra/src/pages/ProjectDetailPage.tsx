import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { siteConfig } from '../config';
import styles from './ProjectDetailPage.module.css';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExiting, setIsExiting] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<{ dx: number; dy: number; sx: number; sy: number } | null>(null);

  const currentIndex = siteConfig.projects.findIndex((p) => p.id === id);
  const project = siteConfig.projects[currentIndex] || siteConfig.projects[0];

  const prevIndex = (currentIndex - 1 + siteConfig.projects.length) % siteConfig.projects.length;
  const nextIndex = (currentIndex + 1) % siteConfig.projects.length;

  const prevProject = siteConfig.projects[prevIndex];
  const nextProject = siteConfig.projects[nextIndex];

  const bgState = location.state as { backgroundLocation?: Location } | undefined;
  const targetReturnPath = bgState?.backgroundLocation?.pathname || '/';

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('last_card_rect');
    };
  }, []);

  const handleImageLoad = () => {
    const stored = sessionStorage.getItem('last_card_rect');
    if (stored && wrapRef.current) {
      try {
        const startRect = JSON.parse(stored);
        const targetRect = wrapRef.current.getBoundingClientRect();

        if (targetRect.width > 0 && targetRect.height > 0) {
          const dx = startRect.left - targetRect.left;
          const dy = startRect.top - targetRect.top;
          const sx = startRect.width / targetRect.width;
          const sy = startRect.height / targetRect.height;

          transformRef.current = { dx, dy, sx, sy };

          const el = wrapRef.current;
          el.style.animation = 'none';
          el.style.transformOrigin = 'top left';
          el.style.transition = 'none';
          el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.style.transition = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease';
              el.style.transform = 'translate(0px, 0px) scale(1, 1)';
            });
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleBack = () => {
    if (isExiting) return;
    setIsExiting(true);

    if (wrapRef.current) {
      const el = wrapRef.current;
      if (transformRef.current) {
        el.style.transformOrigin = 'top left';
        el.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease';
        el.style.transform = `translate(${transformRef.current.dx}px, ${transformRef.current.dy}px) scale(${transformRef.current.sx}, ${transformRef.current.sy})`;
        el.style.opacity = '0';
      } else {
        el.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease';
        el.style.transform = 'scale(0.85)';
        el.style.opacity = '0';
      }
    }

    setTimeout(() => {
      sessionStorage.removeItem('last_card_rect');
      navigate(targetReturnPath, { replace: true });
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate(`/project/${prevProject.id}`, { state: bgState });
      } else if (e.key === 'ArrowRight') {
        navigate(`/project/${nextProject.id}`, { state: bgState });
      } else if (e.key === 'Escape') {
        handleBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevProject.id, nextProject.id, navigate, isExiting, bgState]);

  if (!project) return null;

  const rawTitle = project.image?.split('/').pop()?.split('.')[0] || 'artwork';
  const altText = project.imageAlt || (project.title && !project.title.startsWith('[') ? project.title : rawTitle);

  return (
    <div
      className={isExiting ? styles.viewerOverlayExiting : styles.viewerOverlay}
      style={isExiting ? { pointerEvents: 'none' } : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleBack();
      }}
    >
      <button className={styles.backButton} onClick={handleBack}>
        ← back
      </button>

      <div className={styles.stage}>
        <div
          className={styles.sideClickLeft}
          title="Previous Artwork"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/project/${prevProject.id}`, { state: bgState });
          }}
        />
        <div
          className={styles.sideClickRight}
          title="Next Artwork"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/project/${nextProject.id}`, { state: bgState });
          }}
        />

        <div
          ref={wrapRef}
          key={project.id}
          className={styles.artworkWrap}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={project.image}
            alt={altText}
            className={styles.maxArtwork}
            onLoad={handleImageLoad}
          />
        </div>
      </div>

      <div className={styles.navRow} onClick={(e) => e.stopPropagation()}>
        <Link to={`/project/${prevProject.id}`} state={bgState} className={styles.navLink}>
          prev
        </Link>
        <span className={styles.navDivider}>/</span>
        <Link to={`/project/${nextProject.id}`} state={bgState} className={styles.navLink}>
          next
        </Link>
      </div>
    </div>
  );
};
