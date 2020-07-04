import React, { useState, useEffect } from 'react';
import GetPositionMap from '../maps/GetPositionMap';
import Modal from '../utils/modal';
import { useMutation } from '@apollo/react-hooks';

import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';
import { Link } from '@reach/router';
import { validate } from 'graphql';
import Geocode from './Geocode';
// import { SIGNIN } from './graphql';

const s = {
  steps: {
    justifyContent: 'space-between',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
};

const Step1 = ({ currentStep, triggerGeocode, geocoded }) => {
  if (currentStep !== 1) {
    return null;
  }
  return <Geocode triggerGeocode={triggerGeocode} geocoded={geocoded} />;
};

const Step2 = ({ currentStep, inputs, handleInputChange }) => {
  if (currentStep !== 2) {
    return null;
  }
  return (
    <>
      <div className="field">
        <label className="label">Street:</label>
        <input
          className="input"
          type="text"
          name="street"
          onChange={handleInputChange}
          value={inputs.street}
          required
        />
      </div>
      <div className="field">
        <label className="label">Number:</label>
        <input
          className="input"
          type="text"
          placeholder="Username"
          name="number"
          onChange={handleInputChange}
          value={inputs.number}
          required
        />
      </div>
      <div className="field">
        <label className="label">Sublocality:</label>
        <input
          className="input"
          type="text"
          placeholder="Sublocality"
          name="sublocality"
          onChange={handleInputChange}
          value={inputs.sublocality}
          required
        />
      </div>
      <div className="field">
        <label className="label">Locality:</label>
        <input
          className="input"
          type="text"
          placeholder="Locality"
          name="locality"
          onChange={handleInputChange}
          value={inputs.locality}
          required
        />
      </div>
      <div className="field">
        <label className="label">Administrative area:</label>
        <input
          className="input"
          type="text"
          placeholder="Administrative area"
          name="administrative_area"
          onChange={handleInputChange}
          value={inputs.administrative_area}
          required
        />
      </div>
      <div className="field">
        <label className="label">Country:</label>
        <input
          className="input"
          type="text"
          placeholder="Country"
          name="country"
          onChange={handleInputChange}
          value={inputs.country}
          required
        />
      </div>
      <div className="field">
        <label className="label">Postal code:</label>
        <input
          className="input"
          type="text"
          placeholder="Postal code"
          name="postal_code"
          onChange={handleInputChange}
          value={inputs.postal_code}
          required
        />
      </div>
    </>
  );
};

const Step3 = ({ currentStep, initialPosition, newPosition }) => {
  const [pos, setPos] = useState({});

  const getPosition = (lat, lon) => {
    newPosition(lat, lon);
    setPos({ lat, lon });
  };

  if (currentStep !== 3) {
    return null;
  }

  return (
    <>
      <GetPositionMap
        initialPosition={initialPosition}
        newPosition={getPosition}
      />
      <hr />
      <div>{`Latitude: ${pos.lat}`}</div>
      <div>{`Longitude: ${pos.lon}`}</div>
    </>
  );
};

const AddLocation = () => {
  const inp = {
    formatted_address: '',
    number: '',
    street: '',
    sublocality: '',
    locality: '',
    administrative_area: '',
    country: '',
    postal_code: '',
    coords: {},
  };

  const [showModal, setShowModal] = useState(false);
  const [triggerGeocode, setTriggerGeocode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [inputs, setInputs] = useState(inp);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const clearForm = () => {
    setInputs(inp);
    setCurrentStep(1);
    toggleModal();
  };

  // const [signIn] = useMutation(SIGNIN, {
  //   update: updateCache,
  //   onCompleted: data => completed(data),
  // });

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const setGeocodedData = data => {
    setInputs({
      formatted_address: data[0].formatted_address || '',
      number: data[0].address_components[0]?.long_name || '',
      street: data[0].address_components[1]?.long_name || '',
      sublocality: data[0].address_components[2]?.long_name || '',
      locality: data[0].address_components[3]?.long_name || '',
      administrative_area: data[0].address_components[4]?.long_name || '',
      country: data[0].address_components[5]?.long_name || '',
      postal_code: data[0].address_components[6]?.long_name || '',
      coords: {
        lat: data[0].geometry.location?.lat() || '',
        lng: data[0].geometry.location?.lng() || '',
      },
    });
    next();
  };

  const setInputCoords = (lat, lon) => {
    setInputs(inputs => ({
      ...inputs,
      coords: { lat, lon },
    }));
  };

  // const handleSubmit = event => {
  //   if (event) {
  //     event.preventDefault();
  //     signIn({
  //       variables: {
  //         login: inputs.login,
  //         password: inputs.password,
  //       },
  //     }).catch(err => {
  //       console.log('UNHANDLED ERR', err);
  //       setError(err);
  //     });
  //   }
  // };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      clearForm();
      console.log('SUBMITTED', inputs);
    }
  };

  // const validation = () => {
  //   // .reportValidity()
  //   // if (currentStep === 1 && inputs.number.length) {
  //   //   // inputs.number.reportValidity();
  //   //   return true;
  //   // }
  //   if (currentStep === 2 && inputs.street.length) {
  //     return true;
  //   }
  //   return false;
  // };

  const prev = () => {
    let cs = currentStep <= 1 ? 1 : currentStep - 1;
    setCurrentStep(cs);
    setTriggerGeocode(false);
  };

  const next = () => {
    // console.log(inputs);
    // if (validation()) {
    let cs = currentStep >= 2 ? 3 : currentStep + 1;
    setCurrentStep(cs);
    // } else {
    //   alert('VALIDATION ERROR');
    // }
  };

  const previousButton = () => {
    if (currentStep !== 1) {
      return (
        <button className="button is-success is-light" onClick={prev}>
          Previous
        </button>
      );
    }
    return null;
  };

  const nextButton = () => (
    <button
      className="button is-success is-light"
      onClick={() => (currentStep === 1 ? setTriggerGeocode(true) : next())}
    >
      Next
    </button>
  );

  const renderProgress = () => {
    let value = 90;
    if (currentStep === 1) {
      value = 10;
    }
    if (currentStep === 2) {
      value = 45;
    }
    return (
      <>
        <div style={s.footer}>
          <span>Geocode</span>
          <span>Confirm address</span>
          <span>Confirm marker</span>
        </div>
        <progress className="progress is-info" value={value} max="100">
          45%
        </progress>
      </>
    );
  };

  const renderModal = () => (
    <Modal
      isVisible={showModal}
      closeModal={toggleModal}
      title="Add location"
      footer={
        <div style={s.footer}>
          <div>{previousButton()}</div>
          <div>
            {currentStep === 3 ? (
              <>
                <button className="button" onClick={clearForm}>
                  Cancel
                </button>
                <button className="button is-success" onClick={handleSubmit}>
                  Add location
                </button>
              </>
            ) : (
              nextButton()
            )}
          </div>
        </div>
      }
    >
      <>
        {renderProgress()}
        <form>
          <Step1
            currentStep={currentStep}
            triggerGeocode={triggerGeocode}
            geocoded={data => setGeocodedData(data)}
          />
          <Step2
            currentStep={currentStep}
            handleInputChange={handleInputChange}
            inputs={inputs}
          />
          <Step3
            currentStep={currentStep}
            initialPosition={inputs.coords}
            newPosition={setInputCoords}
          />
        </form>
      </>
    </Modal>
  );

  return (
    <>
      {renderModal()}
      <button className="button" onClick={toggleModal}>
        <span className="icon is-small">
          <i className="fa fa-map-marker" aria-hidden="true" />
        </span>
        <span>Add Location</span>
      </button>
    </>
  );
};

export default AddLocation;

// TODO: Implementation of address formatter for different country formats:
// https://www.npmjs.com/package/node-postal
// https://www.npmjs.com/package/@fragaria/address-formatter
