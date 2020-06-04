import React from 'react';
// import { Router, Link, Redirect } from '@reach/router';

const Logout = () => {
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   console.log('LocalStorage Token:', localStorage.getItem('token'));
  //   // return <Redirect to="/login" />;
  //   return window.location.reload();
  // };
  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
    // <a href="/" onclick={handleLogout}>
    //   Logout
    // </a>
  );
};

export default Logout;

export const handleLogout = () => {
  localStorage.removeItem('token');
  console.log('LocalStorage Token:', localStorage.getItem('token'));
  // return <Redirect to="/login" />;
  return window.location.reload();
};
