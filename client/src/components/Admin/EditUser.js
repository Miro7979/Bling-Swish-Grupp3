import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
// import createAccount from '../components/createAccount';
import { User } from 'the.rest/dist/to-import';
const request = require('request-promise-native');


const EditUser = (props) => {
  //I WANNA FIND ONE USER TO EDIT OR DELETE
  async function getUserInfo() {
    //get what's in the browser
    let id = window.location.pathname.split('/')[3]
    let userToEdit = await User.findOne({ _id: id })
    //changed state...changed values of user aka changed user 
    setUser(userToEdit)
  }

  // let userToBeEdited = (e) = {
  //   name,
  //   phone,
  //   email,
  //   nationalIdNumber,
  //   role: [],
  //   children: Boolean,
  //   notifications: []
  // }
  // console.log(userToBeEdited);

  const [user, setUser] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  let inputLabels = {
    name: "Namn",
    phone: "Telefonnummer",
    email: "Email",
    nationalIdNumber: "Personnummer",
    role: "Roll",
    children: "Barn",
    notificatations: "Meddelanden"

  };

  const handleChange = e => {
    let key = e.target.getAttribute('type');
    let editedUser = { ...user };
    editedUser[key] = e.target.value;
    setUser(editedUser);
  }

  async function handleSubmit(name, email,password, phone, nationalIdNumber) {
    let userToEdit = {
      name,
      email,
      password,
      phone,
      nationalIdNumber
    }
    let user = new User(userToEdit);
    console.log(await user.save())
    console.log('submitted')
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
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          reset password email
        </Label>
      </FormGroup>
      <Button onClick={handleSubmit}>Updatera</Button>
    </Form>
  );
}

export default withRouter(EditUser);