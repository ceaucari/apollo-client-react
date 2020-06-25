import React, { useState } from 'react';

const DocsSidebarCollapsible = props => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? `sidebar` : `sidebar closed`}>
      <div className="header">
        <span onClick={toggle} className="toggle">
          <i className={open ? `fa fa-angle-left` : `fa fa-angle-right`}></i>
        </span>
      </div>
      {props.children}
    </div>
  );
};

export default DocsSidebarCollapsible;
