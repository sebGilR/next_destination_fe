import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Home from '../containers/Home';

const App = ({
  changeDestinations,
  user,
  logIn,
  logOut,
  loading,
  startLoading,
  endLoading,
}) => {
  // Local State
  const [error, setError] = useState(false);

  // Handlers
  const handleFetchDestinations = React.useCallback(() => {
    startLoading();

    Axios.get(`${EP.BASE}${EP.DEST}`)
      .then(result => {
        changeDestinations(result.data.destinations);
        endLoading();
      })
      .catch(() => {
        setError(true);
      });
  }, [startLoading, endLoading, changeDestinations, setError]);

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
      {error ? 'Something went wrong' : null}
      {
        loading ? 'Loading content...' :
          <Router>
            <Switch>
              <Route exact path="/:id" component={user.connected ? Home : Login} />
              <Route exact path={'/'} component={user.connected ? Home : Login} />
              <Route path="/login" component={user.connected ? Home : Login} />
              <Route path="/signup" component={user.connected ? Home : SignUp} />
            </Switch>
          </Router>
      }

    </div>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  destinations: state.destinations,
  favorites: state.favorites,
  menu: state.menu,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  changeDestinations: data => dispatch(Actions.changeDestinations(data)),
  createUser: data => dispatch(Actions.createUser(data)),
  logIn: data => dispatch(Actions.logIn(data)),
  logOut: () => dispatch(Actions.logOut()),
  toggleMenu: () => dispatch(Actions.toggleMenu()),
  startLoading: () => dispatch(Actions.startLoading()),
  endLoading: () => dispatch(Actions.endLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
