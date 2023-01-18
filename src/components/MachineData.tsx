import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import "./styles.css";

interface Props {
  //LeaseData: 
}

const MachineData: React.FC<Props> = ({}) => {
  const [inputs, setInputs] = useState({
    merk: "",
    model: "",
    jaar: "",
    waarde: "",
    conditie: "gebruikt",
    leasevorm: "financial",
  });

  const handleChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <Form className="leaseForm">
      <Container>
        <Row>
          <div className="leaseForm-header">Kloppen de gegevens nog?</div>
        </Row>
        <Row>
          <Col className="col">
            <Form.Label>Merk</Form.Label>
            <Form.Control
              type="text"
              name="merk"
              value={inputs.merk || ""}
              onChange={handleChange}
            />
          </Col>
          <Col className="col">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={inputs.model || ""}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className="col">
            <Form.Label>Bouwjaar</Form.Label>
            <Form.Select
              name="jaar"
              value={inputs.jaar || ""}
              onChange={handleChange}
            >
              <option>Selecteer bouwjaar</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </Form.Select>
          </Col>
          <Col className="col">
            <Form.Label>Conditie</Form.Label>
            <div className="radio">
              <Form.Check
                type="radio"
                value="gebruikt"
                name="conditie"
                label="gebruikt"
                checked={inputs.conditie === "gebruikt"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                value="nieuw"
                name="conditie"
                label="nieuw"
                checked={inputs.conditie === "nieuw"}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col">
            <Form.Label>Aanschafwaarde</Form.Label>
            <InputGroup>
              <InputGroup.Text>€</InputGroup.Text>
              <Form.Control
                type="text"
                name="waarde"
                value={inputs.waarde || ""}
                onChange={handleChange}
              />
            </InputGroup>
          </Col>
          <Col className="col">
            <Form.Label>Leasevorm</Form.Label>
            <div className="radio">
              <Form.Check
                type="radio"
                value="financial"
                name="leasevorm"
                label="Financial"
                checked={inputs.leasevorm === "financial"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                value="operational"
                name="leasevorm"
                label="Operational"
                checked={inputs.leasevorm === "operational"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                value="saleleaseback"
                name="leasevorm"
                label="Sale & Leaseback"
                checked={inputs.leasevorm === "saleleaseback"}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default MachineData;
