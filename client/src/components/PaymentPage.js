import React, { useContext } from 'react';
import Context from './Context';
import {
  Row,
  Col,
  InputGroup,
  Button,
  Label,
  Input
} from 'reactstrap';

function PaymentPage() {

  let state = useContext(Context)[0]
  const message = () => {
    // NO!!!! We do not set state without spreading PREV! This would remove all other things we need in state that other components redirect on etc...
    // setState({ message: 'Du har fått betalning' }) <-- Nooooo!!!
  }

  return (
    <div className="container">
      <Row>
        <h1>Meddelande : {state.message} </h1>
        <button onClick={message}>Meddelande</button>
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
          <Button color="success">Bling</Button>{' '}
        </Col>
      </Row>
    </div >
  );


};

export default PaymentPage;


