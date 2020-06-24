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
  var myLatlng = { lat: -25.363, lng: 131.044 };

  var map = new googleMaps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng,
  });

  var marker = new googleMaps.Marker({
    position: myLatlng,
    map: map,
    title: 'Click to zoom',
  });

  map.addListener('center_changed', function () {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function () {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  marker.addListener('click', function () {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
};

// // -----------------------------------------------------------------------
// // Using shapes and heatmaps to customize maps

// const MapSettings = (googleMaps) => {
//   const map = new googleMaps.Map(document.getElementById('map'), {
//     zoom: 2,
//     center: { lat: -33.865427, lng: 151.196123 },
//     mapTypeId: 'terrain',
//   });

//   // Create a <script> tag and set the USGS URL as the source.
//   var script = document.createElement('script');

//   // This example uses a local copy of the GeoJSON stored at
//   // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//   script.src =
//     'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
//   document.getElementsByTagName('head')[0].appendChild(script);

//   map.data.setStyle(function (feature) {
//     var magnitude = feature.getProperty('mag');
//     return {
//       icon: getCircle(magnitude),
//     };
//   });

//   function getCircle(magnitude) {
//     return {
//       path: googleMaps.SymbolPath.CIRCLE,
//       fillColor: 'red',
//       fillOpacity: 0.2,
//       scale: Math.pow(2, magnitude) / 2,
//       strokeColor: 'white',
//       strokeWeight: 0.5,
//     };
//   }

//   window.eqfeed_callback = function (results) {
//     map.data.addGeoJson(results);
//   };
// };

// // -----------------------------------------------------------------------
// // PULL FROM EXTERNAL SOURCES
// // https://developers.google.com/maps/documentation/javascript/importing_data

// const MapSettings = (googleMaps) => {
//   const map = new googleMaps.Map(document.getElementById('map'), {
//     zoom: 2,
//     center: new googleMaps.LatLng(2.8, -187.3),
//     mapTypeId: 'terrain',
//   });

//   // Create a <script> tag and set the USGS URL as the source.
//   var script = document.createElement('script');
//   // This example uses a local copy of the GeoJSON stored at
//   // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//   script.src =
//     'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
//   document.getElementsByTagName('head')[0].appendChild(script);

//   // Loop through the results array and place a marker for each
//   // set of coordinates.
//   window.eqfeed_callback = function (results) {
//     for (var i = 0; i < results.features.length; i++) {
//       var coords = results.features[i].geometry.coordinates;
//       var latLng = new googleMaps.LatLng(coords[1], coords[0]);
//       var marker = new googleMaps.Marker({
//         position: latLng,
//         map: map,
//       });
//     }
//   };
// };

// // -----------------------------------------------------------------------
// // CLUSTER
// //

// const MapSettings = (googleMaps) => {
//   const map = new googleMaps.Map(document.getElementById('map'), {
//     zoom: 3,
//     center: { lat: -28.024, lng: 140.887 },
//   });

//   // Create an array of alphabetical characters used to label the markers.
//   const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const locations = [
//     { lat: -31.56391, lng: 147.154312 },
//     { lat: -33.718234, lng: 150.363181 },
//     { lat: -33.727111, lng: 150.371124 },
//     { lat: -33.848588, lng: 151.209834 },
//     { lat: -33.851702, lng: 151.216968 },
//     { lat: -34.671264, lng: 150.863657 },
//     { lat: -35.304724, lng: 148.662905 },
//     { lat: -36.817685, lng: 175.699196 },
//     { lat: -36.828611, lng: 175.790222 },
//     { lat: -37.75, lng: 145.116667 },
//     { lat: -37.759859, lng: 145.128708 },
//     { lat: -37.765015, lng: 145.133858 },
//     { lat: -37.770104, lng: 145.143299 },
//     { lat: -37.7737, lng: 145.145187 },
//     { lat: -37.774785, lng: 145.137978 },
//     { lat: -37.819616, lng: 144.968119 },
//     { lat: -38.330766, lng: 144.695692 },
//     { lat: -39.927193, lng: 175.053218 },
//     { lat: -41.330162, lng: 174.865694 },
//     { lat: -42.734358, lng: 147.439506 },
//     { lat: -42.734358, lng: 147.501315 },
//     { lat: -42.735258, lng: 147.438 },
//     { lat: -43.999792, lng: 170.463352 },
//   ];

//   // Add some markers to the map.
//   // Note: The code uses the JavaScript Array.prototype.map() method to
//   // create an array of markers based on a given "locations" array.
//   // The map() method here has nothing to do with the Google Maps API.
//   const markers = locations.map(function (location, i) {
//     return new googleMaps.Marker({
//       position: location,
//       label: labels[i % labels.length],
//     });
//   });

//   // Add a marker clusterer to manage the markers.
//   new MarkerClusterer(map, markers, {
//     imagePath:
//       'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
//   });
// };
