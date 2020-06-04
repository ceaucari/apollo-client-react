import React from 'react';
import MainLayout from '../layouts/mainLayout';
import Subscription from '../messages/messagesSubscription';

const Home = () => {
  return (
    <MainLayout>
      <h1>Home</h1>
      <Subscription />
    </MainLayout>
  );
};

export default Home;
