import React, { useState } from 'react';
import logo from './../../assets/logo.svg';
import MainMenu from '../menus/mainMenu';
import UserMenu from '../menus/userMenu';
import AdminMenu from '../menus/adminMenu';

const NavBar = () => {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  };

  return (
    <nav
      className="navbar has-background-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img className="logo" src={logo} alt="logo" />
          </a>

          <a
            onClick={toggle}
            role="button"
            className={`navbar-burger burger ${active && 'is-active'}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarTarget"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarTarget" className="navbar-menu">
          <div className="navbar-start">
            <MainMenu />
          </div>

          <div className="navbar-end">
            <UserMenu />
            <AdminMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
