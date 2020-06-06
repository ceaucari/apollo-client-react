import React from 'react';
import NavBar from './navBar';

const MainLayout = props => (
  <div className="app">
    <NavBar />
    <section className="section">
      <div className="container">{props.children}</div>
    </section>
  </div>
);

export default MainLayout;
