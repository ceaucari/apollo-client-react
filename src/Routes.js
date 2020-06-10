import React from 'react';
import { Router } from '@reach/router';
import MainLayout from './components/layouts/mainLayout';
import Messages from './components/messages/messages';
import Profile from './components/user/profile';
import Login from './components/user/login';
import Home from './components/pages/home';
import Signup from './components/user/signup';
import Users from './components/user/users';
import UserForm from './components/user/userForm';
import Map from './components/pages/map';
// import { StaticMap } from './components/map/StaticMap';

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
      <Profile path="/user/" />
      <UserForm path="/user/edit" />
      <Users path="/admin/users" />
      <Map path="/map" />
      {/* <StaticMap path="/map" /> */}
    </Router>
  );
};

export default Routes;
