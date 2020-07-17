import React from 'react';
import styles from '../assets/style/Header.module.scss';
import { Link } from 'react-router-dom';

const Header = ({ title, home, toggleMenu, menu }) => {

  return (
    <header className={`${styles.container} ${menu && styles.moved}`.trim()}>
      {home ?
        <i className={`fas fa-bars ${styles.icon}`} onClick={toggleMenu}></i> :
        <Link to="/" className={`${styles.icon}`}>
          <i className={`fas fa-chevron-left`}></i>
        </Link>
      }
      <h1 className={styles.title}>{title}</h1>
    </header>
  )
};

export default Header;