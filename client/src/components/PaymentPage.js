import React, { useContext, useState } from 'react';
import Context from './Context';
import { Notification, Transaction, User } from '../../../node_modules/the.rest/dist/to-import';
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

const PaymentPage = (props) => {

  const [state] = useContext(Context);
  const [number, setNumber] = useState("");
  const [cash, setCash] = useState("");
  const [message, setMessage] = useState("")
  const [problem, setProblem] = useState(false);
  const dismissProblem = () => setProblem(false);
  const handleNumberChange = e => setNumber(e.target.value);
  const handleMessageChange = e => setMessage(e.target.value);
  const handleCashChange = e => setCash(e.target.value);

  const [favourites, setFavourites] = useState([]);

  async function addToFavourites(e) {
    //find input + e.target.value
    //save to [favourites]
    let favouriteFound = await User.findOne({ phone: number })
    let loggedInUser = await User.findOne({ phone: state.user.phone });
    loggedInUser.favorites.push(favouriteFound._id);
    await loggedInUser.save();
    setFavourites(favourites)
  
  }

  async function sendNotification(phoneNumber, message, fromUserId) {
    let data = { phoneNumber, message, fromUserId, cash };
    await fetch('/api/send-sse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

  };

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
    <React.Fragment>
      <Row>
        <Col sm={{ size: 6, offset: 3 }} className="mt-3" >
          {'Saldo på min konto: ' + state.user.balance}
        </Col>
        <Col sm={{ size: 6, offset: 3 }} className="mt-5">
          <Label className="payment-lable">Betala till:</Label>
        </Col>
        <Col sm={{ size: 6, offset: 3 }} className="mt-3">
          <div>
            <Alert color="danger" isOpen={problem} toggle={dismissProblem} fade={true}>
              Din betalning gick inte genom, försök igen.
            </Alert>
          </div>
          <InputGroup>
            <Input className="border-bottom" placeholder="mottagare"
              value={number}
              onChange={handleNumberChange} />
            <Button onClick={addToFavourites}>Spara favorit</Button>

          </InputGroup>
        </Col>
        <Col sm={{ size: 6, offset: 3 }} className="mt-3">
          <InputGroup>
            <Input placeholder="belopp"
              value={cash}
              onChange={handleCashChange} />
          </InputGroup>
        </Col>
        <Col sm={{ size: 6, offset: 3 }} className="mt-3">
          <InputGroup>
            <Input placeholder="meddelande"
              value={message}
              onChange={handleMessageChange} />
          </InputGroup>
        </Col>
        <Col sm={{ size: 6, offset: 3 }} className="mt-3">
          <Button onClick={sendTransaction} color="success">Skicka</Button>
        </Col>
      </Row>
      <Favourites data={props.favourite} />
    </React.Fragment>
  );


};

export default PaymentPage;


