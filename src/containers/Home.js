import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Carousel from '../components/Carousel';
import Favorites from '../components/Favorites';
import Details from '../components/Details';
import Dashboard from '../components/Dashboard';

const Home = ({ user, destinations }) => {
  return (
    <Router>
      <Menu user={user} />
      <Header />
      <Switch>
        <Route exact path="/">
          <Carousel destinations={destinations} />
        </Route>
        <Route path="/favorites">
          <Favorites favorites={user.favorites} />
        </Route>
        <Route path="/dashboard" component={user.admin && Dashboard} />
        <Route exact path="/:id" children={<Details />} />
      </Switch>
    </Router>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  destinations: state.destinations,
});

export default connect(mapStateToProps, null)(Home);
