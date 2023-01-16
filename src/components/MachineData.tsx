import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";

const MachineData: React.FC = () => {
  const [inputs, setInputs] = useState({
    merk: "",
    model: "",
    jaar: '',
    waarde: '',
    conditie: 'gebruikt',
    leasevorm: 'financial',
  });

  const handleChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <Container>
      <form className="leaseForm">
        <Row>
          <div>Kloppen de gegevens nog?</div>
        </Row>
        <Row>
          <Col className="col">
            <label>Merk</label>
            <input
              type="text"
              name="merk"
              value={inputs.merk || ""}
              onChange={handleChange}
            />
          </Col>
          <Col className="col">
            <label>Model</label>
            <input
              type="text"
              name="model"
              value={inputs.model || ""}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className="col">
            <label>Bouwjaar</label>
            <select
              name="jaar"
              value={inputs.jaar || ''}
              onChange={handleChange}
            >
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </Col>
          <Col className="col">
            <label>Conditie</label>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="gebruikt"
                  name="conditie"
                  checked={inputs.conditie === 'gebruikt'}
                  onChange={handleChange}
                />
                Gebruikt
              </label>
              <label>
                <input
                  type="radio"
                  value="nieuw"
                  name="conditie"
                  checked={inputs.conditie === 'nieuw'}
                  onChange={handleChange}
                />
                Nieuw
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col">
            <label>Aanschafwaarde</label>
            <input
              type="text"
              name="waarde"
              value={inputs.waarde || ''}
              onChange={handleChange}
            />
          </Col>
          <Col className="col">
            <label>Leasevorm</label>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="financial"
                  name="leasevorm"
                  checked={inputs.leasevorm === 'financial'}
                  onChange={handleChange}
                />
                Financial
              </label>
              <label>
                <input
                  type="radio"
                  value="operational"
                  name="leasevorm"
                  checked={inputs.leasevorm === 'operational'}
                  onChange={handleChange}
                />
                Operational
              </label>
              <label>
                <input
                  type="radio"
                  value="saleleaseback"
                  name="leasevorm"
                  checked={inputs.leasevorm === 'saleleaseback'}
                  onChange={handleChange}
                />
                Sale & Leaseback
              </label>
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default MachineData;