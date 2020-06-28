import React from 'react';
import MainLayout from '../layouts/mainLayout';
import MessageNotification from '../messages/messageNotification';
import AddLocation from '../locations/AddLocation';

const HomePage = () => {
  return (
    <MainLayout>
      <h1>Home</h1>
      <AddLocation />
      <MessageNotification />
    </MainLayout>
  );
};

export default HomePage;
