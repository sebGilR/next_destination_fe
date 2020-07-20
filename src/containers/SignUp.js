import React, { useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
import * as EP from '../services/endpoint';
import styles from '../assets/style/Login.module.scss';
import Input from '../components/Input';


const SignUp = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password_conf, setPasswordConf] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInput = e => {
    const field = e.target;
    if (field.name === 'username') {
      setUsername(field.value);
    } else if (field.name === 'password') {
      setPassword(field.value);
    } else {
      setPasswordConf(field.value);
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    Axios.post(`${EP.BASE}${EP.USERS}`, {
      username: username,
      password: password,
      password_confirmation: password_conf,
    })
      .then(result => {
        props.createUser(result.data);
      })
      .catch(() => setError(true));
  };

  React.useEffect(() => {
    props.user.message ? console.log('logged in')
      : console.log('undefined')
  }, [props.user]);

  const testPasswors = () => {
    if (password.length < 5 || username.length < 3) {
      return (
        <>
          <small>Your password should be at least 5 characters.</small>
          <small>Your username should be at least 3 characters long.</small>
        </>
      )
    } else if (password === password_conf && password.length > 5 && username.length > 3) {
      return <button type="submit" className={styles.button}>Sign up</button>
    } else {
      return <small style={{ color: '#EE5419' }}>The passwords entered do not match.</small>
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Sign up</h1>
        <p>Hello there! Sign up to start making your travel plans!</p>
        <form onSubmit={handleSubmit}>
          <Input type="text"
            name="username"
            value={username}
            placeholder="Enter a username..."
            onChange={handleInput} />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleInput}
          />
          <Input
            type="password"
            name="password_conf"
            value={password_conf}
            placeholder="Confirm your password"
            onChange={handleInput}
          />
          {
            loading ?
              'Creating account...' :
              testPasswors()
          }
          {
            error ?
              'There was an error signing up. Please try again.' :
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
