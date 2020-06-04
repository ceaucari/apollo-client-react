import React from 'react';
import logo from './../../assets/logo.svg';
import MainMenu from '../nav/mainMenu';
import UserMenu from '../nav/userMenu';

import { nav } from '../../styles';

const TopNav = () => {
  return (
    <header style={nav.mainNav}>
      <div>
        <nav style={nav.level}>
          <a className="logo" href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <a className="title" href="/" style={nav.titleLink}>
            <span className="app-title" style={nav.title}>
              Apollo client app.
            </span>
          </a>
        </nav>
      </div>
      <div style={nav.inLine}>
        <nav>
          <MainMenu />
        </nav>
        <nav>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
