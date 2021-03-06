import React, { useEffect } from 'react';
import loadGoogleMapsApi from 'load-google-maps-api';
import 'dotenv/config';

const defaultConfig = {
  style: {
    width: '500px',
    height: '500px',
  },
  center: {
    lat: 40.7484405,
    lng: -73.9944191,
  },
  zoom: 12,
};

const GoogleMap = (config) => {
  let c = defaultConfig;
  if (config.center) {
    c = config;
  }

  useEffect(() => {
    gMap();
  }, []);

  const gMap = () =>
    loadGoogleMapsApi({
      key: process.env.REACT_APP_GOOGLEMAPS_KEY,
    })
      .then((googleMaps) => {
        const map = new googleMaps.Map(document.getElementById('map'), {
          center: c.center,
          zoom: 12,
        });
        const marker = new googleMaps.Marker({ position: c.center, map: map });
      })
      .catch((error) => {
        console.error(error);
      });

  return <div id="map" style={c.style || defaultConfig.style}></div>;
};

export default GoogleMap;
