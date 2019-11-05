import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input
} from 'reactstrap';

function PaymentPage() {



  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">Betala</InputGroupAddon>
        <Input placeholder="mottagare" />  <Button color="">+</Button>{' '}
        <Input />
        <br />
      </InputGroup>
      <InputGroup>
        <Input placeholder="belopp" />
      </InputGroup>
      <br />
      <InputGroup>
        <Input placeholder="meddelande" />
      </InputGroup>
      <br />
      <Button color="success">success</Button>{' '}
    </div >
  );


};

export default PaymentPage;