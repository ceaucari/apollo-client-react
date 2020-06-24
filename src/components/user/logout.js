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
};
