import React, { useContext, useState } from 'react';
import Context from './Context';
import { Notification, Transaction } from 'the.rest/dist/to-import'
import {
  Row,
  Col,
  InputGroup,
  Button,
  Label,
  Input,
  Alert
} from 'reactstrap';
import Favourites from './Favourites';
import CreateNotificationModal from './createNotificationModal';


const PaymentPage = () => {

  const [state] = useContext(Context);
  const [number, setNumber] = useState("");
  const [cash, setCash] = useState("");
  const [message, setMessage] = useState("")
  const [problem, setProblem] = useState(false);
  const dismissProblem = () => setProblem(false);

  const handleNumberChange = e => setNumber(e.target.value);
  const handleMessageChange = e => setMessage(e.target.value);
  const handleCashChange = e => setCash(e.target.value);


  async function createNotification() {
    let notify = {
      message: message || "Du har fått en betalning på ditt Bling konto",
      to: number,
      from: state.user._id
    }
    try {
      let notis = new Notification(notify)
      await notis.save();
    }
    catch {
      setProblem(true);
    } finally {
      return ''
    }
  }

  async function sendTransaction() {
    let transaction = {
      amount: cash,
      to: number,
      from: state.user._id
    }
    if (!number || !cash) {
      setProblem(true)
      return
    }
    setProblem(false)
    try {
      let bling = await new Transaction(transaction)
      await bling.save();
      createNotification();
    }
    catch {
      setProblem(true);
    } finally {
      return ''
    }
  }

  return (
    <div className="container">
      <Row>
        <Col xs={12} className="mt-3">
          <Label className="payment-lable">Betala till:</Label>
        </Col>
        <Col xs={12} className="mt-3">
          <div>
            <Alert color="danger" isOpen={problem} toggle={dismissProblem} fade={true}>
              Din betalning gick inte genom, försök igen.
            </Alert>
          </div>
          <InputGroup>
            <Input className="border-bottom" placeholder="mottagare"
              value={number}
              onChange={handleNumberChange} />
          </InputGroup>
          <Favourites />
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
          <Button onClick={sendTransaction} color="success">Skicka</Button>
        </Col>
      </Row>
    </div >
  );


};

export default PaymentPage;


