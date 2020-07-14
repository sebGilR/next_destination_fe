import React, { useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import * as Actions from '../store/actions';
import * as EP from '../services/endpoint';

const Login = props => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    Axios.post(`${EP.BASE}${EP.AUTH}/login`, {
      username: username,
    })
      .then(result => {
        props.logIn(result.data);
        // props.history.push('/home');
      })
      .catch(() => setError(true));
  };

  React.useEffect(() => {
    props.user.message ? console.log('logged in')
      : console.log('undefined')
  }, [props.user]);

  return (
    <div>
      <div>

        <h1>Sign in</h1>
        <p>Hello there! Sign in to start making your travel plans!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={handleUsername}
          />
          {
            loading ?
              <p>Signing in...</p> : <button type="submit">Sign in</button>
          }
          {
            error ?
              'There was an error when trying to sign in. Please verify your credentials.' :
              null
          }
        </form>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logIn: data => {
    dispatch(Actions.logIn(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
