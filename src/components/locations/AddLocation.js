import React, { useState } from 'react';
import GetPositionMap from '../maps/GetPositionMap';
import Modal from '../utils/modal';
import { useMutation } from '@apollo/react-hooks';

import Error from '../utils/error';
import MainLayout from '../layouts/mainLayout';
import { Link } from '@reach/router';
import { validate } from 'graphql';
// import { SIGNIN } from './graphql';

const s = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
};

const Step1 = ({ currentStep, inputs, handleInputChange }) => {
  if (currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input
        name="email"
        type="text"
        placeholder="Enter email"
        value={inputs?.email}
        onChange={handleInputChange}
      />
    </div>
  );
};

const Step2 = ({ currentStep, inputs, handleInputChange }) => {
  if (currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        name="username"
        type="text"
        placeholder="Enter username"
        value={inputs?.username}
        onChange={handleInputChange}
      />
    </div>
  );
};

const Step3 = ({ currentStep, position }) => {
  // const [pos, setPos] = useState({});

  const getPosition = (lat, lon) => {
    // setPos({ lat, lon });
    position(lat, lon);
  };

  if (currentStep !== 3) {
    return null;
  }
  return (
    <>
      <div className="form-group">
        <label htmlFor="password">Confirm marker position</label>
        <>
          <GetPositionMap coords={getPosition} />
          {/* <div>{`Lat: ${pos.lat}`}</div>
          <div>{`Lon: ${pos.lon}`}</div> */}
        </>
      </div>
    </>
  );
};

const AddLocation = () => {
  const inp = {
    email: '',
    username: '',
    coords: {},
  };

  const [showModal, setShowModal] = useState(false);
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
      // signIn({
      //   variables: {
      //     login: inputs.login,
      //     password: inputs.password,
      //   },
      // }).catch(err => {
      //   console.log('UNHANDLED ERR', err);
      //   setError(err);
      // });
      clearForm();
      console.log('SUBMITTED', inputs);
    }
  };

  const validation = () => {
    // .reportValidity()
    if (currentStep === 1 && inputs.email.length) {
      // inputs.email.reportValidity();
      return true;
    }
    if (currentStep === 2 && inputs.username.length) {
      return true;
    }
    return false;
  };

  const next = () => {
    console.log(inputs);
    if (validation()) {
      let cs = currentStep >= 2 ? 3 : currentStep + 1;
      setCurrentStep(cs);
    } else {
      alert('VALIDATION ERROR');
    }
  };

  const prev = () => {
    let cs = currentStep <= 1 ? 1 : currentStep - 1;
    setCurrentStep(cs);
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
    <button className="button is-success is-light" onClick={next}>
      Next
    </button>
  );

  const renderModal = () => {
    return (
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
          <p>Step {currentStep} </p>

          <form>
            <Step1
              currentStep={currentStep}
              handleInputChange={handleInputChange}
              email={inputs.email}
            />
            <Step2
              currentStep={currentStep}
              handleInputChange={handleInputChange}
              username={inputs.username}
            />
            <Step3
              currentStep={currentStep}
              handleInputChange={handleInputChange}
              position={setInputCoords}
            />
          </form>
        </>
      </Modal>
    );
  };

  return (
    <>
      {renderModal()}
      <button className="button" onClick={toggleModal}>
        <span className="icon is-small">
          <i className="fa fa-edit" aria-hidden="true" />
        </span>
        <span>Add Location</span>
      </button>
    </>
  );
};

export default AddLocation;
