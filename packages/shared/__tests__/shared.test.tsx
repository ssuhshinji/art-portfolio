import React from 'react';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import { ProjectGrid } from '../components/ProjectGrid/ProjectGrid';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import type { ProjectData, SiteConfig } from '../types';

const mockProject: ProjectData = {
  id: 'test-project',
  title: 'Test Compiler Engine',
  category: 'systems',
  size: 'hero',
  path: '/project/test-project',
  summary: 'A high performance test compiler engine.',
  tags: ['C++20', 'Compilers', 'LLVM'],
  gradient: 'linear-gradient(135deg, #111, #333)'
};

const mockConfig: SiteConfig = {
  name: 'JUAN F. SANCHEZ',
  tagline: 'Systems & Tools Developer',
  socialLinks: {
    github: 'https://github.com/Rowrow620',
    email: 'juan.sanchez620@outlook.com'
  },
  navItems: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' }
  ],
  projects: [mockProject]
};

describe('Shared Components Regression Tests', () => {
  describe('ProjectCard', () => {
    it('renders project title, summary, and tech tags', () => {
      render(
        <MemoryRouter>
          <ProjectCard project={mockProject} />
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', { level: 3, name: /Test Compiler Engine/i })).toBeInTheDocument();
      expect(screen.getByText('A high performance test compiler engine.')).toBeInTheDocument();
      expect(screen.getByText('C++20')).toBeInTheDocument();
      expect(screen.getByText('Compilers')).toBeInTheDocument();
    });

    it('can omit the hover overlay without removing the artwork link', () => {
      render(
        <MemoryRouter>
          <ProjectCard project={mockProject} showOverlay={false} />
        </MemoryRouter>
      );
      expect(screen.queryByRole('heading', { name: /Test Compiler Engine/i })).not.toBeInTheDocument();
      expect(screen.queryByText('A high performance test compiler engine.')).not.toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/project/test-project');
    });

    it('can show a category-only hover label on a section cover', () => {
      render(
        <MemoryRouter>
          <ProjectCard
            project={{ ...mockProject, overlayLabel: 'Traditional' }}
            showOverlay={false}
          />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 3, name: 'Traditional' })).toBeInTheDocument();
      expect(screen.queryByText(/PROJECT:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(mockProject.summary!)).not.toBeInTheDocument();
      expect(screen.queryByText('C++20')).not.toBeInTheDocument();
    });
  });

  describe('ProjectGrid', () => {
    it('renders list of projects', () => {
      render(
        <MemoryRouter>
          <ProjectGrid projects={[mockProject]} />
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', { level: 3, name: /Test Compiler Engine/i })).toBeInTheDocument();
    });

    it('passes the overlay preference to every project card', () => {
      render(
        <MemoryRouter>
          <ProjectGrid projects={[mockProject]} showOverlays={false} />
        </MemoryRouter>
      );
      expect(screen.queryByRole('heading', { name: /Test Compiler Engine/i })).not.toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/project/test-project');
    });
  });

  describe('Header', () => {
    it('renders site title and navigation links', () => {
      render(
        <MemoryRouter>
          <Header config={mockConfig} />
        </MemoryRouter>
      );
      expect(screen.getByText('JUAN F. SANCHEZ')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('lets keyboard and touch users toggle nested navigation', () => {
      render(
        <MemoryRouter>
          <Header
            config={{
              ...mockConfig,
              navItems: [
                {
                  label: 'Work',
                  path: '/category/illustrations',
                  children: [
                    { label: 'Illustration', path: '/category/illustrations' },
                    { label: 'Traditional', path: '/category/traditional' }
                  ]
                }
              ]
            }}
          />
        </MemoryRouter>
      );

      const toggle = screen.getByRole('button', { name: 'Toggle Work menu' });
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('link', { name: 'Traditional' }))
        .toHaveAttribute('href', '/category/traditional');
    });
  });

  describe('Footer', () => {
    it('renders social links and copyright notice', () => {
      render(
        <MemoryRouter>
          <Footer config={mockConfig} />
        </MemoryRouter>
      );
      expect(screen.getByText(/JUAN F. SANCHEZ/i)).toBeInTheDocument();
      expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('keeps internal social placeholders in the current tab', () => {
      render(
        <MemoryRouter>
          <Footer
            config={{
              ...mockConfig,
              socialLinks: { instagram: '/coming-soon', email: 'artist@example.com' }
            }}
          />
        </MemoryRouter>
      );

      expect(screen.getByLabelText('Instagram'))
        .toHaveAttribute('href', '/coming-soon');
      expect(screen.getByLabelText('Instagram'))
        .not.toHaveAttribute('target');
      expect(screen.getByLabelText('Email'))
        .toHaveAttribute('href', 'mailto:artist@example.com');
    });
  });
});
