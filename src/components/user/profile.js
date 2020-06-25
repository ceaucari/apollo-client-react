import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';
import { GET_USER } from './graphql';

const s = {
  wrapper: {
    textAlign: 'left',
  },
};

const Profile = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });
  const user = data?.user;

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <p>Not found</p>;

  return (
    <MainLayout>
      <div style={s.wrapper}>
        <div>Id: {user.id}</div>
        <div>Username: {user.username}</div>
        <div>First name: {user.firstName}</div>
        <div>Last name: {user.lastName}</div>
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
        <div>
          Member since: {` ${new Date(user.createdAt).toLocaleDateString()}`}
        </div>
        <hr />
        <h3>Messages:</h3>
        {user.messages.map(message => (
          <div key={message.id}>
            <span>{`[${message.id}] - `}</span>
            <span>{` ${new Date(message.createdAt).toLocaleString()}`}</span>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Profile;

// TODO: Hide fields for other users?
