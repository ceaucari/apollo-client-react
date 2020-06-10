import React from 'react';
import MapLayout from '../layouts/mapLayout';
import InteractiveMapWithList from '../map/InteractiveMapWithList';
// import StaticMapboxMap from '../map/StaticMapboxMap';

const MapPage = () => {
  // const latitude = '40.7555';
  // const longitude = '-73.6899';
  // const location = { latitude, longitude };
  return (
    <MapLayout>
      <InteractiveMapWithList />

      {/* <hr /> */}
      {/* <StaticMapboxMap location={location} /> */}
    </MapLayout>
  );
};

export default MapPage;
