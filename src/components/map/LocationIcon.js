import React from 'react';
// import PropTypes from 'prop-types';

// import Svg, { G, Path } from 'react-native-svg';

const LocationIcon = (props) => {
  const { height, width, fillColor, strokeColor, strokeWidth } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="-100 -50 512 512"
      height={height}
      width={width}
    >
      <g fillRule="evenodd">
        <g
          // fill={fillColor}
          fill="#009ADF"
          // fill="#009ADF"
          fillRule="nonzero"
          // stroke={strokeColor}
          stroke="#FFFFFF"
          // strokeWidth={strokeWidth}
          strokeWidth={30}
        >
          <path d="m143.46 198.09c-27.833 0-50.469-22.636-50.469-50.469 0-27.833 22.636-50.478 50.469-50.478s50.478 22.645 50.478 50.478c0 27.833-22.645 50.469-50.478 50.469m0.20434-197.69c-79.035 0-143.32 64.306-143.32 143.33 0 69.619 111.54 248.84 143.32 298.47 31.771-49.625 143.33-228.86 143.33-298.47 0-79.025-64.296-143.33-143.33-143.33" />
        </g>
      </g>
    </svg>
  );
};

export default LocationIcon;

// LocationIcon.defaultProps = {
//   width: 17,
//   height: 17,
//   fillColor: '#009ADF',
//   strokeColor: '#FFFFFF',
//   strokeWidth: '30',
// };

// LocationIcon.propTypes = {
//   width: PropTypes.number,
//   height: PropTypes.number,
//   fillColor: PropTypes.string,
//   strokeColor: PropTypes.string,
//   strokeWidth: PropTypes.string,
// };
