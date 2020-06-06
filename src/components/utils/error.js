import React from 'react';

const Error = ({ error }) => (
  <div className="notification has-background-danger has-text-white">
    <div>{error.message}</div>
    {error.networkError?.result?.errors.map((error, idx) => (
      <div key={idx}>{error.message}</div>
    ))}
  </div>
);

export default Error;
