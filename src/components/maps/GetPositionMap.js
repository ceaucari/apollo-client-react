import React, { useState, useEffect } from 'react';
import loadGoogleMapsApi from 'load-google-maps-api';
import 'dotenv/config';
import NavBar from '../layouts/navBar';

const mapStyle = {
  width: 'auto',
  height: '400px',
};

export let result = [];

const GetPositionMap = ({ coords }) => {
  useEffect(() => {
    gMap();
  }, []);

  const gMap = () =>
    loadGoogleMapsApi({
      key: process.env.REACT_APP_GOOGLEMAPS_KEY,
    })
      .then(googleMaps => {
        // Set initial values
        const initialPosition = { lat: -25.363, lng: 131.044 };

        const map = new googleMaps.Map(document.getElementById('map'), {
          zoom: 4,
          center: initialPosition,
        });

        // Create the initial Marker.
        let marker = new googleMaps.Marker({
          position: initialPosition,
          map: map,
          draggable: true,
        });
        let lat = initialPosition.lat;
        let lon = initialPosition.lng;
        coords(lat, lon);

        // Handle drag marker
        marker.addListener('dragend', mapsMarkerEvent => {
          lat = mapsMarkerEvent.latLng.lat();
          lon = mapsMarkerEvent.latLng.lng();
          coords(lat, lon);
        });

        // Configure the click listener.
        map.addListener('click', e => {
          // Remove current marker.
          marker.setMap(null);
          // Create a new Marker.
          marker = new googleMaps.Marker({
            position: e.latLng,
            map: map,
            draggable: true,
          });
          lat = e.latLng.lat();
          lon = e.latLng.lng();
          coords(lat, lon);

          // Handle drag marker after click event
          marker.addListener('dragend', e => {
            lat = e.latLng.lat();
            lon = e.latLng.lng();
            coords(lat, lon);
          });
        });
      })
      .catch(error => {
        console.error(error);
      });

  return <div id="map" style={mapStyle} />;
};

export default GetPositionMap;

// const AddLocation = () => {
//   const [position, setPosition] = useState({});

//   const getPosition = (lat, lon) => {
//     setPosition({ lat, lon });
//   };

//   return (
//     <>
//       <NavBar />
//       <AddLocationMap coords={getPosition} />
//       <div>{`Lat: ${position.lat}`}</div>
//       <div>{`Lon: ${position.lon}`}</div>
//     </>
//   );
// };

// export default AddLocation;
