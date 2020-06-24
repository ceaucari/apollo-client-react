import React from 'react';
import { Router } from '@reach/router';
import MainLayout from './components/layouts/mainLayout';
import MessagesPage from './components/pages/messagesPage';
import Profile from './components/user/profile';
import Login from './components/user/login';
import HomePage from './components/pages/homePage';
import Signup from './components/user/signup';
import Users from './components/user/users';
import UserForm from './components/user/userForm';
import MapPage from './components/pages/mapPage';
import DocsPage from './components/pages/docsPage';
import SearchPage from './components/pages/searchPage';

const NotFound = () => (
  <MainLayout>
    <p>Sorry, there's nothing here.. 404</p>
  </MainLayout>
);

const Routes = () => (
  <Router>
    <NotFound default />
    <HomePage path="/" />
    <MessagesPage path="/messages" />
    <Login path="/login" />
    <Signup path="/register" />
    <Profile path="/user/:userId" />
    <UserForm path="/user/edit/:userId" />
    <Users path="/admin/users" />
    <MapPage path="/map" />
    <DocsPage path="/docs" />
    <SearchPage path="/search" />
  </Router>
);

export default Routes;
