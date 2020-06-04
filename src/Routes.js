import React from 'react';
import { Router } from '@reach/router';
import MainLayout from './components/layouts/mainLayout';
import Messages from './components/messages/messages';
import Profile from './components/user/profile';
import Login from './components/user/login';
import Home from './components/pages/home';
import Signup from './components/user/signup';

const NotFound = () => (
  <MainLayout>
    <p>Sorry, nothing here.. 404</p>
  </MainLayout>
);

const Routes = () => {
  return (
    <Router>
      <NotFound default />
      <Home path="/" />
      <Messages path="/messages" />
      <Login path="/login" />
      <Signup path="/register" />
      <Profile path="/user" />
    </Router>
  );
};

export default Routes;
