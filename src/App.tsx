import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./App.css";
import logo from "./assets/logo-beequip.svg";
import LeaseDetailsData from "./components/LeaseDetailsData";
import MachineData from "./components/MachineData";
import RentalData from "./components/RentalData";
import SupplierData from "./components/SupplierData";
import VatFinData from "./components/VatFinData";
import { Step } from "./models/stepsModel";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [steps, setSteps] = useState<Step[]>([
    {
      key: "1",
      label: "MachineData",
      isDone: false,
      component: () => {
        return <MachineData />;
      },
    },
    {
      key: "2",
      label: "Supplier",
      isDone: false,
      component: () => {
        return <SupplierData />;
      },
    },
    {
      key: "3",
      label: "Rental",
      isDone: false,
      component: () => {
        return <RentalData />;
      },
    },
    {
      key: "4",
      label: "lease details",
      isDone: false,
      component: () => {
        return <LeaseDetailsData />;
      },
    },
    {
      key: "5",
      label: "VATfinancing",
      isDone: false,
      component: () => {
        return <VatFinData />;
      },
    },
  ]);

  const [activeStep, setActiveStep] = useState<Step>(steps[0]);

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
          <Modal.Header closeButton className="border-0">
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
            <hr />
            <div className="button-container">
              <Button variant="dark" onClick={handleNext}>
                volgende
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default App;
