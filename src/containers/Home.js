import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Carousel from '../components/Carousel';
import Favorites from '../components/Favorites';
import Details from '../components/Details';
import Dashboard from '../components/Dashboard';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';

const Home = ({ user, destinations, logOut, loading }) => {
  const history = useHistory();
  const handleLogOut = () => {
    Axios.delete(`${EP.BASE}${EP.AUTH}/logout`,
      { withCredentials: true })
      .then(() => {
        logOut();
        history.push('/login');
      });
  }
  return (
    <Router>
      <Menu user={user} handleLogOut={handleLogOut} />
      <Header />
      <Switch>
        <Route path="/favorites">
          <Favorites favorites={user.favorites} />
        </Route>
        <Route path="/dashboard" component={user.admin && Dashboard} />
        <Route exact path="/:id" component={Details} />
        <Route path="/">
          <Carousel destinations={destinations} />
        </Route>
      </Switch>
    </Router>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  destinations: state.destinations,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(Actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
