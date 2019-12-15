import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { Link } from "react-router-dom";

import { Disapproveparent } from 'the.rest/dist/to-import';


const DisApproveParent=(props)=>{
  useEffect(() => {
    setModal(true);
    isValidChild()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function isValidChild(){
    let approveLink = await new Disapproveparent({encoded:props.match.params.encoded})
    await approveLink.save()
    console.log(approveLink.validLink)
    setCreated(approveLink.validLink)
    setProblem(!approveLink.validLink)
  }
  const [problem, setProblem] = useState(false);
  const [created, setCreated] = useState(false);
  const dismissProblem = () => setProblem(false);
  const dismissCreated = () => setCreated(false);
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return(
   <div>
   <Modal isOpen={modal} size="md">
     <ModalBody>
       <Alert color="danger" isOpen={problem} toggle={dismissProblem} fade={false}>
         Något problem med länken!
     </Alert>
       <Alert color="success" isOpen={created} toggle={dismissCreated} fade={false}>
         Ditt konto har nekat att bli till-lagd på ett föräldrarkonto!
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
export default DisApproveParent;