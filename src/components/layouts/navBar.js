import React from 'react';
import logo from './../../assets/logo.svg';
import MainMenu from '../nav/mainMenu';
import UserMenu from '../nav/userMenu';

const TopNav = () => {
  return (
    <nav
      class="navbar has-background-link"
      role="navigation"
      ariaLabel="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img class="logo" src={logo} alt="logo" />
          </a>

          <a
            href="/"
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarTarget"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarTarget" class="navbar-menu">
          <div class="navbar-start">
            <MainMenu />
          </div>

          <div class="navbar-end">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
