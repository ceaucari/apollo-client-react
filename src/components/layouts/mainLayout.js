import React from 'react';
import NavBar from './navBar';

const MainLayout = props => (
  <div className="app">
    <NavBar />
    <section class="section">
      <div className="container">{props.children}</div>
    </section>
  </div>
);

export default MainLayout;
