import React, { useState } from 'react';

const MasterForm = () => {
  const inp = {
    email: '',
    username: '',
    password: '',
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [inputs, setInputs] = useState(inp);

  const handleChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { email, username, password } = inputs;
    alert(`Your registration detail: \n
      Email: ${email} \n
      Username: ${username} \n
      Password: ${password}`);
  };

  const next = () => {
    let cs = currentStep >= 2 ? 3 : currentStep + 1;
    setCurrentStep(cs);
  };

  const prev = () => {
    let cs = currentStep <= 1 ? 1 : currentStep - 1;
    setCurrentStep(cs);
  };

  const previousButton = () => {
    if (currentStep !== 1) {
      return (
        <button className="btn btn-secondary" type="button" onClick={prev}>
          Previous
        </button>
      );
    }
    return null;
  };

  const nextButton = () => {
    if (currentStep < 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={next}
        >
          Next
        </button>
      );
    }
    return null;
  };

  return (
    <>
      <h1>React Wizard Form 🧙‍♂️</h1>
      <p>Step {currentStep} </p>

      <form onSubmit={handleSubmit}>
        <Step1
          currentStep={currentStep}
          handleChange={handleChange}
          email={inputs.email}
        />
        <Step2
          currentStep={currentStep}
          handleChange={handleChange}
          username={inputs.username}
        />
        <Step3
          currentStep={currentStep}
          handleChange={handleChange}
          password={inputs.password}
        />
        {previousButton()}
        {nextButton()}
      </form>
    </>
  );
};

export default MasterForm;

const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input
        className="form-control"
        id="email"
        name="email"
        type="text"
        placeholder="Enter email"
        value={props.email}
        onChange={props.handleChange}
      />
    </div>
  );
};

const Step2 = props => {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        className="form-control"
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
        value={props.username}
        onChange={props.handleChange}
      />
    </div>
  );
};

const Step3 = props => {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={props.password}
          onChange={props.handleChange}
        />
      </div>
      <button className="btn btn-success btn-block">Sign up</button>
    </>
  );
};
