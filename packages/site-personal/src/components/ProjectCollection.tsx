import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectData } from '@portfolio/shared';
import styles from './ProjectCollection.module.css';

const overviewTitles: Record<string, string> = {
  anvilmesh: 'Distributed CPU + GPU compute',
  traceforge: 'Low-overhead runtime tracing',
  'unlimited-lob': 'Custom agent hiring'
};

const categoryLabels: Record<string, string> = {
  systems: 'Systems & infrastructure',
  tools: 'Tools & visualizers',
  mods: 'Game mods'
};

const CollectionCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const [failedImage, setFailedImage] = useState<string>();
  // Existing placeholder URLs are not application captures.
  const image = project.image && !/^https?:\/\/placehold\.co(?:\/|$)/i.test(project.image)
    ? project.image
    : undefined;
  const showImage = image && failedImage !== image;
  const isDemo = project.imagePresentation === 'demo' || /\.gif(?:[?#]|$)/i.test(image || '');
  const titleId = `featured-${project.id}-title`;
  const summaryId = `featured-${project.id}-summary`;

  return (
    <Link
      to={project.path}
      className={styles.card}
      aria-labelledby={titleId}
      aria-describedby={project.summary ? summaryId : undefined}
    >
      <div className={styles.preview}>
        {showImage ? (
          <img
            src={image}
            alt={project.imageAlt || `${project.title} ${isDemo ? 'application demo' : 'project preview'}`}
            className={styles.previewImage}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailedImage(image)}
          />
        ) : (
          <div className={styles.overviewPreview} style={{ backgroundImage: project.gradient }}>
            <span className={styles.overviewLabel}>
              {failedImage ? 'Preview unavailable' : 'Project overview'}
            </span>
            <strong className={styles.overviewTitle}>
              {overviewTitles[project.id] || project.title}
            </strong>
            <span className={styles.overviewStack}>{project.tags?.slice(0, 3).join(' / ')}</span>
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.metadata}>
          <span className={styles.category}>
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            {categoryLabels[project.category] || project.category}
          </span>
          {project.status && <span className={styles.status}>{project.status}</span>}
        </div>
        <h3 id={titleId} className={styles.projectTitle}>
          {project.title}
          <span className={styles.arrow} aria-hidden="true">→</span>
        </h3>
        {project.summary && <p id={summaryId} className={styles.summary}>{project.summary}</p>}
        {project.tags && project.tags.length > 0 && (
          <ul className={styles.tags} aria-label={`${project.title} technologies`}>
            {project.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
      </div>
    </Link>
  );
};

interface ProjectCollectionProps {
  projects: ProjectData[];
  title: string;
  intro: string;
  headingId: string;
}

export const ProjectCollection: React.FC<ProjectCollectionProps> = ({ projects, title, intro, headingId }) => (
  <section className={styles.page} aria-labelledby={headingId}>
    <div className={styles.sectionHeader}>
      <div>
        <h2 id={headingId} className={styles.heading}>{title}<span aria-hidden="true">.</span></h2>
        <p className={styles.intro}>{intro}</p>
      </div>
      <span className={styles.projectCount}>
        {String(projects.length).padStart(2, '0')} {projects.length === 1 ? 'project' : 'projects'}
      </span>
    </div>

    <div className={styles.grid}>
      {projects.map((project, index) => (
        <CollectionCard key={project.id} project={project} index={index} />
      ))}
    </div>
  </section>
);
