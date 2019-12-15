import React from 'react';
// import Context from './Context';
import {
  Button,
  Modal,
  ModalBody
} from 'reactstrap';

const CreateNotificationModal = (props) => {
  // let [state] = useContext(Context);

  const { className } = props;

  const toggle = () => {
    props.resetModal();
    console.log('toggle');
  };

  const callFunctionsOnApp = () => {
    props.toggleNotificationModal();
    console.log('togglenoti');
  }

  let loginPage = window.location.href.includes('/login');


  return (
    <div className="notisModal">
      <Modal isOpen={props.showModal} toggle={loginPage ? toggle : callFunctionsOnApp} className={className}>
        <ModalBody className="modalBody">
          <h5 className="notifyMessage">Du har fått en betalning på ditt Bling konto.</h5>
        </ModalBody>
        {!loginPage && <Button className="notisModalBtn" onClick={callFunctionsOnApp}>Ok</Button>}
        {loginPage && <Button className="notisModalBtn" onClick={toggle}>Ok</Button>}
      </Modal>
    </div>
  );
}

export default CreateNotificationModal;