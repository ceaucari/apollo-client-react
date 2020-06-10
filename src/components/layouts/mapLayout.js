import React from 'react';
import NavBar from './navBar';
import MapDiv from '../map/MapDiv';

const MapLayout = (props) => (
  <div className="app">
    <NavBar />
    <section>
      <MapDiv />
    </section>
    <section>
      <div className="container">{props.children}</div>
    </section>
  </div>
);

export default MapLayout;
