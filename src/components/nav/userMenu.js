import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from '@reach/router';

import NavLink from './navLink';
import { nav } from '../../styles';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const UserMenu = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  const reload = window.location.pathname;

  const logout = () => {
    localStorage.removeItem('token');
    reload();
  };

  if (data.isLoggedIn) {
    return (
      <Link to={reload} onClick={logout} style={nav.mainNavLink}>
        Logout
      </Link>
    );
  }
  return (
    <>
      <NavLink to="/login">Login</NavLink>
    </>
  );
};

export default UserMenu;
