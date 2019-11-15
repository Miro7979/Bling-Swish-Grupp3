import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
// import createAccount from '../components/createAccount';
import { User } from 'the.rest/dist/to-import';
const request = require('request-promise-native');


const EditUser = (props) => {
  //I WANNA FIND ONE USER TO EDIT OR DELETE
  async function getUserInfo() {
    const { userid } = props.match.params;
    setUser(await User.findOne(userid));
    console.log(userid);
  }

  const [user, setUser] = useState(false);
  
  getUserInfo();

  let inputLabels = {
    name: "Namn",
    phone: "Telefonnummer",
    email: "Email",
    nationalIdNumber: "Personnummer",
    role: "Roll",
    children: "Barn",
    notificatations: "Meddelanden"

  };

  let handleChange = e => {
    let key = e.target.getAttribute('type');
    let editedUser = { ...user };
    editedUser[key] = e.target.value;
    setUser(editedUser);
    console.log(editedUser);

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
      {/* <FormGroup>
        <Label for="selectRole">Roll:</Label>
        <Input type="select" name="select" id="selectRole">
          <option>Välj</option>
          <option>kundkund</option>
          <option>förälderkund</option>
          <option>barnkund</option>
        </Input>
      </FormGroup> */}
      {/* <FormGroup>
        <Label for="selectKids">Har barn:</Label>
        <Input type="select" name="select" id="selectKids">
          <option>Välj</option>
          <option>inga</option>
          <option>1 barn</option>
          <option>2 barn</option>
          <option>3 barn</option>
          <option>4 barn</option>
        </Input>
      </FormGroup> */}
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          reset password email
        </Label>
      </FormGroup>
      <Button>Updatera</Button>
    </Form>
  );
}

export default withRouter(EditUser);