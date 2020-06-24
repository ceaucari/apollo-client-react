import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';
import { Link } from '@reach/router';
import { SIGNIN } from './graphql';

const Login = () => {
  const inp = {
    login: '',
    password: '',
  };

  const [inputs, setInputs] = useState(inp);
  const [error, setError] = useState();

  const updateCache = (cache, { data }) => {
    localStorage.setItem('token', data.signIn.token);
  };

  const completed = data => {
    setInputs(inp);
    window.location = '/';
  };

  const [signIn] = useMutation(SIGNIN, {
    update: updateCache,
    onCompleted: data => completed(data),
  });

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      signIn({
        variables: {
          login: inputs.login,
          password: inputs.password,
        },
      }).catch(err => {
        console.log('UNHANDLED ERR', err);
        setError(err);
      });
    }
  };

  return (
    <MainLayout>
      <div className="level column is-4 is-offset-4">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Login</label>
            <input
              className="input"
              type="text"
              placeholder="Email or username"
              name="login"
              onChange={handleInputChange}
              value={inputs.login}
              required
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              required
            />
          </div>
          {error && <Error error={error} />}
          <button className="button is-link is-fullwidth" type="submit">
            Login
          </button>
          <div className="has-text-centered column">
            <span>Not registered? </span>
            <Link to="/register">Create an account</Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
