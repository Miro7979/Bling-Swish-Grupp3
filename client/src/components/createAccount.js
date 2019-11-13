import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Container, FormFeedback } from 'reactstrap';
import { resolve } from 'path';
const request = require('request-promise-native');

const CreateAccountModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  async function gatherUserInfo() {
    let user = {
      name,
      email,
      password,
      phone,
      nationalIdNumber
    }

    let response = {
      uri: 'http://localhost:3000/api/users',
      body: {
        ...user
      },
      json: true
    };
    try {
      const res = await request.post(response);
      console.log(res)
      if (res.statusCode !== 200) {
        console.log("oh no we got an error")
      }
      console.log(res);
      console.log("statuscode", res.statusCode)
      return res;
    } catch (err) {
      return err;
    }
  }
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhoneNumber] = useState("")
  const [nationalIdNumber, setIdNumber] = useState("")
  const [password, setPassword] = useState("")

  const handleNameChange = e => setName(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePhoneChange = e => setPhoneNumber(e.target.value);
  const handleIdNumberChange = e => setIdNumber(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className} size="md">
        <ModalHeader toggle={toggle}>Skapa konto</ModalHeader>
        <ModalBody>
          <InputGroup>
            <Container>
              <Input placeholder="E-post" value={email} onChange={handleEmailChange} className="mt-3 email" />
              <Input placeholder="För och efternamn" value={name} onChange={handleNameChange} className="mt-3 personName" />
              <Input placeholder="Telefon-nummer" value={phone} onChange={handlePhoneChange} className="mt-3 phoneNumber" />
              <Input placeholder="Personnummer , 12 siffror" value={nationalIdNumber} onChange={handleIdNumberChange} className="mt-3 idNumber" />
              <Input placeholder="Lösenord" value={password} type="password" onChange={handlePasswordChange} className="mt-3 password" />
              <FormFeedback tooltip>
                Uh oh! Looks like there is an issue with your email. Please input a correct email.
            </FormFeedback>
            </Container>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={gatherUserInfo}>Skapa konto</Button>{' '}
          <Button color="secondary" onClick={toggle}>Avbryt</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateAccountModal;
