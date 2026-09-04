import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import type { NavItem, SiteConfig } from '../../types';
import styles from './Header.module.css';

interface HeaderProps {
  config: SiteConfig;
}

export const Header: React.FC<HeaderProps> = ({ config }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link to="/">
          <h1 className={styles.name}>{config.name}</h1>
          <p className={styles.tagline}>{config.tagline}</p>
        </Link>
      </div>
      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}>
        {config.navItems.map((item) => (
          <NavDropdown key={item.path} item={item} onNavigate={() => setMobileOpen(false)} />
        ))}
      </nav>
    </header>
  );
};

const NavDropdown: React.FC<{ item: NavItem; onNavigate: () => void }> = ({ item, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  if (!item.children?.length) {
    return (
      <Link to={item.path} className={styles.navLink} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  const closeAndNavigate = () => {
    setOpen(false);
    onNavigate();
  };

  return (
    <div
      className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
        }
      }}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget as Node | null;
        if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
          setOpen(false);
        }
      }}
    >
      <div className={styles.dropdownTrigger}>
        <Link to={item.path} className={styles.navLink} onClick={closeAndNavigate}>
          {item.label}
        </Link>
        <button
          type="button"
          className={styles.dropdownToggle}
          aria-label={`Toggle ${item.label} menu`}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true">▾</span>
        </button>
      </div>
      <div id={menuId} className={styles.dropdownMenu}>
        {item.children.map((child) => (
          <Link
            key={child.path}
            to={child.path}
            className={styles.dropdownItem}
            onClick={closeAndNavigate}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
