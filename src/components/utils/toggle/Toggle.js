import React, { useState, useEffect } from 'react';
import './toggle.css';

const Toggle = ({ isOff }) => {
  const [off, setOff] = useState(isOff);

  useEffect(() => {
    setOff(!off);
    // return () => {
    //   cleanup
    // }
  }, [off]);

  // const toggle = () => {
  //   setOff(!off);
  // };

  return (
    <label class="switch">
      {isOff ? <input type="checkbox" /> : <input type="checkbox" checked />}
      <span class="slider round"></span>
    </label>
  );
};

export default Toggle;
