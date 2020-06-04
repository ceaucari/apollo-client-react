import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';

import MainLayout from '../layouts/mainLayout';
import { form } from '../../styles';

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

  const updateCache = (cache, { data }) => {
    localStorage.setItem('token', data.signUp.token);
    // client.writeData({ data: { isLoggedIn: true } });
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
      // alert(`User Created! Name: ${inputs.name} Email: ${inputs.email}`);
      signup({
        variables: {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password,
        },
      });
    }
  };

  return (
    <MainLayout>
      <div style={form.container}>
        <form onSubmit={handleSubmit}>
          <div style={form.field}>
            <label style={form.label}>Name</label>
            <input
              style={form.input}
              type="text"
              name="name"
              onChange={handleInputChange}
              value={inputs.name}
              required
            />
          </div>
          <div style={form.field}>
            <label style={form.label}>Email</label>
            <input
              style={form.input}
              type="email"
              name="email"
              onChange={handleInputChange}
              value={inputs.email}
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
          <button style={form.button} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Signup;
