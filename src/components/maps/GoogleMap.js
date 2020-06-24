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
    // lat: 40.7484405,
    // lng: -73.9944191,
    lat: -28.024,
    lng: 140.887,
  },
  zoom: 4,
};

export let result = [];

const GoogleMap = ({ locations, config }) => {
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

        const map = new googleMaps.Map(document.getElementById('map'), {
          zoom: c.zoom,
          center: c.center,
        });

        // const locations = [
        //   { name: 'A', position: { lat: -31.56391, lng: 147.154312 } },
        //   { name: 'B', position: { lat: -33.727111, lng: 150.371124 } },
        //   { name: 'C', position: { lat: -33.848588, lng: 151.209834 } },
        //   { name: 'D', position: { lat: -42.735258, lng: 147.438 } },
        //   { name: 'E', position: { lat: -43.999792, lng: 170.463352 } },
        // ];

        const markers = locations.map((location, i) => {
          return new googleMaps.Marker({
            position: location.position,
            label: location.name,
            map: map,
          });
        });

        map.addListener('bounds_changed', () => {
          result = markers.filter((marker) =>
            map.getBounds().contains(marker.getPosition())
          );
          console.log('visibleMarkers:', result);
        });
      })
      .catch((error) => {
        console.error(error);
      });

  return <div id="map" style={c.style || defaultConfig.style}></div>;
};

export default GoogleMap;
