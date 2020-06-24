import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_USERS, GET_USER, DELETE_USER } from './graphql';
import Error from '../utils/error';
import Loading from '../utils/loading';

const UserDelete = ({ userId, userDeleted }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const user = data?.user;

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: userDeleted,
  });

  const handleDeleteUser = userId => {
    deleteUser({
      variables: { id: userId },
    }).catch(err => {
      console.log('UNHANDLED ERR', err);
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <p>Please confirm you want to delete user:</p>
      <h4 className="title is-4">{user?.username}</h4>
      <button
        className="button is-link is-fullwidth"
        onClick={() => handleDeleteUser(user.id)}
      >
        Delete user
      </button>
    </>
  );
};

export default UserDelete;
