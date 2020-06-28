import React from 'react';
import NavBar from './navBar';

const MainLayout = props => (
  <>
    <NavBar />
    <section className="section">
      <div className="container">{props.children}</div>
    </section>
  </>
);

export default MainLayout;
