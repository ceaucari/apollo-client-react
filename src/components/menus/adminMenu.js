import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import NavLink from './navLink';

const GET_ME = gql`
  query {
    me {
      id
      username
      email
      role
    }
  }
`;

const AdminMenu = () => {
  const { data } = useQuery(GET_ME);
  const me = data?.me;

  if (me?.role !== 'ADMIN') {
    return null;
  }

  return (
    <>
      <NavLink className="navbar-item" to="/admin/users">
        Users
      </NavLink>
    </>
  );
};

export default AdminMenu;
