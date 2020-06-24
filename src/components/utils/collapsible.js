import React, { useState } from 'react';

const Collapsible = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div onClick={toggle} className="header">
        {title}
      </div>
      {open ? <div className="content">{children}</div> : null}
    </div>
  );
};

export default Collapsible;
