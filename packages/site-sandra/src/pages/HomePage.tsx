import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import styles from './HomePage.module.css';

const categoryCovers = [
  {
    projectId: 'project-1',
    label: 'Illustration',
    path: '/category/illustrations',
    layout: 'illustration'
  },
  {
    projectId: 'sketch-animal-study',
    label: 'Sketchbook',
    path: '/category/sketchbook',
    layout: 'sketchbook'
  },
  {
    projectId: 'sculpture-swan-koi-relief',
    label: 'Sculpture',
    path: '/category/sculptures',
    layout: 'sculpture'
  },
  {
    projectId: 'animation-pendulum',
    label: 'Animation',
    path: '/category/animation',
    layout: 'animation'
  },
  {
    projectId: 'concept-merow',
    label: 'Concepts',
    path: '/category/concepts',
    layout: 'concepts'
  },
  {
    projectId: 'project-8',
    label: 'Commissions',
    path: '/category/commissions',
    layout: 'commissions'
  }
];

export const HomePage: React.FC = () => {
  const covers = categoryCovers.flatMap((cover) => {
    const project = siteConfig.projects.find((item) => item.id === cover.projectId);
    return project?.image ? [{ ...cover, image: project.image, imageAlt: project.imageAlt || cover.label }] : [];
  });

  return (
    <main className={styles.page}>
      <section id="work" className={styles.workSection} aria-label="Portfolio categories">
        <div className={styles.categoryGrid}>
          {covers.map((cover) => (
            <Link
              key={cover.projectId}
              className={`${styles.categoryCard} ${styles[cover.layout]}`}
              to={cover.path}
              aria-label={`Explore ${cover.label}`}
            >
              <img src={cover.image} alt={cover.imageAlt} />
              <span className={styles.categoryShade} />
              <span className={styles.categoryLabel}>
                <strong>{cover.label}</strong>
                <span>View collection <span aria-hidden="true">↗</span></span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};
