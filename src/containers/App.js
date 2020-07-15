import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Menu from '../components/Menu';

const App = ({
  changeDestinations,
  destinations,
  user,
  logIn,
  logOut,
}) => {
  // Local State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handlers
  const handleFetchDestinations = React.useCallback(() => {
    setLoading(true);

    Axios.get(`${EP.BASE}${EP.DEST}`)
      .then(result => {
        setLoading(false);
        changeDestinations(result.data.destinations);
      })
      .catch(() => {
        setError(true);
      });
  }, [setLoading, changeDestinations, setError]);

  const verifyConnection = useCallback(() => {
    Axios.get(`${EP.BASE}${EP.AUTH}/connected`)
      .then(result => {
        if (result.data.connected && !user.connected) {
          logIn(result.data);
        } else if (!result.data.connected && user.connected) {
          logOut();
        };
      })
      .catch(() => setError())
  }, [logIn, logOut, user.connected]);

  // Effects
  React.useEffect(() => {
    verifyConnection();
  }, [verifyConnection]);

  React.useEffect(() => {
    handleFetchDestinations();
  }, [handleFetchDestinations]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={'/'}>
            {user.connected ?
              <>
                <Menu user={user} />
                <div className="content">
                  <Header />
                  <Carousel destinations={destinations} />
                </div>
              </>
              : <Login />}
          </Route>
          <Route path="/login">
            {user.connected ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup">
            {user.connected ? <Redirect to="/" /> : <SignUp />}
          </Route>
        </Switch>
      </Router>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
