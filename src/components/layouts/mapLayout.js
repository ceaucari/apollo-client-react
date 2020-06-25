import React from 'react';
import NavBar from './navBar';

const mapStyle = {
  width: '100%',
  height: '400px',
};

const MapLayout = props => (
  <>
    <NavBar />
    <section>
      <div id="map" style={mapStyle}></div>
    </section>
    <section>
      <div className="container">{props.children}</div>
    </section>
  </>
);

export default MapLayout;
