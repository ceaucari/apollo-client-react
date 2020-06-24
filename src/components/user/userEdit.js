// import React from 'react';
// import MainLayout from '../layouts/mainLayout';
// import Upload from '../utils/upload';
// import Files from '../utils/files';

// // import { CreateUploadLink, createUploadLink } from 'apollo-upload-client';

// const UserFrom = () => {
//   return (
//     <MainLayout>
//       <Upload />
//       <Files />
//     </MainLayout>
//   );
// };

// export default UserFrom;

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Link } from '@reach/router';
import { GET_USER, SIGNUP } from './graphql';
import Error from '../utils/error';
import Loading from '../utils/loading';

const UserEdit = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const user = data?.user;
  const [userData, setUserData] = useState();

  // const inp = {
  //   name: '',
  //   email: '',
  //   role: '',
  // };
  const inp = {
    name: user?.username,
    email: user?.email,
    role: user?.role,
  };

  useEffect(() => {
    setInputs({
      name: user?.username,
      email: user?.email,
      role: user?.role,
    });
  }, [user]);

  const [inputs, setInputs] = useState(inp);
  const [err, setErr] = useState();

  // const updateCache = (cache, { data }) => {
  //   localStorage.setItem('token', data.signUp.token);
  // };

  const completed = data => {
    setInputs(inp);
    // Redirect to user profile??
    // Reload Users page?
  };

  const [signup] = useMutation(SIGNUP, {
    // update: updateCache,
    onCompleted: data => completed(data),
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <p>Not found</p>;

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
        setErr(err);
      });
    }
  };

  return (
    // <div className="level column is-4 is-offset-4">
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name:</label>
        <input
          className="input"
          type="text"
          placeholder="Username"
          name="name"
          onChange={handleInputChange}
          value={inputs.name}
          required
        />
      </div>
      <div className="field">
        <label className="label">Email:</label>
        <input
          className="input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={inputs.email}
          required
        />
      </div>
      <div className="field">
        <label className="label">Role:</label>
        <input
          className="input"
          type="text"
          placeholder="Role"
          name="role"
          onChange={handleInputChange}
          value={inputs.role}
          required
        />
      </div>
      {error && <Error error={error} />}
      <button className="button is-link is-fullwidth" type="submit">
        Save changes
      </button>
    </form>
    // </div>
  );
};

export default UserEdit;
