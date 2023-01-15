import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./App.css";
import logo from "./assets/logo-beequip.svg";

const firstComponent = () => {
  return <div>First Component</div>;
};
const secondComponent = () => {
  return <div>Second Component</div>;
};
const thirdComponent = () => {
  return <div>Third Component</div>;
};
const fourthComponent = () => {
  return <div>Final Component</div>;
};
const fifthComponent = () => {
  return <div>Final Component</div>;
};

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const [steps, setSteps] = useState([
    { key: "1", label: "MachineData", isDone: true, component: firstComponent },
    { key: "1.1", label: "Milage", isDone: false, component: firstComponent },
    { key: "2", label: "Supplier", isDone: false, component: secondComponent },
    { key: "3", label: "Rental", isDone: false, component: thirdComponent },
    {
      key: "4",
      label: "lease details",
      isDone: false,
      component: fourthComponent,
    },
    {
      key: "5",
      label: "VATfinancing",
      isDone: false,
      component: fifthComponent,
    },
  ]);
  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
      alert("you have completed all steps");
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      })
    );
    setActiveStep(steps[index + 1]);
  };

  return (
    <div className="App">
      <header className="heading">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="lease-container">
        <Button variant="warning" className="openButton" onClick={handleShow}>
          Edit lease data
        </Button>

        <Modal show={show} onHide={handleClose} dialogClassName="leaseModel">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="steps">
                <ul className="nav">
                  {steps.map((step, i) => {
                    return (
                      <li
                        key={i}
                        className={`${
                          activeStep.key === step.key ? "active" : ""
                        } ${step.isDone ? "done" : ""}`}
                      >
                        <div className="step-line"></div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="step-component">{activeStep.component()}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleNext}>
              volgende
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default App;
