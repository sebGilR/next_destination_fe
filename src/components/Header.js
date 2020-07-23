import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../assets/style/Header.module.scss';

const Header = ({
  title, home, toggleMenu, menu,
}) => (
  <header className={`${styles.container} ${menu && styles.moved}`.trim()}>
    {home
      ? (
        <i
          className={`fas fa-bars ${styles.icon}`}
          onClick={toggleMenu}
          onKeyPress={toggleMenu}
          role="presentation"
        />
      ) : (
        <Link to="/" className={`${styles.icon}`}>
          <i className="fas fa-chevron-left" />
        </Link>
      )}
    <h1 className={styles.title}>{title}</h1>
  </header>
);

Header.defaultProps = {
  title: '',
  home: false,
  menu: false,
};

Header.propTypes = {
  title: PropTypes.string,
  home: PropTypes.bool,
  toggleMenu: PropTypes.func.isRequired,
  menu: PropTypes.bool,
};

export default Header;
