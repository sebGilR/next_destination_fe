import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ user, handleLogout, handleDelete }) => {
  return (
    <aside>
      <div>
        <div>
          {user.username[0].toUpperCase()}
        </div>
        <span>@{user.username}</span>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        {
          user.admin &&
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        }
      </ul>
      <ul>
        <li onClick={handleLogout}>Log out</li>
        <li onClick={handleDelete}>Delete acount</li>
      </ul>
    </aside>
  )
};

export default Menu;
