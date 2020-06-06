import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import NavLink from './navLink';
import Loading from '../utils/loading';
import Error from '../utils/error';

const GET_ME = gql`
  query {
    me {
      id
      username
      email
    }
  }
`;

const AdminMenu = () => {
  const { data, loading, error } = useQuery(GET_ME);
  const me = data?.me;

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <p>Not found</p>;

  if (!me) {
    return null;
  }
  return (
    <>
      <NavLink class="navbar-item" to="/admin/users">
        Users
      </NavLink>
    </>
  );
};

export default AdminMenu;
