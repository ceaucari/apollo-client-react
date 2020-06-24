import React from 'react';

const DocsTopNav = () => {
  return (
    <div className="top-navbar">
      <nav className="top-menu">
        <div className="docs-logo">xxx > xxx > xxx </div>
        <ul>
          <TempLink />
          <TempLink />
          <TempLink />
        </ul>
      </nav>
      <nav className="top-menu">
        <ul>
          <TempLink />
          <TempLink />
        </ul>
      </nav>
    </div>
  );
};

export default DocsTopNav;

const TempLink = () => {
  return (
    <li>
      <a href="#">
        <i className="fa fa-user"></i>
      </a>
    </li>
  );
};
