import React from 'react';
import logo from './../../assets/logo.svg';
import MainMenu from '../menu/mainMenu';
import UserMenu from '../menu/userMenu';
import AdminMenu from '../menu/adminMenu';

const NavBar = () => {
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
            href="/"
            role="button"
            className="navbar-burger burger"
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
