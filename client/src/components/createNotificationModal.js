import React, { useState } from 'react';
// import Context from './Context';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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
        <ModalHeader className="modalHeader">Bling notis</ModalHeader>
        <ModalBody className="modalBody">
          Du har fått en betalning på ditt Bling konto.
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateNotificationModal;