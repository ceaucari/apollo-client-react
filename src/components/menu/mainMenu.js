import React from 'react';
import NavLink from './navLink';

const MainMenu = () => {
  return (
    <>
      <NavLink className="navbar-item" to="/">
        Home
      </NavLink>
      <NavLink className="navbar-item" to="/messages">
        Messages
      </NavLink>
    </>
  );
};

export default MainMenu;
