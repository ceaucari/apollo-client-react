import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';

import { form } from '../../styles';
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
      <div style={form.container}>
        <form onSubmit={handleSubmit}>
          <div style={form.field}>
            <label style={form.label}>Login</label>
            <input
              style={form.input}
              type="text"
              name="login"
              onChange={handleInputChange}
              value={inputs.login}
              required
            />
          </div>
          <div style={form.field}>
            <label style={form.label}>Password</label>
            <input
              style={form.input}
              type="password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              required
            />
          </div>
          {error && <Error error={error} />}
          <div>
            <button style={form.button} type="submit">
              Login
            </button>
          </div>
          <div style={form.linkWrapper}>
            Not registered?
            <Link to="/register" style={form.link}>
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
