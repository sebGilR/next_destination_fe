import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';

const Details = ({
  destinations,
  user,
  logIn,
  loading,
  startLoading,
  endLoading,
  removeFavorite,
}) => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const destination = destinations.find(e => e.id === parseInt(id));
  const favorite = user.favorites.find(f => f.destination_id === parseInt(id));

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
        setError(true)
      });
    endLoading();
  }

  const handleRemoveFavorite = () => {
    startLoading();
    Axios.delete(`${EP.BASE}${EP.FAV}/${favorite.id}`,
      { withCredentials: true })
      .then(() => {
        removeFavorite(favorite.id);
      })
      .catch(setError(true));
    endLoading()
  }

  return (
    <>{error && 'something went wrong... Try reloading this page.'}
      <section>
        <div>
          <img src="https://picsum.photos/300/280" alt="Img" />
          {
            loading ?
              'Loading...' :
              <span>{destination.favorites_count}</span>
          }

        </div>
        <div>
          <h2>About this destination</h2>
          {
            loading ?
              'Loading...' :
              <p>{destination.description}</p>
          }
        </div>
        {
          !loading && !favorite &&
          <button onClick={handleMarkFavorite}>Save to favorites</button>
        }
        {
          !loading && favorite &&
          <button onClick={handleRemoveFavorite}>Remove from favorites</button>
        }
      </section>
    </>
  )
};

const mapStateToProps = state => ({
  favorites: state.user.favorites,
  user: state.user,
  destinations: state.destinations,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  logIn: data => dispatch(Actions.logIn(data)),
  startLoading: () => dispatch(Actions.startLoading()),
  endLoading: () => dispatch(Actions.endLoading()),
  removeFavorite: data => dispatch(Actions.removeFavorite(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
