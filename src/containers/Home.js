import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import Axios from 'axios';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';
import Header from '../components/Header';
import Carousel from '../components/Carousel';

const Home = ({
  changeDestinations,
}) => {
  // Local State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handlers
  const handleFetchDestinations = React.useCallback(() => {
    setLoading(true);

    Axios.get(`${EP.BASE}${EP.DEST}`)
      .then(result => {
        console.log(result);
        changeDestinations(result);
      })
      .catch(() => {
        setError(true);
      });
  }, [setLoading, changeDestinations, setError]);

  React.useEffect(() => {
    handleFetchDestinations();
  }, [handleFetchDestinations]);

  return (
    <>
      {/* <Header />
      <Carousel /> */}
    </>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  destinations: state.destinations,
  favorites: state.favorites,
  menu: state.menu,
});

const mapDispatchToProps = dispatch => ({
  changeDestinations: data => dispatch(Actions.changeDestinations(data)),
  changeFavorites: data => dispatch(Actions.changeFavorites(data)),
  createUser: data => dispatch(Actions.createUser(data)),
  logIn: data => dispatch(Actions.logIn(data)),
  logOut: () => dispatch(Actions.logOut()),
  toggleMenu: () => dispatch(Actions.toggleMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
