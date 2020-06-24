import React, { useEffect } from 'react';
import loadGoogleMapsApi from 'load-google-maps-api';
import MarkerClusterer from '@google/markerclusterer';
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
        // console.log('googleMaps:', googleMaps);

        MapSettings(googleMaps);
      })
      .catch((error) => {
        console.error(error);
      });

  return <div id="map" style={c.style || defaultConfig.style}></div>;
};

export default GoogleMap;

// -----------------------------------------------------------------------
// Events

const MapSettings = (googleMaps) => {
  const map = new googleMaps.Map(document.getElementById('map'), {
    zoom: 3,
    center: { lat: -28.024, lng: 140.887 },
  });

  const locations = [
    { name: 'A', position: { lat: -31.56391, lng: 147.154312 } },
    // { name: 'B', position: { lat: -33.718234, lng: 150.363181 } },
    { name: 'C', position: { lat: -33.727111, lng: 150.371124 } },
    { name: 'D', position: { lat: -33.848588, lng: 151.209834 } },
    // { name: 'E', position: { lat: -33.851702, lng: 151.216968 } },
    // { name: 'F', position: { lat: -34.671264, lng: 150.863657 } },
    // { name: 'G', position: { lat: -35.304724, lng: 148.662905 } },
    // { name: 'H', position: { lat: -36.817685, lng: 175.699196 } },
    // { name: 'I', position: { lat: -36.828611, lng: 175.790222 } },
    // { name: 'J', position: { lat: -37.75, lng: 145.116667 } },
    // { name: 'K', position: { lat: -37.759859, lng: 145.128708 } },
    // { name: 'L', position: { lat: -37.765015, lng: 145.133858 } },
    // { name: 'M', position: { lat: -37.770104, lng: 145.143299 } },
    // { name: 'N', position: { lat: -37.7737, lng: 145.145187 } },
    // { name: 'O', position: { lat: -37.774785, lng: 145.137978 } },
    // { name: 'P', position: { lat: -37.819616, lng: 144.968119 } },
    // { name: 'Q', position: { lat: -38.330766, lng: 144.695692 } },
    // { name: 'R', position: { lat: -39.927193, lng: 175.053218 } },
    // { name: 'S', position: { lat: -41.330162, lng: 174.865694 } },
    // { name: 'T', position: { lat: -42.734358, lng: 147.439506 } },
    // { name: 'U', position: { lat: -42.734358, lng: 147.501315 } },
    { name: 'V', position: { lat: -42.735258, lng: 147.438 } },
    { name: 'W', position: { lat: -43.999792, lng: 170.463352 } },
  ];

  const markers = locations.map((location, i) => {
    return new googleMaps.Marker({
      position: location.position,
      label: location.name,
      map: map,
    });
  });

  map.addListener('bounds_changed', () => {
    const visibleMarkers = markers.filter((marker) =>
      map.getBounds().contains(marker.getPosition())
    );
    console.log('visibleMarkers:', visibleMarkers);
  });
};
