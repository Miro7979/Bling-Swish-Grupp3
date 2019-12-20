import React, { useContext, useState } from 'react';
import Context from './Context';
import { Notification, Transaction, User, Findfavorite, Login, Setfavorite } from 'the.rest/dist/to-import';
import {
  Row,
  Col,
  InputGroup,
  Button,
  Label,
  Input,
  Alert
} from 'reactstrap';
import Favorites from './Favorites';

const PaymentPage = props => {

  const [state, setState] = useContext(Context);
  const [number, setNumber] = useState("");
  const [cash, setCash] = useState("");
  const [message, setMessage] = useState("");
  const [problem, setProblem] = useState(false);
  const [limitProblem, setLimitProblem] = useState(false);
  const dismissProblem = () => setProblem(false);
  const [sendMoney, setSendMoney] = useState(false);
  const dismissSendMoney = () => setSendMoney(false);
  const handleNumberChange = e => setNumber(e.target.value);
  const handleMessageChange = e => setMessage(e.target.value);
  const handleCashChange = e => setCash(e.target.value);
  const setFavorites = useState(state.user.favorites)[1];
  const [showFavorites, setShowFavorites] = useState(true);
  // const handleshowFavoritesChange = e => setShowFavorites(e.target.value);
  const [problemTimer, setProblemTimer] = useState();



  async function addToFavorites() {
    //find input + e.target.value and save to an array of favorites
    let favoriteFound =  new Findfavorite({ phone: number });
    await favoriteFound.save()
    let loggedInUser = await Login.findOne();
    if (favoriteFound && !loggedInUser.favorites.find(userId => userId._id === favoriteFound._id)) {
      if (loggedInUser.favorites.includes(favoriteFound._id)) {
        alert("lägg inte till samma person två gånger")
        return
      }
      setShowFavorites(false)
      let settingFavorite = new Setfavorite({favoriteId:favoriteFound._id})
      await settingFavorite.save()
      loggedInUser.favorites.push(favoriteFound._id);
      //await loggedInUser.save();
      //loggedInUser = await User.findOne({ _id: state.user._id })
      setState((prev) => ({ ...prev, user: { ...prev.user, favorites: loggedInUser.favorites } }));
      setFavorites(loggedInUser.favorites);
      setShowFavorites(true)
    }
  }

  async function sendNotification(phoneNumber, message, fromUserId) {
    let data = { phoneNumber, message, cash };
    try {
      await fetch('/api/send-sse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Error:', error);
    }
    // window.location.reload();
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
      message: message || 'En transaktion har genomförts.',
      to: number,
      from: state.user._id
    }

    setTimeout(() => {
      setProblem(false);
      setSendMoney(false);
    }, 2000)

    if (!number || !cash || number === state.user.phone || cash < 0 || cash > 10000 || state.user.balance < cash) {
      setProblem(true);
      setSendMoney(false)
      return;
    }
    if (cash > state.user.limit) {
      setProblem(true)
      setLimitProblem(true);
      return
    }

    if (number && cash) {
      setSendMoney(true)
      setProblem(false)
    }
    try {
      let bling = await new Transaction(transaction)
      await bling.save()
      global.stateUpdater()
      createNotification();
    }
    catch {

      setProblem(true);
      clearTimeout(problemTimer);
      let timer = setTimeout(() => {
        setProblem(false);

      }, 2000)
      setProblemTimer(timer);
    } finally {
      return ''
    }

  }

  return (
    <React.Fragment>
      <Row>
        <Col sm={{ size: 8, offset: 2 }} className=" userBalance mt-3" >
          {'Hej ' + state.user.name + '! Du har ' + state.user.balance.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' }) + ' på din Bling konto.'}
          {state.user.limit ? ' Och din överföringsbegränsning per transaktion är ' + state.user.limit.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' }) : ''}
        </Col>
        <Col sm={{ size: 6, offset: 3 }} className="mt-5">
          <Label className="payment-lable">Betala till:</Label>
        </Col>
        <Col sm={{ size: 6, offset: 3 }} className="mt-3">
          <div>
            <Alert color="danger" isOpen={problem} toggle={dismissProblem} fade={true}>
              Din betalning gick inte genom. {limitProblem && <div> Din beloppgräns har överskridits. </div>} Försök igen.
            </Alert>
          </div>
          <div>
            <Alert color="success" isOpen={sendMoney} toggle={dismissSendMoney} fade={true}>
              Dina pengar har skickats!
            </Alert>
          </div>
          <InputGroup>
            <Input className="receipient border-bottom" placeholder="mottagarens nummer"
              value={number}
              type="Number"
              onChange={handleNumberChange} />
            <Button className="favoBtn" type="submit" onClick={addToFavorites}>Spara som favorit</Button>

          </InputGroup>
        </Col>
        <Col sm={{ size: 6, offset: 3 }} className="mt-3">
          <InputGroup>
            <Input placeholder="belopp"
              value={cash}
              type="Number"
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
          <Button onClick={sendTransaction} className="sendTransactionBtn">Skicka</Button>
        </Col>
      </Row>
      {showFavorites ? <Favorites setNumber={setNumber} /> : ""}
    </React.Fragment>
  );
};

export default PaymentPage;