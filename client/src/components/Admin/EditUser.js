import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
// import createAccount from '../components/createAccount';
import { User } from '../../../../node_modules/the.rest/dist/to-import';
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

  const handleSubmit = () => {
    let userToSave = new User(user);
     userToSave.save();
    // alert updated
    alert('uppdaterad!')
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