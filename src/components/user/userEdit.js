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
import { GET_USER, UPDATE_USER } from './graphql';
import Error from '../utils/error';
import Loading from '../utils/loading';

const UserEdit = ({ userId, userUpdated }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const user = data?.user;

  const inp = {
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    role: user?.role,
  };

  useEffect(() => {
    setInputs({
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      role: user?.role || 'USER',
    });
  }, [user]);

  const [inputs, setInputs] = useState(inp);

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: userUpdated,
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
      updateUser({
        variables: {
          id: userId,
          username: inputs.username,
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          role: inputs.role,
        },
      }).catch(err => {
        console.log('UNHANDLED ERR', err);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">User name:</label>
        <input
          className="input"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
          value={inputs.username}
          required
        />
      </div>
      <div className="field">
        <label className="label">First name:</label>
        <input
          className="input"
          type="text"
          placeholder="First name"
          name="firstName"
          onChange={handleInputChange}
          value={inputs.firstName}
        />
      </div>
      <div className="field">
        <label className="label">Last name:</label>
        <input
          className="input"
          type="text"
          placeholder="Last name"
          name="lastName"
          onChange={handleInputChange}
          value={inputs.lastName}
        />
      </div>
      <div className="field">
        <label className="label">Role:</label>
        <div className="select is-fullwidth">
          <select name="role" value={inputs.role} onChange={handleInputChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>
      {error && <Error error={error} />}
      <button className="button is-link is-fullwidth" type="submit">
        Save changes
      </button>
    </form>
  );
};

export default UserEdit;
