import React, { useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import * as Actions from '../store/actions';
import * as EP from '../services/endpoint';
import { Link } from 'react-router-dom';
import styles from '../assets/style/Login.module.scss';
Axios.defaults.withCredentials = true;

const Login = ({
  logIn,
  loading,
}) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    Axios.post(`${EP.BASE}${EP.AUTH}/login`, {
      username: username,
    })
      .then(result => {
        logIn(result.data);
      })
      .catch(() => setError(true));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Sign in</h1>
        <p>Hello there! Sign in to start making your travel plans!</p>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleUsername}
          />
          {
            loading ?
              <p>Signing in...</p> :
              <button type="submit" className={styles.button}>Sign in</button>
          }
          {
            error ?
              'Make sure your credentials are correct.' :
              null
          }
          <p className={styles.alt}>
            Don't have an account yet?
            <Link to="/signup"> Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  logIn: data => dispatch(Actions.logIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
