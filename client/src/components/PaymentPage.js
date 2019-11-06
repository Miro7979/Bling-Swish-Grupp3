import React from 'react';
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
  Label,
  Input
} from 'reactstrap';

function PaymentPage() {



  return (
    <div className="container">
      <Row>
        <Col xs={12} className="mt-3">
          <Label className="payment-lable">Betala till:</Label>
        </Col>
        <Col xs={12} className="mt-3">
          <InputGroup>
            <Input className="border-bottom" placeholder="mottagare" />
          </InputGroup>
        </Col>
        <Col xs={12} className="mt-3">

          <InputGroup>
            <Input placeholder="belopp" />
          </InputGroup>
        </Col>
        <Col xs={12} className="mt-3">

          <InputGroup>
            <Input placeholder="meddelande" />
          </InputGroup>
        </Col>
        <Col xs={12} className="mt-3">

          <Button color="success">success</Button>{' '}
        </Col>
      </Row>
    </div >
  );


};

export default PaymentPage;