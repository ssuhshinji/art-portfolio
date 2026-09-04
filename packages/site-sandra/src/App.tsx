import React from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { Layout, Splash } from '@portfolio/shared';
import { siteConfig } from './config';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ComingSoonPage } from './pages/ComingSoonPage';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const background = state?.backgroundLocation;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Navigate to="/about" replace />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      )}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <Splash
      title={siteConfig.name}
      subtitle={siteConfig.tagline}
      heroImage="/assets/merow.png"
      socialLinks={siteConfig.socialLinks}
      buttonText="ENTER"
    >
      <BrowserRouter>
        <Layout config={siteConfig}>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </Splash>
  );
};
