import React from 'react';
import TopNav from './topNav';

const MainLayout = props => {
  return (
    <div className="App">
      <TopNav />
      {props.children}
    </div>
  );
};

export default MainLayout;
