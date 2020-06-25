import React from 'react';
import MainLayout from '../layouts/mainLayout';
import LastMessage from '../messages/messagesLastOne';

const HomePage = () => {
  return (
    <MainLayout>
      <h1>Home</h1>
      <LastMessage />
    </MainLayout>
  );
};

export default HomePage;
