import React, { useEffect, useState } from 'react';
import loadGoogleMapsApi from 'load-google-maps-api';
import 'dotenv/config';

// const mapStyle = {
//   width: '100%',
//   height: '500px',
// };
const resultStyle = {
  width: '500px',
  height: '50px',
  margin: '0 auto',
  background: '#dedede',
  padding: '15px',
  marginTop: '15px',
};

const buttonStyle = {
  green: {
    background: '#00ff19',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
  },
  align: {
    textAlign: 'right',
    marginTop: '10px',
  },
};

const locations = [
  { name: 'A', position: { lat: -31.56391, lng: 147.154312 } },
  { name: 'B', position: { lat: -33.727111, lng: 150.371124 } },
  { name: 'C', position: { lat: -33.848588, lng: 151.209834 } },
  { name: 'D', position: { lat: -42.735258, lng: 147.438 } },
  { name: 'E', position: { lat: -43.999792, lng: 170.463352 } },
];

const InteractiveMapWithList = () => {
  const [result, setResult] = useState([]);
  const [updateResults, setUpdateResults] = useState(true);

  useEffect(() => {
    gMap();
  }, [updateResults]);

  const gMap = () => {
    loadGoogleMapsApi({
      key: process.env.REACT_APP_GOOGLEMAPS_KEY,
    })
      .then((googleMaps) => {
        const map = new googleMaps.Map(document.getElementById('map'), {
          center: {
            // lat: 40.7484405,
            // lng: -73.9944191,
            lat: -28.024,
            lng: 140.887,
          },
          zoom: 4,
        });
        const allMarkers = locations.map((location, i) => {
          return new googleMaps.Marker({
            position: location.position,
            label: location.name,
            map: map,
          });
        });
        if (updateResults) {
          const listener1 = map.addListener('bounds_changed', () => {
            const result = allMarkers.filter((marker) =>
              map.getBounds().contains(marker.getPosition())
            );
            // console.log('visibleMarkers:', result);
            setResult(result);
          });
        } else {
          setResult(allMarkers);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleUpdateResults = () => {
    setUpdateResults(!updateResults);
  };

  return (
    <>
      {/* <div id="map" style={mapStyle}></div> */}
      <div style={buttonStyle.align}>
        <span>Map filter: </span>
        <button
          onClick={toggleUpdateResults}
          style={updateResults ? buttonStyle.green : null}
        >
          {updateResults ? 'ON' : 'OFF'}
        </button>
      </div>
      {result.map((item, idx) => (
        <div key={idx} style={resultStyle}>
          <div>{item.label}</div>
        </div>
      ))}
    </>
  );
};

export default InteractiveMapWithList;
