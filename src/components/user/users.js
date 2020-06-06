import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';

const GET_USERS = gql`
  query {
    users {
      id
      username
      email
      role
      messages {
        id
        createdAt
        text
      }
    }
  }
`;

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const users = data?.users;

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  // if (!data) return <p>Not found</p>;

  return (
    <MainLayout>
      {users?.map(user => (
        <>
          <div key={user.id}>
            <div>{user.id}</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.role || 'USER'}</div>
            {/* <span>{`${new Date(user.createdAt).toLocaleString()}`}</span> */}
            <div>
              {user.messages.map(message => (
                <div key={message.id}>
                  <div>{message.id}</div>
                  <div>{`${new Date(message.createdAt).toLocaleString()}`}</div>
                  <div>{message.text}</div>
                </div>
              ))}{' '}
            </div>
          </div>
          <hr />
        </>
      ))}
    </MainLayout>
  );
};

export default Users;
