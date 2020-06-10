import React from 'react';
// import PropTypes from 'prop-types';
// import logo from './../../assets/logo.svg';

// import gmapUri from 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCNZj9H6GzTdSyjqFeBfqnjGsVW2NtlZGE&callback=initMap';

// import dotenv from 'dotenv';
// import 'dotenv/config';

// import { StyleSheet, View, Image, Dimensions } from 'react-native';
// import Config from 'react-native-config';

// import { MAP_BOX_API_URL_BASE } from '../../../constants';
// import { accessibilityLabels } from '../constants/constants';
// import { LocationIcon } from '../../../components/custom/IconComponents';

// const { width: viewportWidth } = Dimensions.get('window');

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
    top: 40,
    width: '100%',
    alignItems: 'center',
  },
};

const latitude = '40.7555';
const longitude = '-73.6899';
const location = { latitude, longitude };
// const MAP_BOX_API_KEY =
const STORYBOOK_MAPBOX_API_KEY =
  'pk.eyJ1IjoiY2VhdWNhcmkiLCJhIjoiNGE4ODJiMmM2YjNjZmUzOThjMTVjMDBmMjIyMGNmMGQifQ.OS26To4_mCdclySlanmWrw';

const MAP_BOX_API_URL_BASE =
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

// Build api uri for static image mapbox requests
// export const Map = ({ location: { latitude, longitude } }) => {
export const StaticMap = ({ location: { latitude, longitude } }) => {
  // console.log('ENV:', process.env.STORYBOOK_MAPBOX_API_KEY);
  // console.log('ENV:', '%STORYBOOK_MAPBOX_API_KEY%');
  const mapBoxApiUri = () =>
    `${MAP_BOX_API_URL_BASE}/${longitude},${latitude},14,0,0/1000x600@2x?access_token=${STORYBOOK_MAPBOX_API_KEY}`;

  return (
    <div style={localStyles.container}>
      {/* <img src={mapBoxApiUri()} alt="Map" /> */}
      <img
        id="mapImage"
        crossorigin="Anonymous"
        src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-73.6899,40.7555,14,0,0/1000x600@2x?access_token=pk.eyJ1IjoiZGlnaXRhbGFkb3BzaXhuIiwiYSI6ImNqYTJ2MWxsaTlwbTgzMnM0bm4xOHFraXYifQ.WGyCFfwet_HfOius2_c_MQ"
      />
    </div>
  );
};

// Map.propTypes = {
//   location: PropTypes.shape({
//     latitude: PropTypes.string,
//     longitude: PropTypes.string,
//   }).isRequired,
//   height: PropTypes.number,
//   width: PropTypes.number,
// };

// Map.defaultProps = {
//   height: 152,
//   width: viewportWidth,
// };

export default Map;
