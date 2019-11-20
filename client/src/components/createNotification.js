
import React, { useState } from 'react';
import Context from './Context';
import { Notification } from 'the.rest/dist/to-import'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

const CreateNotification = (props) => {
  let [state, setState] = useContext(Context);
  const [notification, setNotification] = useState(false);

  const toggle = () => setNotification(!notification);
  const [number, setNumber] = useState("")
  const handleNumberChange = e => setNumber(e.target.value);

  async function createNotification() {
    let notify = {
      message: "Du har fått en betalning på din Bling konto",
      toUser: number,
      fromUser: state.user
    }
    //user: ['email']
    let hejsan = await new Notification(notify)
    console.log(await hejsan.save(), "hej")
  }

  return (
    <div>
      <h1>Meddelande : {createNotification} </h1>
      <button onClick={message}>Meddelande</button>
      <Button color="info" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={notification} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Meddelande från Bling</ModalHeader>
        <ModalBody>
          {createNotification}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateNotification;