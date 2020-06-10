import React from 'react';
import GoogleMap from './GoogleMap';

const mapConfig = {
  style: {
    width: '100%',
    height: '500px',
  },
  center: {
    lat: 40.7484405,
    lng: -73.9944191,
  },
  zoom: 12,
};

const InteractiveMap = () => {
  return <GoogleMap {...mapConfig} />;
};

export default InteractiveMap;
