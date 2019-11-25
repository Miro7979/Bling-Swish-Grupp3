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


  async function sendNotification(phoneNumber, message, fromUserId) {
    let data = { phoneNumber, message, fromUserId, cash };

    let response = await fetch('/api/send-sse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    response = response.json();
    console.log(response);
  }


  async function createNotification() {
    let notify = {
      message: message || "Du har fått en betalning på ditt Bling konto",
      to: number,
      from: state.user._id
    }
    try {
      let notis = new Notification(notify)
      await notis.save();
      sendNotification(number, message, state.user._id);
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
      message: message || 'Du har fått pengar på din bling konto',
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
      await bling.save()

      // // DO IT MANUALLY
      // async function checkUserSession() {
      //   let whoIsLoggedIn = await Login.findOne()
      //   if (whoIsLoggedIn._id) {
      //     setState({ ...state, user: whoIsLoggedIn })
      //     return;
      //   }
      // }
      // checkUserSession()
      // // END OF DO IT MANUALLY
      global.stateUpdater()
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
        {'SALDO: ' + state.user.balance}
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


