import React, { useState } from 'react';
// import Context from './Context';
import {
  Button,
  Modal,
  ModalBody
} from 'reactstrap';

const CreateNotificationModal = (props) => {
  // let [state] = useContext(Context);

  const { className } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => {
    setModal(false)
  };

  const callFunctionsOnApp = () => {
    props.toggleNotificationModal();
  }

  return (
    <div className="notisModal">
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody className="modalBody">
          <h5 className="notifyMessage">Du har fått en betalning på ditt Bling konto.</h5>
        </ModalBody>
        <Button className="notisModalBtn" onClick={callFunctionsOnApp}>Ok</Button>
      </Modal>
    </div>
  );
}

export default CreateNotificationModal;