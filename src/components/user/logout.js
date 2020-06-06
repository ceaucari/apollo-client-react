import React from 'react';

const Logout = () => {
  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;

export const handleLogout = () => {
  localStorage.removeItem('token');
  console.log('LocalStorage Token:', localStorage.getItem('token'));
  return window.location.reload();
};
