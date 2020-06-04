import React from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../utils/loading';
import Error from '../utils/error';

const s = {
  wrapper: {
    textAlign: 'left',
  },
};

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const GET_ME = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

// export const isLoggedIn = bool => {
//   return bool;
// };

const Profile = () => {
  const { data, loading, error } = useQuery(GET_ME);
  const me = data?.me;

  // // const setLoggedIn = () => {
  // if (data?.me) {
  //   isLoggedIn(true);
  //   // return true;
  // }
  // isLoggedIn(false);
  // // return false;
  // // };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <p>Not found</p>;

  return (
    <>
      {me ? (
        <div style={s.wrapper}>
          <div>Id: {me.id}</div>
          <div>Username: {me.username}</div>
          <div>Email: {me.email}</div>
        </div>
      ) : (
        <div>Unauthenticated</div>
      )}
    </>
  );
};

export default Profile;
