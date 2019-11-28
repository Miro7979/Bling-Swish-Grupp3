import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Container, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import {Reset} from 'the.rest/dist/to-import'

const ForgotPasswordModal = () => {
  useEffect(() => {
    setModal(true)
  },[])

  async function gatherUserInfo(){
    if(!email){
      setProblem(true)
      return
    }
    let reset = await new Reset({
        email
    })
    await reset.save()
    setCreated(true)
}
  const [created, setCreated] = useState(false);
  const [problem, setProblem] = useState(false);

  const [email, setEmail] = useState("")

  const handleEmailChange = e => setEmail(e.target.value);
  const dismissCreated = () => setCreated(false);
  const dismissProblem = () => setProblem(false);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} size="md">
       <Link to="/"> <ModalHeader toggle={toggle} >Återställ lösenord</ModalHeader> </Link>
        <ModalBody>
        <Alert color="primary" isOpen={problem} toggle={dismissProblem} fade={false}>
          Yo missing info bro
        </Alert>
        <Alert color="success" isOpen={created} toggle={dismissCreated} fade={false}>
          Om du har en användare så har du fått ett mejl
        </Alert>
          <InputGroup>
            <Container>
              <Input placeholder="E-post" type="email" value={email} onChange={handleEmailChange} className="mt-3" />
            </Container>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={gatherUserInfo}>
              Skicka återställningslänk
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

export default ForgotPasswordModal;
