import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { CategoryPage } from '../pages/CategoryPage';
import { siteConfig } from '../config';

describe('Personal Portfolio Page Regression Tests', () => {
  describe('HomePage', () => {
    it('introduces selected work with named project links, visible summaries, and concise technology lists', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 2, name: /Selected work/ })).toBeInTheDocument();
      expect(screen.getByText('06 projects')).toBeInTheDocument();
      siteConfig.projects.filter((project) => project.showOnHome !== false).forEach((project) => {
        const card = screen.getByRole('link', { name: project.title });
        expect(card).toHaveAttribute('href', project.path);
        expect(within(card).getByRole('heading', { level: 3, name: project.title })).toBeVisible();
        expect(within(card).getByText(project.summary!)).toBeVisible();
        expect(card).toHaveAccessibleDescription(project.summary);
        const technologies = within(card).getByRole('list', { name: `${project.title} technologies` });
        expect(within(technologies).getAllByRole('listitem')).toHaveLength(3);
      });
    });

    it('replaces placeholder images with labeled project overviews while retaining actual recordings', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      ['AnvilMesh', 'TraceForge'].forEach((title) => {
        const card = screen.getByRole('link', { name: title });
        expect(within(card).queryByRole('img')).not.toBeInTheDocument();
        expect(within(card).getByText('Project overview')).toBeVisible();
      });
      expect(screen.getAllByRole('img')).toHaveLength(4);
      screen.getAllByRole('img').forEach((image) => {
        expect(image.getAttribute('src')).not.toContain('placehold.co');
      });
      expect(screen.getByRole('img', { name: 'FrameStep++ application demo' }))
        .toHaveAttribute('loading', 'eager');
      expect(screen.getByRole('img', { name: /Forge Studio demonstrating/i }))
        .toHaveAttribute('loading', 'lazy');
    });

    it('keeps project information and navigation usable if a recording fails to load', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      const card = screen.getByRole('link', { name: 'FrameStep++' });
      fireEvent.error(within(card).getByRole('img'));
      expect(within(card).queryByRole('img')).not.toBeInTheDocument();
      expect(within(card).getByText('Preview unavailable')).toBeVisible();
      expect(within(card).getByRole('heading', { name: 'FrameStep++' })).toBeVisible();
      expect(card).toHaveAttribute('href', '/project/framestepp');
    });

    it('opens the real project page from a redesigned card', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      fireEvent.click(screen.getByRole('link', { name: 'Forge' }));
      expect(screen.getByRole('heading', { level: 1, name: 'Forge' })).toBeInTheDocument();
      expect(screen.queryByRole('region', { name: /Selected work/ })).not.toBeInTheDocument();
      expect(screen.getByRole('img', { name: /Forge Studio demonstrating/i }))
        .toHaveAttribute('src', '/images/forgestudio.gif');
    });

    it('shows systems and tools while hiding mod project cards', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      const projectPaths = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
      expect(projectPaths).toEqual(
        siteConfig.projects.filter((project) => project.category !== 'mods').map((project) => project.path)
      );
      expect(screen.queryByText(/Unlimited LOB Points & Agents/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/FastForwardSpeed/i)).not.toBeInTheDocument();
    });

    it('renders project showcase and flagship project', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      expect(screen.getByText(/FrameStep\+\+/i)).toBeInTheDocument();
      expect(screen.getByText(/TraceForge/i)).toBeInTheDocument();
      expect(screen.getByText(/AlgoBuddy/i)).toBeInTheDocument();
    });

    it('shows the AlgoBuddy GIF and work-in-progress badge on the project card', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      expect(screen.getByRole('img', { name: /AlgoBuddy demonstrating Contains Duplicate/i }))
        .toHaveAttribute('src', '/images/algobuddy.gif');
      expect(screen.getByText('Work in progress')).toBeInTheDocument();
    });

    it('shows the PixelBuddy GIF on its project card', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      expect(screen.getByRole('img', { name: /PixelBuddy pixel-art editor/i }))
        .toHaveAttribute('src', '/images/pixelbuddy.gif');
    });

    it('shows the Forge Studio GIF on its project card', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      expect(screen.getByRole('img', { name: /Forge Studio demonstrating/i }))
        .toHaveAttribute('src', '/images/forgestudio.gif');
    });
  });

  describe('AboutPage', () => {
    it('renders education, skills, and experience', () => {
      render(
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', { level: 1, name: /About Me/i })).toBeInTheDocument();
      expect(screen.getAllByText(/California State University, Chico/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Southern New Hampshire University/i)).toBeInTheDocument();
      expect(screen.getByText(/Languages/i)).toBeInTheDocument();
      expect(screen.getByText(/Systems & Engine Runtimes/i)).toBeInTheDocument();
      expect(screen.getByText(/Regression Testing/i)).toBeInTheDocument();
      expect(screen.getByText(/Handshake AI Fellowship/i)).toBeInTheDocument();
      expect(screen.getByText(/DataAnnotation/i)).toBeInTheDocument();
    });
  });

  describe('ContactPage', () => {
    it('renders contact cards and submits form', () => {
      render(
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      );
      expect(screen.getByText('juan.sanchez620@outlook.com')).toBeInTheDocument();
      expect(screen.getByText(/github\.com\/Rowrow620/i)).toBeInTheDocument();
      expect(screen.getByText(/linkedin\.com\/in\/juan-sanchez/i)).toBeInTheDocument();

      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const messageInput = screen.getByLabelText(/Message/i);
      const submitBtn = screen.getByRole('button', { name: /Send Message/i });

      fireEvent.change(nameInput, { target: { value: 'Recruiter' } });
      fireEvent.change(emailInput, { target: { value: 'recruiter@tech.com' } });
      fireEvent.change(messageInput, { target: { value: 'Love your compilers project!' } });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Thank you for your message!/i)).toBeInTheDocument();
    });
  });

  describe('ProjectDetailPage', () => {
    it('shows the Forge Studio recording without the retired browser simulator', () => {
      render(
        <MemoryRouter initialEntries={['/project/forge']}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );
      const demo = screen.getByRole('img', { name: /Forge Studio demonstrating/i });
      expect(demo).toHaveAttribute('src', '/images/forgestudio.gif');
      expect(demo.closest('figure')).toHaveTextContent('Forge — recorded application demo');
      expect(screen.queryByRole('heading', { name: 'Interactive DAG Runner Studio' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Run Build Plan' })).not.toBeInTheDocument();
      expect(screen.queryByText(/Live Simulator|Thread Pool Simulator/i)).not.toBeInTheDocument();
    });

    it('shows the PixelBuddy GIF as a full application demo', () => {
      render(
        <MemoryRouter initialEntries={['/project/pixelbuddy']}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );
      const demo = screen.getByRole('img', { name: /PixelBuddy pixel-art editor/i });
      expect(demo).toHaveAttribute('src', '/images/pixelbuddy.gif');
      expect(demo.closest('figure')).toHaveTextContent('PixelBuddy — recorded application demo');
    });

    it.each(siteConfig.projects)('omits core implementation snippets on the $title page', (project) => {
      const { container } = render(
        <MemoryRouter initialEntries={[project.path]}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', { level: 1, name: project.title })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /Core Implementation \/ Snippet/i })).not.toBeInTheDocument();
      expect(container.querySelector('pre code')).not.toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Project Overview' })).toBeInTheDocument();
    });

    it('renders project details when project exists', () => {
      render(
        <MemoryRouter initialEntries={['/project/framestepp']}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', { level: 1, name: 'FrameStep++' })).toBeInTheDocument();
      expect(screen.getByText(/122 Passing/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Highlights' })).toBeInTheDocument();
      expect(screen.getByText(/GitHub Repo ↗/i)).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Ownership & Open Source' })).not.toBeInTheDocument();
    });

    it('renders not found state for invalid project ID', () => {
      render(
        <MemoryRouter initialEntries={['/project/invalid-id-123']}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText(/Project Not Found/i)).toBeInTheDocument();
    });

    it('shows the full AlgoBuddy demo and its correctness notice', () => {
      render(
        <MemoryRouter initialEntries={['/project/algobuddy']}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );
      const demo = screen.getByRole('img', { name: /AlgoBuddy demonstrating Contains Duplicate/i });
      expect(demo).toHaveAttribute('src', '/images/algobuddy.gif');
      expect(demo.closest('figure')).toBeInTheDocument();
      expect(screen.getByLabelText('Development status')).toHaveTextContent('Work in progress');
      expect(screen.getByText(/may produce incorrect results/i)).toBeInTheDocument();
      expect(screen.getByText('Roadmap Scope')).toBeInTheDocument();
      expect(screen.queryByText(/Complete interactive visualizer/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Creator & Lead Maintainer/)).toBeInTheDocument();
      const openSource = screen.getByRole('region', { name: 'Ownership & Open Source' });
      expect(openSource).toHaveTextContent('I created AlgoBuddy');
      expect(openSource).toHaveTextContent('primary maintainer');
      expect(openSource).toHaveTextContent('code of conduct');
      expect(screen.getByRole('link', { name: /MIT License/ }))
        .toHaveAttribute('href', 'https://github.com/Rowrow620/AlgoBuddy/blob/main/LICENSE');
      expect(screen.getByRole('link', { name: /Contribution Guidelines/ }))
        .toHaveAttribute('href', 'https://github.com/Rowrow620/AlgoBuddy/blob/main/CONTRIBUTING.md');
      expect(screen.getByRole('link', { name: /Release Process/ }))
        .toHaveAttribute('href', 'https://github.com/Rowrow620/AlgoBuddy/blob/main/RELEASING.md');
    });
  });

  describe('CategoryPage', () => {
    it('keeps both mod projects available in the Mods section', () => {
      render(
        <MemoryRouter initialEntries={['/category/mods']}>
          <Routes>
            <Route path="/category/:slug" element={<CategoryPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: 'Game Mods' })).toBeInTheDocument();
      expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
        '/project/unlimited-lob',
        '/project/fastforwardspeed'
      ]);
      expect(screen.getByText(/Unlimited LOB Points & Agents/i)).toBeInTheDocument();
      expect(screen.getByText(/FastForwardSpeed/i)).toBeInTheDocument();
      screen.getAllByRole('link').forEach((card) => {
        expect(within(card).getByText(/Game mods/)).toBeVisible();
        expect(within(card).queryByText(/Tools & visualizers/)).not.toBeInTheDocument();
      });
      expect(screen.getByRole('img', { name: 'FastForwardSpeed project preview' }))
        .toHaveAttribute('src', '/images/forwardfastspeed.webp');
    });

    it.each([
      { slug: 'systems', title: 'Systems & Compilers', count: '04 projects' },
      { slug: 'tools', title: 'Tools & Visualizers', count: '02 projects' },
      { slug: 'mods', title: 'Game Mods', count: '02 projects' }
    ])('uses the shared gallery and correct project list in the $title tab', ({ slug, title, count }) => {
      render(
        <MemoryRouter initialEntries={[`/category/${slug}`]}>
          <Routes>
            <Route path="/category/:slug" element={<CategoryPage />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByRole('region', { name: title })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeVisible();
      expect(screen.getByText(count)).toBeVisible();
      const projects = siteConfig.projects.filter((project) => project.category === slug);
      expect(screen.getAllByRole('link').map((link) => link.getAttribute('href')))
        .toEqual(projects.map((project) => project.path));
      projects.forEach((project) => {
        const card = screen.getByRole('link', { name: project.title });
        expect(within(card).getByRole('heading', { level: 3, name: project.title })).toBeVisible();
        expect(within(card).getByText(project.summary!)).toBeVisible();
        expect(card).toHaveAccessibleDescription(project.summary);
        expect(within(card).getByRole('list', { name: `${project.title} technologies` })).toBeVisible();
      });
      screen.queryAllByRole('img').forEach((image) => {
        expect(image.getAttribute('src')).not.toContain('placehold.co');
      });
    });

    it('preserves both recordings and the development status in the Tools tab', () => {
      render(
        <MemoryRouter initialEntries={['/category/tools']}>
          <Routes>
            <Route path="/category/:slug" element={<CategoryPage />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByRole('img', { name: /AlgoBuddy demonstrating Contains Duplicate/i }))
        .toHaveAttribute('src', '/images/algobuddy.gif');
      expect(screen.getByRole('img', { name: /PixelBuddy pixel-art editor/i }))
        .toHaveAttribute('src', '/images/pixelbuddy.gif');
      expect(within(screen.getByRole('link', { name: 'AlgoBuddy' })).getByText('Work in progress'))
        .toBeVisible();
    });

    it('opens an existing mod detail page from its redesigned category card', () => {
      render(
        <MemoryRouter initialEntries={['/category/mods']}>
          <Routes>
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('link', { name: 'Unlimited LOB Points & Agents' }));
      expect(screen.getByRole('heading', { level: 1, name: 'Unlimited LOB Points & Agents' }))
        .toBeInTheDocument();
      expect(screen.getByRole('link', { name: /GitHub Repo/ }))
        .toHaveAttribute('href', 'https://github.com/Rowrow620/UnlimitedLOBPointsAndAgents');
    });
  });
});
