import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Carousel from '../components/Carousel';
import Favorites from '../components/Favorites';
import Details from '../components/Details';
import Dashboard from './Dashboard';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';

const Home = ({ user, destinations, logOut, menu, toggleMenu }) => {
  const history = useHistory();
  const handleLogOut = () => {
    Axios.delete(`${EP.BASE}${EP.AUTH}/logout`,
      { withCredentials: true })
      .then(() => {
        logOut();
        history.push('/login');
      });
  };

  return (
    <Router>
      <Menu user={user} handleLogOut={handleLogOut} menu={menu} toggleMenu={toggleMenu} />
      <Switch>
        <Route path="/favorites">
          <Favorites favorites={user.favorites} />
        </Route>
        <Route path="/dashboard" component={user.admin && Dashboard} />
        <Route exact path="/:id">
          <Details />
        </Route>
        <Route path="/">
          <Header title="Home" home menu={menu} toggleMenu={toggleMenu} />
          <Carousel destinations={destinations} menu={menu} />
        </Route>
      </Switch>
    </Router>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  destinations: state.destinations,
  loading: state.loading,
  menu: state.menu,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(Actions.logOut()),
  toggleMenu: () => dispatch(Actions.toggleMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
