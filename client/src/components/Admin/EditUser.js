import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { User } from '../../../../node_modules/the.rest/dist/to-import';
const request = require('request-promise-native');


const EditUser = (props) => {
  //I WANNA FIND ONE USER TO EDIT
  async function getUserInfo() {
    //get what's in the browser, the url but only the part after 3rd slash
    let id = window.location.pathname.split('/')[3]
    let userToEdit = await User.findOne({ _id: id })
    //changed state...changed values of user/changed user 
    setUser(userToEdit)
  }
  const [user, setUser] = useState(false);

  useEffect(() => {
    //calling function once and unmount again
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
    alert('användaren är uppdaterad!')
    //here put something to get back to the table
    //return to '/adminsida'
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
      <Link to={'/adminsida'}><Button onClick={handleSubmit}>Updatera</Button></Link>
    </Form>
  );
}

export default withRouter(EditUser);