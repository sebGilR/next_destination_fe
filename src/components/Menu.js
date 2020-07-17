import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/style/Menu.module.scss';

const Menu = ({ user, handleLogOut, handleDelete, menu, toggleMenu }) => {
  return (
    <aside className={`${styles.container} ${!menu && styles.hidden}`.trim()}>
      <div>
        <div className={styles.icon}>
          {user.username[0].toUpperCase()}
        </div>
        <span className={styles.username}>@{user.username}</span>
      </div>
      <ul className={styles.nav}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link> </li>
        <li><Link to="/favorites" onClick={toggleMenu}>Favorites</Link> </li>
        {
          user.admin &&
          <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
        }
      </ul>
      <ul >
        <li onClick={() => {
          handleLogOut();
          toggleMenu();
        }}>Log out</li>
      </ul>
    </aside>
  )
};

export default Menu;
