import React from 'react';
import { Router } from '@reach/router';
import MainLayout from './components/layouts/mainLayout';
import Messages from './components/messages/messages';
import Profile from './components/user/profile';
import Login from './components/user/login';
import HomePage from './components/pages/homePage';
import Signup from './components/user/signup';
import Users from './components/user/users';
import UserForm from './components/user/userForm';
import MapPage from './components/pages/mapPage';

const NotFound = () => (
  <MainLayout>
    <p>Sorry, nothing here.. 404</p>
  </MainLayout>
);

const Routes = () => {
  return (
    <Router>
      <NotFound default />
      <HomePage path="/" />
      <Messages path="/messages" />
      <Login path="/login" />
      <Signup path="/register" />
      <Profile path="/user/" />
      <UserForm path="/user/edit" />
      <Users path="/admin/users" />
      <MapPage path="/map" />
    </Router>
  );
};

export default Routes;
