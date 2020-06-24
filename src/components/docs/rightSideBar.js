import React, { useState, Component } from 'react';

const RightSideBar = props => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    // <div className={open ? `sidebar right` : `sidebar right closed`}>
    //   {/* <div className="hamburguer" onClick={toggle}>
    //     <i className={open ? `fa fa-angle-left` : `fa fa-angle-right`}></i>
    //   </div> */}
    //   {props.children}
    // </div>
    <div className={open ? `sidebar` : `sidebar closed`}>
      <div className="header">
        {/* <span onClick={toggle} className="toggle">
          <i className={open ? `fa fa-angle-left` : `fa fa-angle-right`}></i>
        </span> */}
      </div>
      {props.children}
    </div>
  );
};

export default RightSideBar;
