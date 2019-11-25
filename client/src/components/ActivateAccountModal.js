import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Aktiverakonto } from '../../../node_modules/the.rest/dist/to-import';


const ActivateAccountModal = (props) => {
  useEffect(() => {
    findingTheActivationCode()
    setModal(true)
  },[findingTheActivationCode()])

  async function findingTheActivationCode() {
    let encoded = props.match.params.id
    let user = await new Aktiverakonto({encoded})
    await user.save()
    user.activated ? setCreated(true) : setProblem(true)   
  }
  const [problem, setProblem] = useState(false);
  const [created, setCreated] = useState(false);

  const dismissProblem = () => setProblem(false);
  const dismissCreated = () => setCreated(false);

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} size="md">
        <ModalBody>
          <Alert color="danger" isOpen={problem} toggle={dismissProblem} fade={false}>
            Något problem med aktiveringslänken!
        </Alert>
          <Alert color="success" isOpen={created} toggle={dismissCreated} fade={false}>
            Ditt konto är nu aktiverat gå vidare till logga in med knappen nedan!
        </Alert>
        </ModalBody>
        <ModalFooter>
          { created 
            ? 
            <Link to="/">
              <Button color="secondary" onClick={toggle}>
                Gå till logga in
              </Button>
            </Link>
            :
            <Link to="/">
              <Button color="danger" onClick={toggle}>
                Avbryt
              </Button>
            </Link>
          }
        </ModalFooter>
      </Modal>
    </div >
  );
}

export default ActivateAccountModal;
