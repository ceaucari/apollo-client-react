import React from 'react';
import NavLink from './navLink';

const MainMenu = () => {
  return (
    <>
      <NavLink class="navbar-item" to="/">
        Home
      </NavLink>
      <NavLink class="navbar-item" to="/messages">
        Messages
      </NavLink>
    </>
  );
};

export default MainMenu;
