import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../assets/style/Header.module.scss';

const Header = ({
  title, home, toggleMenu, menu,
}) => {
  const history = useHistory();
  
  return (
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
          <i
            className={`fas fa-chevron-left ${styles.icon}`}
            onClick={history.goBack}
          />
        )}
      <h1 className={styles.title}>{title}</h1>
    </header>
  )
};

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
