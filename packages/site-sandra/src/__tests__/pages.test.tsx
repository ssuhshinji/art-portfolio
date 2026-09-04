import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { AboutPage } from '../pages/AboutPage';
import { ComingSoonPage } from '../pages/ComingSoonPage';

describe('art portfolio gallery pages', () => {
  it('combines the selected portrait and contact form on the About page', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'Portrait of Sandra Suh' }))
      .toHaveAttribute('src', '/assets/about-sandra.jpg');
    expect(screen.getByText(/currently studying Illustration & Animation at California State University/i))
      .toBeInTheDocument();
    expect(screen.getByText(/pushing my limits as an artist and challenging myself/i))
      .toBeInTheDocument();
    expect(screen.getByText(/For inquiries, collaborations, or freelance projects/i))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('provides an unlisted Coming Soon page with a way back and the contact form', () => {
    render(
      <MemoryRouter>
        <ComingSoonPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Coming Soon!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to portfolio' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('presents Home as a focused collection of section covers', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Characters with feeling/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/I’m interested in expressive character design/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Explore work' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'About Me & Contact' })).not.toBeInTheDocument();
    expect(screen.queryByText(/Featured work/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Character Illustration')).not.toBeInTheDocument();
    expect(screen.queryByText('View work')).not.toBeInTheDocument();
    expect(screen.queryByText('Portfolio')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Explore Work' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /View featured/i })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: /close view of a pair of eyes/i }))
      .toHaveAttribute('src', '/assets/sketch-animal-study.jpg');
    expect(screen.getByRole('img', { name: /white swan standing over a pond/i }))
      .toHaveAttribute('src', '/assets/sculpture-swan-koi-relief.png');
    expect(screen.getByRole('img', { name: /pendulum character swinging/i }))
      .toHaveAttribute('src', '/assets/pendulum-example.gif');
    expect(screen.getByRole('img', { name: /characters debating sushi/i }))
      .toHaveAttribute('src', '/assets/merow.png');
    expect(screen.getByRole('img', { name: /Cat-eared character with golden eyes/i }))
      .toHaveAttribute('src', '/assets/kat.png');
    expect(screen.getByRole('img', { name: /Winged celestial character/i }))
      .toHaveAttribute('src', '/assets/athena.png');

    expect(screen.getByRole('link', { name: 'Explore Sketchbook' }))
      .toHaveAttribute('href', '/category/sketchbook');
    expect(screen.getByRole('link', { name: 'Explore Sculpture' }))
      .toHaveAttribute('href', '/category/sculptures');
    expect(screen.getByRole('link', { name: 'Explore Illustration' }))
      .toHaveAttribute('href', '/category/illustrations');
    expect(screen.getByRole('link', { name: 'Explore Animation' }))
      .toHaveAttribute('href', '/category/animation');
    expect(screen.getByRole('link', { name: 'Explore Concepts' }))
      .toHaveAttribute('href', '/category/concepts');
    expect(screen.getByRole('link', { name: 'Explore Commissions' }))
      .toHaveAttribute('href', '/category/commissions');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows the physical studies together in the Sketchbook gallery', () => {
    render(
      <MemoryRouter initialEntries={['/category/sketchbook']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'SKETCHBOOK' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /skull topped by a butterfly/i }))
      .toHaveAttribute('src', '/assets/sketch-skull-butterfly.jpg');
    expect(screen.getByRole('img', { name: /close view of a pair of eyes/i }))
      .toHaveAttribute('src', '/assets/sketch-animal-study.jpg');
    expect(screen.getByRole('img', { name: /photographic reference used for the study/i }))
      .toHaveAttribute('src', '/assets/traditional-cat-reference.jpg');
    expect(screen.getByRole('img', { name: /fantasy sword surrounded by green leaves/i }))
      .toHaveAttribute('src', '/assets/traditional-sword.jpg');
    expect(screen.getByRole('img', { name: /Adventure Time-inspired style/i }))
      .toHaveAttribute('src', '/assets/traditional-adventure-time-style.jpg');
    expect(screen.getByRole('img', { name: /Pencil figure study of a seated woman/i }))
      .toHaveAttribute('src', '/assets/sketchbook-seated-figure-study.png');
    expect(screen.getByRole('img', { name: /nude standing male figure/i }))
      .toHaveAttribute('src', '/assets/sketchbook-standing-male-figure-study.png');
    expect(screen.getByRole('img', { name: /nude standing figure and two detailed feet/i }))
      .toHaveAttribute('src', '/assets/sketchbook-figure-foot-anatomy-study.png');
    expect(screen.getAllByText('Figure Drawing / Nudity')).toHaveLength(3);

    const seatedStudy = screen.getByRole('img', { name: /Pencil figure study of a seated woman/i });
    fireEvent.click(seatedStudy.closest('a')!);

    expect(screen.getAllByText('Figure Drawing / Nudity')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'SKETCHBOOK' })).toBeInTheDocument();
  });

  it('places the Axel fan art in Illustration', () => {
    render(
      <MemoryRouter initialEntries={['/category/illustrations']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'ILLUSTRATIONS' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Axel from Kingdom Hearts/i }))
      .toHaveAttribute('src', '/assets/axel-fanart.png');
    expect(screen.getByRole('img', { name: /dark-haired character wearing pink sunglasses/i }))
      .toHaveAttribute('src', '/assets/illustration-10.png');
    expect(screen.getByRole('img', { name: /standing beneath gothic arches on a moonlit balcony/i }))
      .toHaveAttribute('src', '/assets/illustration-va.png');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/project-1',
      '/project/project-16',
      '/project/illustration-10',
      '/project/illustration-axel',
      '/project/illustration-va',
      '/project/project-sketch',
      '/project/project-sketch2'
    ]);
    expect(screen.queryByRole('img', { name: /skull topped by a butterfly/i })).not.toBeInTheDocument();
  });

  it('shows the sculpture work only in the Sculptures gallery', () => {
    render(
      <MemoryRouter initialEntries={['/category/sculptures']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'SCULPTURES' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Front view of a wearable cardboard creature/i }))
      .toHaveAttribute('src', '/assets/sculpture-creature-front.jpg');
    expect(screen.getByRole('img', { name: /Profile view of a wearable cardboard creature/i }))
      .toHaveAttribute('src', '/assets/sculpture-creature-profile.jpg');
    expect(screen.getByRole('img', { name: /white swan standing over a pond/i }))
      .toHaveAttribute('src', '/assets/sculpture-swan-koi-relief.png');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/sculpture-creature-front',
      '/project/sculpture-creature-profile',
      '/project/sculpture-swan-koi-relief'
    ]);
    expect(screen.queryByText('Wearable Cardboard Creature — Front View')).not.toBeInTheDocument();
    expect(screen.queryByText('Wearable Cardboard Creature — Profile View')).not.toBeInTheDocument();
  });

  it('shows the three style pieces and the landing artwork in Concepts', () => {
    render(
      <MemoryRouter initialEntries={['/category/concepts']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'CONCEPTS' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /debating sushi over the phone/i }))
      .toHaveAttribute('src', '/assets/merow.png');
    expect(screen.getByRole('img', { name: /posing with drinks and a cat/i }))
      .toHaveAttribute('src', '/assets/concept-example.png');
    expect(screen.getByRole('img', { name: /standing together in front of an arched window/i }))
      .toHaveAttribute('src', '/assets/concept-window-portrait.png');
    expect(screen.getByRole('img', { name: /posed beside a television/i }))
      .toHaveAttribute('src', '/assets/concept.jpg');
    expect(screen.getByRole('img', { name: /dark purple-toned scene/i }))
      .toHaveAttribute('src', '/assets/concept2.png');
    expect(screen.getByRole('img', { name: /dark teal game-inspired scene/i }))
      .toHaveAttribute('src', '/assets/concept3.jpg');
    expect(screen.getByRole('img', { name: /Adventures of Bingus cover/i }))
      .toHaveAttribute('src', '/assets/concept-adventures-of-bingus.jpg');
    expect(screen.getByRole('img', { name: /cowboy character wearing two stacked hats/i }))
      .toHaveAttribute('src', '/assets/concept-cowboy-character.png');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/comm-4',
      '/project/concept-merow',
      '/project/comm-image1',
      '/project/comm-5',
      '/project/concept-example',
      '/project/concept-window-portrait',
      '/project/project-17',
      '/project/project-18',
      '/project/concept-3',
      '/project/concept-adventures-of-bingus',
      '/project/concept-cowboy-character'
    ]);
  });

  it('includes the Tenko artwork in Commissions', () => {
    render(
      <MemoryRouter initialEntries={['/category/commissions']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'COMMISSIONS' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Cat-eared maid posing with Mudkip/i }))
      .toHaveAttribute('src', '/assets/commission-tenko.png');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/project-8',
      '/project/commission-tenko',
      '/project/project-12',
      '/project/comm-3',
      '/project/comm-2',
      '/project/comm-1'
    ]);
  });

  it('shows the pendulum GIF as the only Animation example', () => {
    render(
      <MemoryRouter initialEntries={['/category/animation']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'ANIMATION' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pendulum character swinging/i }))
      .toHaveAttribute('src', '/assets/pendulum-example.gif');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/animation-pendulum'
    ]);
  });
});
