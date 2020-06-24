import React, { useEffect, useState } from 'react';
import loadGoogleMapsApi from 'load-google-maps-api';
import Toggle from '../utils/toggle/Toggle';
import 'dotenv/config';

const mapStyle = {
  open: {
    height: '400px',
    transition: 'all 0.2s ease-in-out',
  },
  closed: {
    height: '0',
    transition: 'all 0.2s ease-in-out',
  },
  control: {
    display: 'flex',
    background: '#dedede',
    padding: '5px 10px 0',
    height: '3px',
    marginBottom: '30px',
  },
  controlItem: {
    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'right',
  },
  toggleMap: {
    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'center',
    cursor: 'pointer',
  },
};

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
  const [mapFilter, setMapFilter] = useState(true);
  const [mapOpen, setMapOpen] = useState(true);

  useEffect(() => {
    gMap();
  }, [mapFilter]);

  const gMap = () => {
    loadGoogleMapsApi({
      key: process.env.REACT_APP_GOOGLEMAPS_KEY,
    })
      .then(googleMaps => {
        const gMap = new googleMaps.Map(document.getElementById('map'), {
          center: {
            lat: -28.024,
            lng: 140.887,
          },
          zoom: 4,
        });
        const markers = locations.map((location, i) => {
          return new googleMaps.Marker({
            position: location.position,
            label: location.name,
            map: gMap,
          });
        });
        if (mapFilter) {
          gMap.addListener('bounds_changed', () => {
            const filtered = markers.filter(marker =>
              gMap.getBounds().contains(marker.getPosition())
            );
            setResult(filtered);
          });
        } else {
          setResult(markers);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const toggleMap = () => {
    // If filtering was on
    if (mapFilter) {
      // Save current results
      const currentResult = result;
      // Toggle off the filter with map button
      setMapFilter(!mapFilter);
      // Wait for the button to be off
      // then set back the user results
      // And close the map
      setTimeout(() => {
        setResult(currentResult);
        setMapOpen(!mapOpen);
      }, 100);
    } else {
      setMapOpen(!mapOpen);
    }
  };

  const renderFilterButton = () => {
    if (mapOpen) {
      return (
        <span style={mapStyle.controlItem}>
          <span>Map filter: </span>
          <button
            onClick={() => setMapFilter(!mapFilter)}
            style={mapFilter ? buttonStyle.green : null}
          >
            {mapFilter ? 'ON' : 'OFF'}
          </button>
          {/* <span onClick={toggleMapFilter}>
            <Toggle isOff={!mapFilter} />
          </span> */}
        </span>
      );
    }
    return <span style={mapStyle.controlItem} />;
  };

  console.log('mapFilter:', mapFilter);

  return (
    <>
      <section>
        <div id="map" style={mapOpen ? mapStyle.open : mapStyle.closed} />
        <div style={mapStyle.control}>
          <span style={mapStyle.controlItem} />
          <span onClick={toggleMap} style={mapStyle.toggleMap}>
            <i
              className={
                mapOpen ? `fa fa-angle-double-up` : `fa fa-angle-double-down`
              }
            />
          </span>
          {renderFilterButton()}
        </div>
      </section>
      <section>
        <div className="container">
          {result.map((item, idx) => (
            <div key={idx} style={resultStyle}>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default InteractiveMapWithList;
