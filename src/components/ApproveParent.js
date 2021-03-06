import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Approveparent } from 'the.rest/dist/to-import';



const ApproveParent = (props) => {
  useEffect(() => {

    setModal(true);
    isValidChild()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function isValidChild() {
    let approveLink = await new Approveparent({ encoded: props.match.params.encoded })
    await approveLink.save()
    setCreated(approveLink.validLink)
    setProblem(!approveLink.validLink)
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
            Något problem med länken!
     </Alert>
          <Alert color="success" isOpen={created} toggle={dismissCreated} fade={false}>
            Ditt konto är nu kopplat till ett föräldrarkonto, gå vidare till logga in med knappen nedan!
     </Alert>
        </ModalBody>
        <ModalFooter>
          <Link to="/">
            <Button color="secondary" onClick={toggle}>
              Ok
           </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div >
  );

}
export default ApproveParent;