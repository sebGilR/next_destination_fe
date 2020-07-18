import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Home from '../containers/Home';

const App = ({
  changeDestinations,
  destinations,
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
  }, [verifyConnection, destinations]);

  React.useEffect(() => {
    handleFetchDestinations();
  }, [handleFetchDestinations, user.favorites]);

  return (
    <div>
      {error ? 'Something went wrong' : null}
      {
        loading ? 'Loading content...' :
          <Router>
            <Switch>
              <Route exact path="/" component={user.connected ? Home : Login} />
              <Route path="/login">
                {user.connected ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route path="/signup" >
                {user.connected ? <Redirect to="/" /> : <SignUp />}
              </Route>
              <Route exact path="/:id" component={user.connected ? Home : Login} />
            </Switch>
          </Router>
      }

    </div>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  changeDestinations: data => dispatch(Actions.changeDestinations(data)),
  logIn: data => dispatch(Actions.logIn(data)),
  logOut: () => dispatch(Actions.logOut()),
  startLoading: () => dispatch(Actions.startLoading()),
  endLoading: () => dispatch(Actions.endLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
