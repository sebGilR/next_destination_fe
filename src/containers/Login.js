import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
import { logInUser } from '../services/endpoint';
import styles from '../assets/style/Login.module.scss';
import Input from '../components/Input';

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
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    logInUser({
      username,
      password,
    }, logIn, setError);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Sign in</h1>
        <p>Hello there! Sign in to start making your travel plans!</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleInput}
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleInput}
          />
          {
            loading
              ? <p>Signing in...</p>
              : <button type="submit" className={styles.button}>Sign in</button>
          }
          {
            error
              ? <small style={{ color: '#EE5419' }}>Make sure your credentials are correct.</small>
              : null
          }
          <p className={styles.alt}>
            Don&apos;t have an account yet?
            <Link to="/signup"> Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  logIn: data => dispatch(Actions.logIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
