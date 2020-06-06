import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from '@reach/router';

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

const UserMenu = () => {
  const { data, loading, error } = useQuery(GET_ME);
  const me = data?.me;

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return <p>Not found</p>;

  const reload = window.location.pathname;

  const logout = () => {
    localStorage.removeItem('token');
    reload();
  };

  if (!me) {
    return <NavLink to="/login">Login</NavLink>;
  }
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link has-text-grey-light is-arrowless">
        {me.username}
      </a>
      <div className="navbar-dropdown">
        <Link to="/user" className="navbar-item has-text-dark is-arrowless">
          Profile
        </Link>
        <Link to={reload} onClick={logout} className="navbar-item">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default UserMenu;
