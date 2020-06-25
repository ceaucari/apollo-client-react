import React from 'react';

const RightSideBar = props => {
  return (
    <div className="sidebar">
      <div className="header"></div>
      {props.children}
    </div>
  );
};

export default RightSideBar;
