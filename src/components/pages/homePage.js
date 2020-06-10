import React from 'react';
import MainLayout from '../layouts/mainLayout';
import Subscription from '../messages/messagesSubscription';

const HomePage = () => {
  return (
    <MainLayout>
      <h1>Home</h1>
      <Subscription />
    </MainLayout>
  );
};

export default HomePage;
