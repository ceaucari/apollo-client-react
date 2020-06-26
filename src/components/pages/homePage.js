import React from 'react';
import MainLayout from '../layouts/mainLayout';
import MessageNotification from '../messages/messageNotification';

const HomePage = () => {
  return (
    <MainLayout>
      <h1>Home</h1>
      <MessageNotification />
    </MainLayout>
  );
};

export default HomePage;
