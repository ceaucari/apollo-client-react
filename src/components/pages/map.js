import React from 'react';
import MainLayout from '../layouts/mainLayout';
import InteractiveMap from '../map/InteractiveMap';

const Home = () => {
  return (
    <MainLayout>
      <h1>Interactive map</h1>
      <InteractiveMap />
    </MainLayout>
  );
};

export default Home;
