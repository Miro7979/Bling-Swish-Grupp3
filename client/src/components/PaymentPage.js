import React, { useState } from 'react';
import {
  Row,
  Col,
  InputGroup,
  Button,
  Label,
  Input
} from 'reactstrap';
const request = require('request-promise-native');

const PaymentPage = () => {

  const [balance, setBalance] = useState("")
  const [amount, setAmount] = useState("")
  const [toUser, setUser] = useState("")
  const [message, setMessage] = useState("")

  let payment = {
    balance: 4000,
    amount,
    toUser,
    message
  }

  async function gatherPaymentInfo() {
    // payment.balance -= payment.amount;
    console.log("payment", payment)

    let response = {
      uri: '/api/betalningar',
      body: {
        ...payment
      },
      json: true
    };
    try {
      const res = await request.post(response);
      console.log(res)
      if (res.statusCode !== 200) {
        console.log("oh no we got an error")
      }
      console.log(res);
      console.log("statuscode", res.statusCode)
      return res;
    } catch (err) {
      return err;
    }
  }



  const handleBalanceChange = e => setBalance(e.target.value);
  const handleAmountChange = e => setAmount(e.target.value);
  const handleToUserChange = e => setUser(e.target.value);
  const handleMessageChange = e => setMessage(e.target.value);

  return (
    <div className="container">
      <Row>
        <Col xs={12} className="mt-3">
          <Label className="payment-lable" value={balance}>Din balans: {payment.balance} kr</Label>
        </Col>
        <Col lx={7} lg={7} md={7} sm={12} xs={12} className="mt-3">
          <Label className="payment-lable">Betala till:</Label>
        </Col>
        <Col lx={7} lg={7} md={7} sm={12} xs={12} className="mt-3">
          <InputGroup>
            <Input className="border-bottom" placeholder="mottagare" value={toUser} onChange={handleToUserChange} />
          </InputGroup>
        </Col>
        <Col lx={7} lg={7} md={7} sm={12} xs={12} className="mt-3">

          <InputGroup>
            <Input placeholder="belopp" value={amount} onChange={handleAmountChange} />
          </InputGroup>
        </Col>
        <Col lx={7} lg={7} md={7} sm={12} xs={12} className="mt-3">

          <InputGroup>
            <Input placeholder="meddelande" value={message} onChange={handleMessageChange} />
          </InputGroup>
        </Col>
        <Col lx={7} lg={7} md={7} sm={12} xs={12} className="mt-3">
          <Button onClick={gatherPaymentInfo} color="success">Bling</Button>{' '}
        </Col>
      </Row>
    </div >
  );


};

export default PaymentPage;


