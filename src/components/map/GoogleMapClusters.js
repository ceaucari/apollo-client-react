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
        console.log('googleMaps:', googleMaps);

        const map = new googleMaps.Map(document.getElementById('map'), {
          zoom: 3,
          center: { lat: -28.024, lng: 140.887 },
        });

        // Create an array of alphabetical characters used to label the markers.
        const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const locations = [
          { lat: -31.56391, lng: 147.154312 },
          { lat: -33.718234, lng: 150.363181 },
          { lat: -33.727111, lng: 150.371124 },
          { lat: -33.848588, lng: 151.209834 },
          { lat: -33.851702, lng: 151.216968 },
          { lat: -34.671264, lng: 150.863657 },
          { lat: -35.304724, lng: 148.662905 },
          { lat: -36.817685, lng: 175.699196 },
          { lat: -36.828611, lng: 175.790222 },
          { lat: -37.75, lng: 145.116667 },
          { lat: -37.759859, lng: 145.128708 },
          { lat: -37.765015, lng: 145.133858 },
          { lat: -37.770104, lng: 145.143299 },
          { lat: -37.7737, lng: 145.145187 },
          { lat: -37.774785, lng: 145.137978 },
          { lat: -37.819616, lng: 144.968119 },
          { lat: -38.330766, lng: 144.695692 },
          { lat: -39.927193, lng: 175.053218 },
          { lat: -41.330162, lng: 174.865694 },
          { lat: -42.734358, lng: 147.439506 },
          { lat: -42.734358, lng: 147.501315 },
          { lat: -42.735258, lng: 147.438 },
          { lat: -43.999792, lng: 170.463352 },
        ];

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        const markers = locations.map(function (location, i) {
          return new googleMaps.Marker({
            position: location,
            label: labels[i % labels.length],
          });
        });

        // Add a marker clusterer to manage the markers.
        new MarkerClusterer(map, markers, {
          imagePath:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        });
        // const markerCluster = new MarkerClusterer(map, markers, {
        //   imagePath:
        //     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        // });
      })
      .catch((error) => {
        console.error(error);
      });

  return <div id="map" style={c.style || defaultConfig.style}></div>;
};

export default GoogleMap;
