import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteDest, updateDest, saveNewDest
} from '../services/endpoint';
import * as Actions from '../store/actions';
import Header from '../components/Header';
import DestinationForm from '../components/DestinationForm';
import styles from '../assets/style/Dashboard.module.scss';

const Dashboard = ({
  destinations,
  loading,
  toggleMenu,
  startLoading,
  endLoading,
  addDestination,
  updateDestinations,
  removeDestination,
}) => {
  const [error, setError] = useState(false);
  const [form, setForm] = useState(false);
  const [newD, setNewD] = useState(false);
  const [dest, setDest] = useState({});

  const handleForm = () => {
    setForm(true);
    setNewD(true);
    setDest({});
  };

  const handleClose = () => {
    setForm(false);
    setNewD(false);
  };

  const handleSubmit = (name, description, imgUrl, id = 0) => {
    startLoading();

    if (newD) {
      saveNewDest({
        name,
        description,
        img_url: imgUrl,
      }, addDestination, setError)
    } else {
      updateDest(id,
        {
          name,
          description,
          img_url: imgUrl,
        }, updateDestinations, setError)
    }

    endLoading();
  };

  const handleDelete = id => {
    startLoading();
    deleteDest(id, removeDestination, setError);
    endLoading();
  };

  React.useEffect(() => {
    if (dest.id) {
      setForm(true);
      setNewD(false);
    }
  }, [dest]);

  return (
    <section className={styles.wrapper}>
      {!loading
        && (
          <Header
            title="Dashboard"
            toggleMenu={toggleMenu}
            className={styles.header}
          />
        )}
      {error && !dest && 'Something went wrong... Try reloading this page.'}

      {!loading && !form
        && (
          <table className={styles.container}>
            <thead>
              <tr>
                <th colSpan={1}>Destinations</th>
                <th colSpan={2}>
                  <button type="button" name="new" onClick={handleForm} className={styles.new}>
                    New destination
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                destinations.map(destination => (
                  <tr key={destination.id}>
                    <td>
                      <Link to={`/${destination.id}`}>
                        {destination.name}
                      </Link>
                    </td>
                    <td>
                      <button type="button" name="edit" onClick={() => setDest(destination)}>Edit</button>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDelete(destination.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
      {form
        && (
          <DestinationForm
            dest={dest}
            newD={newD}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />
        )}
    </section>
  );
};

Dashboard.defaultProps = {
  destinations: [],
};

Dashboard.propTypes = {
  destinations: PropTypes.arrayOf(Object),
  startLoading: PropTypes.func.isRequired,
  endLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  addDestination: PropTypes.func.isRequired,
  updateDestinations: PropTypes.func.isRequired,
  removeDestination: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  destinations: state.destinations,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(Actions.startLoading()),
  endLoading: () => dispatch(Actions.endLoading()),
  toggleMenu: () => dispatch(Actions.toggleMenu()),
  addDestination: data => dispatch(Actions.addDestination(data)),
  updateDestinations: data => dispatch(Actions.updateDestinations(data)),
  removeDestination: data => dispatch(Actions.removeDestination(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
