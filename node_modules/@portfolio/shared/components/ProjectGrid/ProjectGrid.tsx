import React from 'react';
import type { ProjectData } from '../../types';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import styles from './ProjectGrid.module.css';

interface ProjectGridProps {
  projects: ProjectData[];
  showOverlays?: boolean;
  centerOddItem?: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  showOverlays = true,
  centerOddItem = false
}) => {
  return (
    <div className={`${styles.grid} ${centerOddItem ? styles.centerOddItem : ''}`}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} showOverlay={showOverlays} />
      ))}
    </div>
  );
};
