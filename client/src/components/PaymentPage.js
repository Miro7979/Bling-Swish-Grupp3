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
  let [state, setState] = useContext(Context);

  console.log(state)


  const message = () => {
    setState({ message: 'Du har fått betalning' })
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


