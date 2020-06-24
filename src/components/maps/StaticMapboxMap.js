import React from 'react';
import 'dotenv/config';
import LocationIcon from './LocationIcon';

const localStyles = {
  container: {
    height: 152,
    overflow: 'hidden',
  },
  mapImage: {
    height: 152,
  },
  mapMarker: {
    position: 'absolute',
    display: 'flex',
    top: '120px',
    width: '100%',
    justifyContent: 'space-around',
  },
};

const latitude = '40.7555';
const longitude = '-73.6899';
const defaultLocation = { latitude, longitude };

const mapboxBaseUrl =
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

// const StaticMapboxMap = ({ location: { latitude, longitude } }) => {
const StaticMapboxMap = props => {
  const { latitude, longitude } = props.location || defaultLocation;
  const mapBoxApiUri = () =>
    `${mapboxBaseUrl}/${longitude},${latitude},14,0,0/1000x600@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`;

  return (
    <div style={localStyles.container}>
      <div style={localStyles.mapMarker}>
        <LocationIcon height={40} width={40} />
      </div>
      <img src={mapBoxApiUri()} alt="Map" />
    </div>
  );
};

export default StaticMapboxMap;
