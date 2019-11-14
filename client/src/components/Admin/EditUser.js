import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
// import createAccount from '../components/createAccount';
import { User } from 'the.rest/dist/to-import';
const request = require('request-promise-native');


const EditUser = (props) => {



  async function getUserInfo() {
    const { userid } = props.match.params;
    setUser(await User.findOne(userid));
  }

  const [user, setUser] = useState(false);
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [phone, setPhoneNumber] = useState("")
  // const [nationalIdNumber, setIdNumber] = useState("")
  // const [password, setPassword] = useState("")

  // const handleNameChange = e => setName(e.target.value);
  // const handleEmailChange = e => setEmail(e.target.value);
  // const handlePhoneChange = e => setPhoneNumber(e.target.value);
  // const handleIdNumberChange = e => setIdNumber(e.target.value);
  // const handlePasswordChange = e => setPassword(e.target.value);

  // let userFound = await User.findOne({ name: /Lilla/i });
  // console.log(userFound);

  // setState((prev) => (
  //   { ...prev, user: user, loading: false }
  // ))

  getUserInfo();

  let inputLabels = {
    name: "Namn",
    phone: "Telefonnummer",
    email: "Email",
    nationalIdNumber: "Personnummer",
  };

  let selectRole = {
    name: "Namn",
    phone: "Telefonnummer",
    email: "Email",
    nationalIdNumber: "Personnummer",
  };

  let handleChange = e => {
    let key = e.target.getAttribute('type');
    let editedUser = { ...user };
    editedUser[key] = e.target.value;
    setUser(editedUser);
  }


  return !user ? null : (
    <Form>
      {Object.keys(inputLabels).map(key => {
        let label = inputLabels[key];
        return (
          <FormGroup key={key}>
            <Label className="d-block">
              {label}
              <Input type={key} value={user[key]} onChange={handleChange}></Input>
            </Label>
          </FormGroup>
        );
      })}
      {/* {Object.keys(selectRole).map(role => {
        let select = selectRole[role];
        return (
          <FormGroup>
            <Label for="selectRole">Roll:</Label>
            <Input type={role} value={user[role]}>
              <option>Välj</option>
              <option>kundkund</option>
              <option>förälderkund</option>
              <option>barnkund</option>
            </Input>
          </FormGroup>

        )
      })} */}
      <FormGroup>
        <Label for="selectKids">Har barn:</Label>
        <Input type="select" name="select" id="selectKids">
          <option>Välj</option>
          <option>inga</option>
          <option>1 barn</option>
          <option>2 barn</option>
          <option>3 barn</option>
          <option>4 barn</option>
        </Input>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          reset password email
        </Label>
      </FormGroup>
      <Button>Skicka</Button>
      <Button>Updatera</Button>
    </Form>
  );
}

export default withRouter(EditUser);