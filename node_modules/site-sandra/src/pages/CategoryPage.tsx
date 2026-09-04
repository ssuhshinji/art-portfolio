import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectGrid } from '@portfolio/shared';
import { siteConfig } from '../config';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const categorySlug = slug?.toLowerCase() === 'traditional' ? 'sketchbook' : slug?.toLowerCase();
  const filteredProjects = siteConfig.projects.filter(
    (p) => p.category.toLowerCase() === categorySlug
  );

  const title = categorySlug ? categorySlug.replace('-', ' ').toUpperCase() : 'CATEGORY';

  return (
    <div>
      <div style={{ padding: '2rem 1.5rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', letterSpacing: '0.2em', color: 'var(--text-secondary)' }}>
          {title}
        </h2>
      </div>
      <ProjectGrid
        projects={filteredProjects.length > 0 ? filteredProjects : siteConfig.projects}
        showOverlays={false}
        centerOddItem={categorySlug === 'concepts'}
      />
    </div>
  );
};
