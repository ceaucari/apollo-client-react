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
      <NavLink className="navbar-item" to="/map">
        Map
      </NavLink>
    </>
  );
};

export default MainMenu;
