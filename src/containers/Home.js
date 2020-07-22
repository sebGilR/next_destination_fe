import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, useHistory,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Carousel from '../components/Carousel';
import Favorites from './Favorites';
import Details from './Details';
import Dashboard from './Dashboard';
import { logOutUser } from '../services/endpoint';
import * as Actions from '../store/actions';

const Home = ({
  user, destinations, logOut, menu, toggleMenu,
}) => {
  const history = useHistory();
  const handleLogOut = () => {
    logOutUser(logOut, history.push)
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
          <Carousel destinations={destinations} menu={menu} toggleMenu={toggleMenu} />
        </Route>
      </Switch>
    </Router>
  );
};

Home.defaultProps = {
  destinations: [],
};

Home.propTypes = {
  destinations: PropTypes.arrayOf(Object),
  user: PropTypes.objectOf(Object).isRequired,
  logOut: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  menu: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  destinations: state.destinations,
  menu: state.menu,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(Actions.logOut()),
  toggleMenu: () => dispatch(Actions.toggleMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
