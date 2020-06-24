import React from 'react';
import NavBar from './navBar';

const mapStyle = {
  width: '100%',
  height: '400px',
};

const MapLayout = (props) => (
  <>
    <NavBar />
    <section>
      <div id="map" style={mapStyle}></div>
    </section>
    <section>
      <div className="container">{props.children}</div>
    </section>
  </>
);

export default MapLayout;

// import React, { useState } from 'react';
// import NavBar from './navBar';

// const mapStyle = {
//   open: {
//     width: '100%',
//     height: '400px',
//   },
//   closed: {
//     height: '0',
//   },
// };

// const MapLayout = (props) => {
//   const [open, setOpen] = useState(true);

//   const toggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <NavBar />
//       <section>
//         <div id="map" style={open ? mapStyle.open : mapStyle.closed}></div>
//         <div onClick={toggle} className="header">
//           {open ? 'Close map' : 'Open map'}
//         </div>
//       </section>
//       <section>
//         <div className="container">{props.children}</div>
//       </section>
//     </>
//   );
// };

// export default MapLayout;
