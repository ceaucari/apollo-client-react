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
      <NavLink className="navbar-item" to="/docs">
        Docs
      </NavLink>
      <NavLink className="navbar-item" to="/search">
        Search
      </NavLink>
    </>
  );
};

export default MainMenu;
