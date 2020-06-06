import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';

import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';
import { Link } from '@reach/router';

const SIGNIN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

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
    // navigate('/');
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
      <div class="level column is-4 is-offset-4">
        <form onSubmit={handleSubmit}>
          <div class="field">
            <label class="label">Login</label>
            <input
              class="input"
              type="text"
              placeholder="Email or username"
              name="login"
              onChange={handleInputChange}
              value={inputs.login}
              required
            />
          </div>
          <div class="field">
            <label class="label">Password</label>
            <input
              class="input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              required
            />
          </div>
          {error && <Error error={error} />}
          <button class="button is-link is-fullwidth" type="submit">
            Login
          </button>
          <div class="has-text-centered column">
            <span>Not registered? </span>
            <Link to="/register">Create an account</Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
