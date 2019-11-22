import React, { useState } from 'react';
// import Context from './Context';
import {
  Button,
  Modal,
  ModalBody
} from 'reactstrap';

const CreateNotificationModal = (props) => {
  // let [state] = useContext(Context);

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (
    <div className="notisModal">
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody className="modalBody">
          Du har fått en betalning på ditt Bling konto.
          </ModalBody>
        <Button className="notisModalBtn" onClick={toggle}>Ok</Button>
      </Modal>
    </div>
  );
}

export default CreateNotificationModal;