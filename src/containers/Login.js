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
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleInput = e => {
    const field = e.target;
    if (field.name === 'username') {
      setUsername(field.value);
    } else if (field.name === 'password') {
      setPassword(field.value);
    };
  }

  const handleSubmit = e => {
    e.preventDefault();

    Axios.post(`${EP.BASE}${EP.AUTH}/login`, {
      username: username,
      password: password,
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
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            className={styles.input}
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleInput}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleInput}
          />
          {
            loading ?
              <p>Signing in...</p> :
              <button type="submit" className={styles.button}>Sign in</button>
          }
          {
            error ?
              <small style={{ color: '#EE5419' }}>Make sure your credentials are correct.</small> :
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
