import React from 'react';
import type { SiteConfig } from '../../types';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  config: SiteConfig;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ config, children }) => {
  return (
    <div className={styles.layout}>
      <Header config={config} />
      <main className={styles.main}>{children}</main>
      <Footer config={config} />
    </div>
  );
};
