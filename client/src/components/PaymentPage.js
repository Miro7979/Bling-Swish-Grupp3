import React, { useState, useEffect } from 'react';
import { User, Login, Transaction } from 'the.rest/dist/to-import';
import {
  Row,
  Col,
  InputGroup,
  Button,
  Label,
  Input
} from 'reactstrap';

// const request = require('request-promise-native');

const PaymentPage = () => {

  const [state, setState] = useState({
    user: []
  })
  const [balance, setBalance] = useState()
  const [amount, setAmount] = useState('')
  const [toUser, setUser] = useState('')
  const [message, setMessage] = useState('')

  // let payment = {
  //   balance: 4000,
  //   amount,
  //   toUser,
  //   message
  // }

  // let userPayment = {
  //   date: '',
  //   amount: 500,
  //   fromUser: 'siko sa',
  //   toUser: 'miko sa',
  //   balance: 4000,
  // }

  async function handleSubmit(e) {
  

    // let paymentUser = whoIsLoggedIn;

    // // e.preventDefault();
    // paymentUser = new Transaction({
    //   date: paymentUser.date,
    //   amount: paymentUser.amount,
    //   fromUser: paymentUser,
    //   toUser: paymentUser.toUser,
    //   balance: paymentUser.balance,
    // // })
    // console.log(paymentUser)
    // //Post the Transaction to the server
    // console.log(await paymentUser.save());

    // let whoSendPayment = await Transaction.findOne()
    // console.log('Who sent money', whoSendPayment);


  }




  useEffect(() => {
    async function getUser() {
      let endpoint = '/api/imUser';
      const response = await fetch(endpoint);


      const user = await response.json();
      console.log('user',user);

      setState((prev) => (
        { ...prev, user: user, loading: false }
      ))
    }
    getUser();
    
  }, []);




// async function gatherPaymentInfo() {
//   // payment.balance -= payment.amount;
//   console.log("payment", payment)

//   let response = {
//     uri: '/api/betalningar',
//     body: {
//       ...payment
//     },
//     json: true
//   };
//   try {
//     const res = await request.post(response);
//     console.log(res)
//     if (res.statusCode !== 200) {
//       console.log("oh no we got an error")
//     }
//     console.log(res);
//     console.log("statuscode", res.statusCode)
//     return res;
//   } catch (err) {
//     return err;
//   }
// }



const handleBalanceChange = e => setBalance(e.target.value);
const handleAmountChange = e => setAmount(e.target.value);
const handleToUserChange = e => setUser(e.target.value);
const handleMessageChange = e => setMessage(e.target.value);

return (
  <div className="container">
    <Row>
      <Col xs={12} className="mt-3">
        <Label className="payment-lable" onChange= {handleBalanceChange} value={balance}>Din balans: {setBalance.balance} kr</Label>
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
        <Button onClick={handleSubmit} color="success">Bling</Button>{' '}
      </Col>
    </Row>
  </div >
);


};

export default PaymentPage;


