import React from 'react';
import { siteConfig } from '../config';
import { ProjectCollection } from '../components/ProjectCollection';

export const HomePage: React.FC = () => {
  const featuredProjects = siteConfig.projects.filter((project) => project.showOnHome !== false);

  return (
    <ProjectCollection
      projects={featuredProjects}
      title="Selected work"
      intro="Languages, systems, and tools — built from the ground up."
      headingId="selected-work-heading"
    />
  );
};
