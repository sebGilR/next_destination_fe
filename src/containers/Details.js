import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';
import Header from '../components/Header';
import styles from '../assets/style/Details.module.scss';

const Details = ({
  user,
  logIn,
  loading,
  startLoading,
  endLoading,
  removeFavorite,
  toggleMenu,
}) => {
  const { id } = useParams();
  const [destination, setDestination] = useState({});
  const [error, setError] = useState(false);
  const favorite = user.favorites.find(f => f.destination_id === parseInt(id, 10));

  // Handlers
  const handleMarkFavorite = () => {
    startLoading();
    Axios.post(`${EP.BASE}${EP.FAV}`,
      {
        destination_id: destination.id,
      }, { withCredentials: true })
      .then(result => {
        logIn(result.data);
      })
      .catch(() => {
        setError(true);
      });
    endLoading();
  };

  const handleRemoveFavorite = () => {
    startLoading();
    Axios.delete(`${EP.BASE}${EP.FAV}/${favorite.id}`,
      { withCredentials: true })
      .then(() => {
        removeFavorite(favorite.id);
      })
      .catch(() => setError(true));
    endLoading();
  };

  const handleFetchDestination = useCallback(() => {
    startLoading();

    Axios.get(`${EP.BASE}${EP.DEST}/${id}`)
      .then(result => {
        setDestination(result.data.destination);
      })
      .catch(setError());
    endLoading();
  }, [startLoading, endLoading, setError, setDestination, id]);

  // Effects
  React.useEffect(() => {
    handleFetchDestination();
  }, [handleFetchDestination]);

  return (
    <section className={styles.container}>
      {!loading && <Header title={destination.name} toggleMenu={toggleMenu} />}
      {error && 'something went wrong... Try reloading this page.'}
      <div className={styles.image}>
        <img src={destination.img_url} alt={destination.name} />
        {
          loading
            ? 'Loading...'
            : (
              <span>
                <i className={`fas fa-star ${styles.icon}`}> </i>
                {destination.favorites_count}
              </span>
            )
        }
      </div>
      <div className={styles.body}>
        <div className={styles.description}>
          <h2>About this destination</h2>
          {
            loading
              ? 'Loading...'
              : <p>{destination.description}</p>
          }
        </div>
        {
          !loading && !favorite
          && <button type="button" onClick={handleMarkFavorite}>Save to favorites</button>
        }
        {
          !loading && favorite
          && <button type="button" onClick={handleRemoveFavorite}>Remove from favorites</button>
        }
      </div>
    </section>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);
