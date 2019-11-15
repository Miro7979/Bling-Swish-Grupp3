
import React, { useState } from 'react';
import Context from './Context';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateNotification = (props) => {
  let [state, setState] = useContext(Context);
  const {
    buttonLabel,
    className
  } = props;

  const [notification, setNotification] = useState(false);

  const toggle = () => setNotification(!notification);

  return (
    <div>
      <h1>Meddelande : {state.message} </h1>
      <button onClick={message}>Meddelande</button>
      <Button color="info" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={notification} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Du har fått en betalning på din Bling konto.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateNotification;