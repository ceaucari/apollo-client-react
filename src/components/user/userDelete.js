import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Link } from '@reach/router';

import Error from '../utils/error';
import Loading from '../utils/loading';

const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
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

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const UserDelete = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const user = data?.user;
  // const [userData, setUserData] = useState();

  // const inp = {
  //   name: user?.username,
  //   email: user?.email,
  //   role: user?.role,
  // };

  // useEffect(() => {
  //   setInputs({
  //     name: user?.username,
  //     email: user?.email,
  //     role: user?.role,
  //   });
  // }, [user]);

  // const [inputs, setInputs] = useState(inp);
  const [err, setErr] = useState();

  // const updateCache = (cache, { data }) => {
  //   localStorage.setItem('token', data.signUp.token);
  // };

  const completed = data => {
    // setInputs(inp);
    // Redirect to user profile??
    // Reload Users page?
    window.location.reload();
  };

  const [deleteUser] = useMutation(DELETE_USER, {
    // update: updateCache,
    onCompleted: data => completed(data),
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <p>Not found</p>;

  // const handleInputChange = event => {
  //   event.persist();
  //   setInputs(inputs => ({
  //     ...inputs,
  //     [event.target.name]: event.target.value,
  //   }));
  // };

  const handleDelete = userId => {
    deleteUser({
      variables: { id: userId },
    }).catch(err => {
      console.log('UNHANDLED ERR', err);
      setErr(err);
    });
  };

  return (
    <>
      <div>Are you sure you want to delete user:</div>
      <h4 className="title is-4">{user?.username}</h4>
      {/* <div>{user?.username}</div> */}
      <button
        className="button is-link is-fullwidth"
        onClick={() => handleDelete(user.id)}
      >
        Delete user
      </button>
    </>
  );
};

export default UserDelete;
