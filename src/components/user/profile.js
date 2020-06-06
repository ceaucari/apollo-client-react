import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../utils/loading';
import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';

const s = {
  wrapper: {
    textAlign: 'left',
  },
};

const GET_ME = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

const Profile = () => {
  const { data, loading, error } = useQuery(GET_ME);
  const me = data?.me;

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <p>Not found</p>;

  return (
    <MainLayout>
      {me ? (
        <div style={s.wrapper}>
          <div>Id: {me.id}</div>
          <div>Username: {me.username}</div>
          <div>Email: {me.email}</div>
        </div>
      ) : (
        <div>Unauthenticated</div>
      )}
    </MainLayout>
  );
};

export default Profile;
