import React from 'react';
import NavLink from './navLink';
// import { Link } from '@reach/router';

const MainMenu = () => {
  return (
    <>
      <NavLink className="main-nav-link" to="/">
        Home
      </NavLink>
      <NavLink className="main-nav-link" to="/messages">
        Messages
      </NavLink>
    </>
  );
};

export default MainMenu;
