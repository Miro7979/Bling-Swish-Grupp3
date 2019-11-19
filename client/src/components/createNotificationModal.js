import React, { useState, useContext } from 'react';
import Context from './Context';
import {
  Button,
  Modal,
  ModalHeader
} from 'reactstrap';

const CreateNotificationModal = (props) => {
  let [state, setState] = useContext(Context);

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  console.log(state.user._id)

  return (
    <div className="notisModal">
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Bling notis</ModalHeader>
        
          Du har fått en betalning på ditt Bling konto.
      

        <Button onClick={toggle}>Ok</Button>

      </Modal>
    </div>
  );
}

export default CreateNotificationModal;