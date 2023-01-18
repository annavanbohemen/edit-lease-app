import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./App.css";
import logo from "./assets/logo-beequip.svg";
import arrow from "./assets/chevron-left.png"
import LeaseDetailsData from "./components/LeaseDetailsData";
import MachineData from "./components/MachineData";
import MilageData from "./components/MilageData";
import RentalData from "./components/RentalData";
import SupplierData from "./components/SupplierData";
import VatFinData from "./components/VatFinData";
import {
  LeaseForm,
  MachineConditionStatus,
  MachineLeaseForm,
} from "./models/leaseModel";
import { Step } from "./models/stepsModel";

const App: React.FC = () => {
  const stepsArray: Step[] = [
    {
      key: "1",
      label: "MachineData",
      isDone: false,
      component: () => {
        return <MachineData lease={lease} setLease={setLease} />;
      },
    },
    {
      key: "2",
      label: "Milage",
      isDone: false,
      component: () => {
        return <MilageData />;
      },
    },
    {
      key: "3",
      label: "Supplier",
      isDone: false,
      component: () => {
        return <SupplierData />;
      },
    },
    {
      key: "4",
      label: "Rental",
      isDone: false,
      component: () => {
        return <RentalData />;
      },
    },
    {
      key: "5",
      label: "lease details",
      isDone: false,
      component: () => {
        return <LeaseDetailsData />;
      },
    },
    {
      key: "6",
      label: "VATfinancing",
      isDone: false,
      component: () => {
        return <VatFinData />;
      },
    },
  ];

  const [show, setShow] = useState<boolean>(false);
  const [steps, setSteps] = useState<Step[]>(stepsArray);
  const [lease, setLease] = useState<LeaseForm>({
    machineData: {
      naam: "Scania R730 - Topline Hydroliek",
      merk: "Scania",
      model: "R730",
      jaar: "2022",
      waarde: "120.000",
      conditie: MachineConditionStatus.Nieuw,
      leasevorm: MachineLeaseForm.Financial,
    },
    supplier: {
      supplierName: "",
    },
    rental: {
      ableToRent: true,
    },
    LeaseDetails: {
      deposit: 0,
      finalTerm: 0,
      duration: 0,
    },
    VATfinancing: {
      SpreadPayments: true,
    },
    milage: {
      presentMilage: true,
      milage: 0,
    },
  });

  const [activeStep, setActiveStep] = useState<Step>(stepsArray[0]);
  const [finish, setFinish] = useState<boolean>(false);
  const [width, setWidth] = useState<string>("0px");
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ulWidth = ref.current ? ref.current.offsetWidth : 0;
    const numberOfSteps = steps.length;
    const number = (ulWidth / numberOfSteps - 10).toString();
    setWidth(number + "px");
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    UpdateSteps();
    setShow(true);
  };

  //will update steps to right number
  const UpdateSteps = () => {
    const leasevorm = lease.machineData.leasevorm;
    const conditie = lease.machineData.conditie;
    if (
      leasevorm === MachineLeaseForm.SaleLeaseBack &&
      conditie === MachineConditionStatus.Nieuw
    ) {
      ChangeSteps(3);
    } else if (
      leasevorm === MachineLeaseForm.SaleLeaseBack &&
      conditie === MachineConditionStatus.Gebruikt
    ) {
      ChangeSteps(4);
    } else if (
      leasevorm !== MachineLeaseForm.SaleLeaseBack &&
      conditie === MachineConditionStatus.Nieuw
    ) {
      ChangeSteps(5);
    } else {
      ChangeSteps(6);
    }
  };

  const ChangeSteps = (x: number) => {
    if (x === 3) {
      setSteps(setStepsArray([1, 2, 5], stepsArray));
    } else if (x === 4) {
      setSteps(setStepsArray([2, 5], stepsArray));
    } else if (x === 5) {
      setSteps(setStepsArray([1], stepsArray));
    } else {
      setSteps(stepsArray);
    }
  };

  const setStepsArray = (remove: Array<number>, arr: Array<Step>) => {
    for (let i = remove.length - 1; i >= 0; i--) {
      arr.splice(remove[i], 1);
    }

    for (let i = 0; i < arr.length; i++) {
      const key = i + 1;
      arr[i].key = key.toString();
    }
    return arr;
  };

  const handleNext = () => {
    if (steps[0]) {
      UpdateSteps();
    }

    if (steps[steps.length - 2].key === activeStep.key) {
      setFinish(true);
    }

    if (steps[steps.length - 1].key === activeStep.key) {
      alert("de lease data wordt opgeslagen");
      console.log("lease", lease);
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key <= activeStep.key) x.isDone = true;
        return x;
      })
    );
    setActiveStep(steps[index + 1]);
  };

  const handlePrevious = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    setActiveStep(steps[index -1])
  }

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
          <Modal.Header closeButton className="border-0 modelHeader">
            <Modal.Title>
              {activeStep.key}. {lease.machineData.naam}
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="steps">
                <ul className="nav" ref={ref}>
                  {steps.map((step, i) => {
                    return (
                      <li
                        style={{ width: width }}
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
              {activeStep.key === '1' || finish ? (
                ""
              ) : (
                <Button variant="outline-dark" className="buttonPrev" onClick={handlePrevious}>
                   <img src={arrow} className="back-arrow" alt="back-arrow" />
                   Vorige
                </Button>
              )}

              <Button variant="dark" onClick={handleNext}>
                {finish ? "opslaan" : "volgende"}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default App;
