import React from 'react';
import GoogleMap, { result } from './GoogleMap';

const mapConfig = {
  style: {
    width: '100%',
    height: '500px',
  },
  center: {
    // lat: 40.7484405,
    // lng: -73.9944191,
    lat: -28.024,
    lng: 140.887,
  },
  zoom: 6,
};

const locations = [
  { name: 'A', position: { lat: -31.56391, lng: 147.154312 } },
  { name: 'B', position: { lat: -33.727111, lng: 150.371124 } },
  { name: 'C', position: { lat: -33.848588, lng: 151.209834 } },
  { name: 'D', position: { lat: -42.735258, lng: 147.438 } },
  { name: 'E', position: { lat: -43.999792, lng: 170.463352 } },
];

const InteractiveMap = () => {
  console.log('visibleM:', result);

  return <GoogleMap locations={locations} config={mapConfig} />;
};

export default InteractiveMap;
