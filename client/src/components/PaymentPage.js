
import React, { useContext, useState } from 'react';
import Context from './Context';
import { Notification, Transaction, Login } from 'the.rest/dist/to-import'
import {
  Row,
  Col,
  InputGroup,
  Button,
  Label,
  Input
} from 'reactstrap';


const PaymentPage = () => {

  const [state, setState] = useContext(Context);
  const [number, setNumber] = useState("");
  const [cash, setCash] = useState("");
  const [message, setMessage] = useState("")

  // const handleBalanceChange = e => setBalance(e.target.value);
  const handleNumberChange = e => setNumber(e.target.value);
  const handleMessageChange = e => setMessage(e.target.value);
  const handleCashChange = e => setCash(e.target.value);
  async function createNotification() {
    let notify = {
      message: message || "Du har fått en betalning på ditt Bling konto",
      toUser: number,
      fromUser: state.user._id
    }
    let hejsan = await new Notification(notify)
    console.log(await hejsan.save(), "notis skickat")

  }
  async function sendTransaction() {
    let transaction = {
      // balance: balance,
      message: message || 'Du har fått japp brush',
      amount: cash,
      toUser: number,
      fromUser: state.user._id,
    }

    let bling = await new Transaction(transaction)
    console.log(await bling.save(), "transaction skickat")
    createNotification();
  }

  return (
    <div className="container">
      <Row>
        <Col xs={12} className="mt-3">
          <Label className="payment-lable">Betala till:</Label>
        </Col>
        <Col xs={12} className="mt-3">
          <InputGroup>
            <Input className="border-bottom" placeholder="ange telefonnummer"
              value={number}
              onChange={handleNumberChange} />
          </InputGroup>
        </Col>
        <Col xs={12} className="mt-3">
          <InputGroup>
            <Input placeholder="belopp"
              value={cash}
              onChange={handleCashChange} />
          </InputGroup>
        </Col>
        <Col xs={12} className="mt-3">
          <InputGroup>
            <Input placeholder="meddelande"
              value={message}
              onChange={handleMessageChange} />
          </InputGroup>
        </Col>
        <Col xs={12} className="mt-3">
          <Button onClick={sendTransaction} color="success">Bling</Button>
        </Col>
      </Row>
    </div >
  );
};
export default PaymentPage;