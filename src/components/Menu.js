import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../assets/style/Menu.module.scss';

const Menu = ({
  user, handleLogOut, menu, toggleMenu,
}) => (
  <aside className={`${styles.container} ${!menu && styles.hidden}`.trim()}>
    <div>
      <div className={styles.icon}>
        {user.username[0].toUpperCase()}
      </div>
      <span className={styles.username}>
        @
        {user.username}
      </span>
    </div>
    <ul className={styles.nav}>
      <li>
        <Link to="/" onClick={toggleMenu}>Home</Link>
      </li>
      <li>
        <Link to="/favorites" onClick={toggleMenu}>
          Favorites
          <span className={styles.tag}>{user.favorites.length}</span>
        </Link>
      </li>
      {
          user.admin
          && (
            <li>
              <Link
                to="/dashboard"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            </li>
          )
        }
    </ul>
    <ul>
      <li
        onClick={() => {
          handleLogOut();
          toggleMenu();
        }}
        onKeyPress={toggleMenu}
        role="presentation"
      >
        Log out
      </li>
    </ul>
  </aside>
);

Menu.propTypes = {
  user: PropTypes.objectOf(Object).isRequired,
  handleLogOut: PropTypes.func.isRequired,
  menu: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Menu;
