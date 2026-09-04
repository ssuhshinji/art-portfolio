import React from 'react';
import { useParams } from 'react-router-dom';
import { siteConfig } from '../config';
import { ProjectCollection } from '../components/ProjectCollection';

const categoryDetails: Record<string, { title: string; intro: string }> = {
  systems: {
    title: 'Systems & Compilers',
    intro: 'Compilers, runtimes, and infrastructure built close to the machine.'
  },
  tools: {
    title: 'Tools & Visualizers',
    intro: 'Native and browser-based tools for learning, creating, and exploring.'
  },
  mods: {
    title: 'Game Mods',
    intro: 'Runtime extensions and custom game mechanics built with C# and Harmony.'
  }
};

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const filteredProjects = siteConfig.projects.filter(
    (p) => p.category.toLowerCase() === slug?.toLowerCase()
  );

  const details = categoryDetails[slug?.toLowerCase() || ''] || {
    title: 'Projects',
    intro: 'Explore languages, systems, tools, and game mods.'
  };

  return (
    <ProjectCollection
      projects={filteredProjects.length > 0 ? filteredProjects : siteConfig.projects}
      title={details.title}
      intro={details.intro}
      headingId="category-heading"
    />
  );
};
