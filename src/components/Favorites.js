import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import styles from '../assets/style/Favorites.module.scss';

const Favorites = ({
  toggleMenu,
  favorites,
  destinations,
  loading,
  startLoading,
  endLoading,
  removeFavorite,
}) => {
  const [error, setError] = useState(false);

  const handleRemoveFavorite = favId => {
    startLoading();
    Axios.delete(`${EP.BASE}${EP.FAV}/${favId}`,
      { withCredentials: true })
      .then(() => {
        removeFavorite(favId);
      })
      .catch(() => setError());
    endLoading();
  }
  return (
    <><div className={styles.header}>
      <Header title="Favorites" toggleMenu={toggleMenu} />
    </div>
      {error && 'Something went wrong... Try reloading this page.'}
      <table className={styles.container}>
        <thead>
          <tr>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {!error && !loading &&
            favorites.map(favorite =>
              <tr key={favorite.id}>
                <td>
                  <Link to={`/${favorite.destination_id}`} >
                    {destinations.find(dest => dest.id === favorite.destination_id).name}
                  </Link>
                </td>
                <td>
                  {!loading &&
                    <button onClick={() => handleRemoveFavorite(favorite.id)}>Remove</button>
                  }
                </td>
              </tr>
            )
          }
        </tbody>
      </table >
    </>
  )
};

const mapStateToProps = state => ({
  favorites: state.user.favorites,
  user: state.user,
  destinations: state.destinations,
  loading: state.loading,
  menu: state.menu,
});

const mapDispatchToProps = dispatch => ({
  logIn: data => dispatch(Actions.logIn(data)),
  startLoading: () => dispatch(Actions.startLoading()),
  endLoading: () => dispatch(Actions.endLoading()),
  removeFavorite: data => dispatch(Actions.removeFavorite(data)),
  toggleMenu: () => dispatch(Actions.toggleMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
