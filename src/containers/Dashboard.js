import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import * as EP from '../services/endpoint';
import * as Actions from '../store/actions';
import Header from '../components/Header';
import DestinationForm from '../components/DestinationForm';

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
  console.log(dest);

  const handleForm = e => {
    setForm(true);
    setNewD(true);
    setDest({});
  };

  const handleClose = () => {
    setForm(false);
    setNewD(false);
  }

  const handleSubmit = (name, description, img_url, id = 0) => {
    startLoading();

    if (newD) {
      Axios.post(`${EP.BASE}${EP.DEST}`, {
        name: name,
        description: description,
        img_url: img_url
      }, { withCredentials: true })
        .then(result => {
          addDestination(result.data.destination);
        })
        .catch(() => setError(true));
    } else {
      Axios.put(`${EP.BASE}${EP.DEST}/${id}`, {
        name: name,
        description: description,
        img_url: img_url
      }, { withCredentials: true })
        .then(result => {
          updateDestinations(result.data.destination);
        })
        .catch(() => setError(true));
    }

    endLoading();
  };

  const handleDelete = id => {
    startLoading();

    Axios.delete(`${EP.BASE}${EP.DEST}/${id}`, {
      withCredentials: true,
    })
      .then(() => removeDestination(id))
      .catch(() => setError(true));
    endLoading();
  }

  React.useEffect(() => {
    if (dest.id) {
      setForm(true);
      setNewD(false);
    }
  }, [dest])

  return (
    <section>
      {!loading && <Header title="Dashboard" toggleMenu={toggleMenu} />}
      {error && 'Something went wrong... Try reloading this page.'}
      <button name="new" onClick={handleForm}>New destination</button>
      {!loading && !form &&
        <table>
          <thead>
            <tr>
              <th>Destinations</th>
            </tr>
          </thead>
          <tbody>
            {
              destinations.map(destination =>
                <tr key={destination.id}>
                  <th>
                    <Link to={`/${destination.id}`}>
                      {destination.name}
                    </Link>
                  </th>
                  <th>
                    <button name="edit" onClick={() => setDest(destination)}>Edit</button>
                  </th>
                  <th>
                    <button onClick={() => handleDelete(destination.id)}>Delete</button>
                  </th>
                </tr>
              )
            }
          </tbody>
        </table>
      }
      {form &&
        <DestinationForm dest={dest} newD={newD} handleClose={handleClose} handleSubmit={handleSubmit} />
      }
    </section>
  )
}

const mapStateToProps = state => ({
  user: state.user,
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
