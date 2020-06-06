import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { Link } from '@reach/router';

import MainLayout from '../layouts/mainLayout';
import Error from '../utils/error';

const SIGNUP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const Signup = () => {
  const inp = {
    name: '',
    email: '',
    password: '',
  };

  const [inputs, setInputs] = useState(inp);
  const [error, setError] = useState();

  const updateCache = (cache, { data }) => {
    localStorage.setItem('token', data.signUp.token);
  };

  const completed = data => {
    setInputs(inp);
    console.log('xDATA:', data);
    console.log('LocalStorage Token:', localStorage.getItem('token'));
  };

  const [signup] = useMutation(SIGNUP, {
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
      signup({
        variables: {
          username: inputs.name,
          email: inputs.email,
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
            <label class="label">Name</label>
            <input
              class="input"
              type="text"
              placeholder="Username"
              name="name"
              onChange={handleInputChange}
              value={inputs.name}
              required
            />
          </div>
          <div class="field">
            <label class="label">Email</label>
            <input
              class="input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={inputs.email}
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
            Sign up
          </button>
          <div class="has-text-centered column">
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Signup;
