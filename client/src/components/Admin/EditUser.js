import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Row } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { User } from '../../../../node_modules/the.rest/dist/to-import';
// const request = require('request-promise-native');


const EditUser = (props) => {
  const [user, setUser] = useState(false);
  const [update, setUpdate] = useState(false);
  const dismissUpdate = () => setUpdate(false);

  //I WANNA FIND ONE USER TO EDIT
  async function getUserInfo() {
    //get what's in the browser, the url but only the part after 3rd slash
    let id = window.location.pathname.split('/')[3]
    let userToEdit = await User.findOne({ _id: id })
    //changed state...changed values of user/changed user 
    setUser(userToEdit)
  }

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
    transactions: "Transaktioner"
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
    setUpdate(true)
  }



  return !user ? null : (
    <Form>
      <div>
        <Row>
        </Row>
      </div>
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
      {
        update ?
          <Link to="/adminsida"><Button>Gå tillbaka</Button></Link>
          :
          <Button onClick={handleSubmit}>Updatera</Button>
      }
      <Alert className="mt-3" color="info" isOpen={update} toggle={dismissUpdate} fade={true}>
        Användaren är nu updaterad.
      </Alert>
    </Form>
  );
}

export default withRouter(EditUser);