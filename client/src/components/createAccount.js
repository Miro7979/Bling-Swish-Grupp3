import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Container, FormFeedback, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { User } from 'the.rest/dist/to-import'


const CreateAccountModal = () => {
  useEffect(() => {
    setModal(true)
  }, []);

  async function gatherUserInfo() {

    if (!name || !email || !password || !phone || !nationalIdNumber) {
      setProblem(true)
      return
    }
    let user = {
      name,
      email,
      password,
      phone,
      nationalIdNumber
    }

    let newUser = new User(user);
    await newUser.save()
    let foundUser = await User.findOne({ email })
    foundUser ? setCreated(true) : setProblem(true)
  }
  const [problem, setProblem] = useState(false);
  const [created, setCreated] = useState(false);

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
  const dismissProblem = () => setProblem(false);
  const dismissCreated = () => setCreated(false);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} size="md">
        <Link to="/"> <ModalHeader toggle={toggle} >Skapa konto</ModalHeader> </Link>
        <ModalBody>
          <Alert color="primary" isOpen={problem} toggle={dismissProblem} fade={false}>
            Yo missing info bro
        </Alert>
          <Alert color="success" isOpen={created} toggle={dismissCreated} fade={false}>
            Yo go to login bro you got an account
        </Alert>
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
          <Button color="primary" onClick={gatherUserInfo}>
            Skapa konto
            </Button>
          <Link to="/">
            <Button color="secondary" onClick={toggle}>
              Avbryt
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateAccountModal;
