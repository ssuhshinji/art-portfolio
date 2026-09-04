import { describe, expect, it } from 'vitest';
import { siteConfig } from '../config';

describe('art portfolio configuration', () => {
  it('keeps Commissions prominent while grouping the other galleries under Work', () => {
    expect(siteConfig.navItems.map((item) => item.label)).toEqual([
      'Home',
      'Work',
      'Commissions',
      'About Me & Contact'
    ]);

    const work = siteConfig.navItems.find((item) => item.label === 'Work');
    expect(work).toEqual({
      label: 'Work',
      path: '/category/illustrations',
      children: [
        { label: 'Illustration', path: '/category/illustrations' },
        { label: 'Sketchbook', path: '/category/sketchbook' },
        { label: 'Animation', path: '/category/animation' },
        { label: 'Sculpture', path: '/category/sculptures' },
        { label: 'Concepts', path: '/category/concepts' }
      ]
    });

    const commissions = siteConfig.navItems.find((item) => item.path === '/category/commissions');
    expect(commissions).toEqual({ label: 'Commissions', path: '/category/commissions' });
    expect(JSON.stringify(siteConfig.navItems)).not.toContain('Commission Inquiries');
    expect(siteConfig.projects.some((project) => project.category === 'commissions')).toBe(true);
    expect(siteConfig.socialLinks).toEqual({
      instagram: '/coming-soon',
      twitter: '/coming-soon',
      bluesky: '/coming-soon',
      email: 'contact@sandrasuh.com'
    });
  });

  it('places physical drawing studies in Sketchbook and keeps digital sketches in Illustration', () => {
    const graphiteSketches = siteConfig.projects.filter((project) => project.id.startsWith('sketch-'));
    expect(graphiteSketches).toHaveLength(2);
    graphiteSketches.forEach((project) => {
      expect(project.category).toBe('sketchbook');
      expect(project.image).toMatch(/^\/assets\/sketch-.+\.jpg$/);
      expect(project.imageAlt).toBeTruthy();
    });

    expect(siteConfig.projects.find((project) => project.id === 'traditional-cat-reference')).toMatchObject({
      category: 'sketchbook',
      image: '/assets/traditional-cat-reference.jpg',
      showOnHome: false
    });
    expect(siteConfig.projects.find((project) => project.id === 'traditional-floral-sword')).toMatchObject({
      category: 'sketchbook',
      image: '/assets/traditional-sword.jpg',
      showOnHome: false
    });
    expect(siteConfig.projects.find((project) => project.id === 'traditional-adventure-time-style')).toMatchObject({
      category: 'sketchbook',
      image: '/assets/traditional-adventure-time-style.jpg',
      showOnHome: false
    });
    expect(siteConfig.projects.find((project) => project.id === 'sketchbook-seated-figure-study')).toMatchObject({
      category: 'sketchbook',
      image: '/assets/sketchbook-seated-figure-study.png',
      showOnHome: false,
      contentWarning: 'Figure Drawing / Nudity'
    });
    expect(siteConfig.projects.find((project) => project.id === 'sketchbook-standing-male-figure-study')).toMatchObject({
      category: 'sketchbook',
      image: '/assets/sketchbook-standing-male-figure-study.png',
      aspectRatio: '861 / 1148',
      showOnHome: false,
      contentWarning: 'Figure Drawing / Nudity'
    });
    expect(siteConfig.projects.find((project) => project.id === 'sketchbook-figure-foot-anatomy-study')).toMatchObject({
      category: 'sketchbook',
      image: '/assets/sketchbook-figure-foot-anatomy-study.png',
      aspectRatio: '615 / 527',
      showOnHome: false,
      contentWarning: 'Figure Drawing / Nudity'
    });
    expect(siteConfig.projects.find((project) => project.id === 'project-sketch')?.category)
      .toBe('illustrations');
    expect(siteConfig.projects.find((project) => project.id === 'project-sketch2')?.category)
      .toBe('illustrations');
    expect(siteConfig.projects.find((project) => project.id === 'illustration-axel')).toMatchObject({
      category: 'illustrations',
      image: '/assets/axel-fanart.png',
      showOnHome: false
    });
    expect(siteConfig.projects.find((project) => project.id === 'illustration-10')).toMatchObject({
      category: 'illustrations',
      image: '/assets/illustration-10.png',
      showOnHome: false
    });
    expect(siteConfig.projects.find((project) => project.id === 'illustration-va')).toMatchObject({
      category: 'illustrations',
      image: '/assets/illustration-va.png',
      aspectRatio: '5950 / 3850',
      showOnHome: false
    });
  });

  it('keeps the sculpture views in their own gallery', () => {
    const sculptures = siteConfig.projects.filter((project) => project.category === 'sculptures');
    expect(sculptures).toHaveLength(3);
    sculptures.forEach((project) => {
      expect(project.image).toMatch(/^\/assets\/sculpture-.+\.(jpg|png)$/);
      expect(project.imageAlt).toBeTruthy();
    });
  });

  it('separates and pairs style concepts in the intended visual order', () => {
    const concepts = siteConfig.projects.filter((project) => project.category === 'concepts');
    expect(concepts.map((project) => project.id)).toEqual([
      'comm-4',
      'concept-merow',
      'comm-image1',
      'comm-5',
      'concept-example',
      'concept-window-portrait',
      'project-17',
      'project-18',
      'concept-3',
      'concept-adventures-of-bingus',
      'concept-cowboy-character'
    ]);
    expect(concepts).toHaveLength(11);
    expect(concepts.every((project) => project.size === 'medium')).toBe(true);
    expect(concepts.every((project) => project.aspectRatio === '1 / 1')).toBe(true);
    expect(concepts.every((project) => project.objectFit === 'contain')).toBe(true);

    const commissions = siteConfig.projects.filter((project) => project.category === 'commissions');
    expect(commissions.map((project) => project.id)).not.toEqual(
      expect.arrayContaining(['comm-4', 'comm-5', 'comm-image1'])
    );
    expect(siteConfig.projects.find((project) => project.id === 'commission-tenko')).toMatchObject({
      category: 'commissions',
      image: '/assets/commission-tenko.png',
      aspectRatio: '4 / 5',
      showOnHome: false
    });
  });

  it('uses the trimmed pendulum GIF as the only animation example', () => {
    const animations = siteConfig.projects.filter((project) => project.category === 'animation');
    expect(animations).toHaveLength(1);
    expect(animations[0]).toMatchObject({
      id: 'animation-pendulum',
      image: '/assets/pendulum-example.gif',
      aspectRatio: '16 / 9',
      showOnHome: true
    });
  });

  it('curates the selected section covers for the homepage', () => {
    expect(siteConfig.projects.filter((project) => project.showOnHome === true).map((project) => project.id))
      .toEqual([
        'sketch-animal-study',
        'sculpture-swan-koi-relief',
        'animation-pendulum',
        'project-16'
      ]);
  });
});
