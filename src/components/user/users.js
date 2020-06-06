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
      <table className="table">
        <thead>
          <tr>
            <th>-</th>
            <th>ID</th>
            <th>username</th>
            <th>email</th>
            <th>role</th>
            <th>messages</th>
            <th>action</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role || 'USER'}</td>
              {/* <span>{`${new Date(user.createdAt).toLocaleString()}`}</span> */}
              {/* <td>
                {user.messages.map(message => (
                  <div key={message.id}>
                    <div>{message.id}</div>
                    <div>{`${new Date(
                      message.createdAt
                    ).toLocaleString()}`}</div>
                    <div>{message.text}</div>
                  </div>
                ))}{' '}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default Users;
