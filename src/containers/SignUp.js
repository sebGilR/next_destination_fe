import React, { useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import * as Actions from '../store/actions';
import * as EP from '../services/endpoint';
import styles from '../assets/style/Login.module.scss';
import { Link } from 'react-router-dom';

const SignUp = props => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    Axios.post(`${EP.BASE}${EP.USERS}`, {
      username: username,
    })
      .then(result => {
        props.createUser(result.data);
        // props.history.push('/home');
      })
      .catch(() => setError(true));
  };

  React.useEffect(() => {
    props.user.message ? console.log('logged in')
      : console.log('undefined')
  }, [props.user]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Sign up</h1>
        <p>Hello there! Sign up to start making your travel plans!</p>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            value={username}
            placeholder="Enter a username..."
            onChange={handleUsername}
          />
          {
            loading ?
              <p>Creating your account...</p> :
              <button type="submit" className={styles.button}>Sign up</button>
          }
          {
            error ?
              'There was an error when trying to sign in. Please verify your credentials.' :
              null
          }
          <p className={styles.alt}>
            Already have an account?
            <Link to="/login"> Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createUser: data => {
    dispatch(Actions.createUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
