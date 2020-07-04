import React, { useState, useEffect } from 'react';
import loadGoogleMapsApi from 'load-google-maps-api';
import 'dotenv/config';

const Geocode = ({ triggerGeocode, geocoded }) => {
  const inp = {
    address: '',
  };

  const [inputs, setInputs] = useState(inp);

  // Trigger geocode from external function in parent
  useEffect(() => {
    if (triggerGeocode) {
      geocode();
    }
  }, [triggerGeocode]);

  // TODO: Get location suggestions from google as you type
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const geocode = () =>
    loadGoogleMapsApi({
      key: process.env.REACT_APP_GOOGLEMAPS_KEY,
    })
      .then(googleMaps => {
        const geocoder = new googleMaps.Geocoder();
        geocoder.geocode({ address: inputs.address }, (results, status) => {
          if (status == 'OK') {
            console.log(results);

            // Set results to callback
            geocoded(results);
          } else {
            // TODO: Set error and remove alert
            alert(
              'Geocode was not successful for the following reason: ' + status
            );
          }
        });
      })
      .catch(error => {
        console.error(error);
      });

  return (
    <div className="field">
      <label className="label">Address:</label>
      <input
        className="input"
        type="text"
        name="address"
        placeholder="Enter address"
        onChange={handleInputChange}
        value={inputs.address}
        required
      />
    </div>
  );
};

export default Geocode;
