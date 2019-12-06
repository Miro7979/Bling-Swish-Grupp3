import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { User } from 'the.rest/dist/to-import';

const EditUser = () => {
  const [user, setUser] = useState(false);
  const [update, setUpdate] = useState(false);
  const dismissUpdate = () => setUpdate(false);

  //I WANNA FIND ONE USER TO EDIT
  async function getUserInfo() {
    //get what's in the browser, the url but only the part after 3rd slash
    let id = window.location.pathname.split('/')[3]
    let userToEdit = await User.findOne({ _id: id })
    //changed state...changed values of user/changed user 
    try {
      setUser(userToEdit)
    }
    catch {
      return;
    }
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
    children: "Barn"
  };

  const handleChange = e => {
    let key = e.target.getAttribute('type');
    let editedUser = { ...user };
    editedUser[key] = e.target.value;
    setUser(editedUser);
  }

  async function handleSubmit(){
    let userToSave = new User(user);
    await userToSave.save();
    try {
      setUpdate(true)
    }
    catch {
      return
    }
  }

  return !user ? null : (
    <Form>
      <div>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Alert className="mt-3" color="info" isOpen={update} toggle={dismissUpdate} fade={true}>
              Användaren är nu updaterad.
            </Alert>
          </Col>
        </Row>
      </div>
      {Object.keys(inputLabels).map(key => {
        let label = inputLabels[key];

        return (
          <Row key={user[key]}>
            <Col sm={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label className="d-block">
                  {label}
                  <Input type={key} value={user[key]} onChange={handleChange}></Input>
                </Label>
              </FormGroup>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          {
            update ?
              <Link to="/adminsida"><Button >Gå tillbaka</Button></Link>
              :
              <Button onClick={handleSubmit}>Updatera</Button>
          }
        </Col>
      </Row>
    </Form>
  );
}

export default withRouter(EditUser);