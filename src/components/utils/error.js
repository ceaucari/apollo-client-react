import React from 'react';

const localStyles = {
  container: {
    backgroundColor: '#ed8080',
    display: 'inline-block',
    borderRadius: '5px',
    padding: '15px',
    marginTop: '15px',
  },
  message: {
    marginTop: '10px',
  },
};

const Error = ({ error }) => (
  <div style={localStyles.container}>
    {/* {JSON.stringify(error, null, 2)} */}
    <div>{error.message}</div>
    <div>
      {error.networkError?.result?.errors.map((error, idx) => (
        <div key={idx} style={localStyles.message}>
          {error.message}
        </div>
      ))}
    </div>
  </div>
);

export default Error;
