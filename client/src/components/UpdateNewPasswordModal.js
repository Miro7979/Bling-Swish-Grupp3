import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Container, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import {Reset, Updatepassword} from '../../../node_modules/the.rest/dist/to-import';

const UpdateNewPasswordModal = (props) => {
  useEffect(() => {
      findReset()
    setModal(true)
  },[])
  async function findReset(){
			let foundReset = await Reset.findOne({_id: props.match.params.id})
			console.log(foundReset)
				if(foundReset && findReset.date && (Date.now() - Date.parse(foundReset.date)) > 86400000){
					console.log("hej?")
					setProblem(true)
					return;
				}
				else if(!foundReset){
					setProblem(true)
				}
				else
				return;
  }
  async function gatherUserInfo(){
      console.log(props.match.params)
			let foundReset = await Reset.findOne({_id: props.match.params.id})
			console.log(foundReset)
    if(!password){
      setProblem(true)
      return
    }
    else if( foundReset && (Date.now() - Date.parse(foundReset.date)) < 86400000){
			let info = {...props.match.params, password, userId: foundReset.userId}
			let update = await new Updatepassword(info)
			console.log(await update.save())
      return;
    }

    setCreated(true)
}
  const [created, setCreated] = useState(false);
  const [problem, setProblem] = useState(false);

  const [password, setPassword] = useState("")

  const handlePasswordChange = e => setPassword(e.target.value);
  const dismissCreated = () => setCreated(false);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <React.Fragment>
        <Modal isOpen={modal} size="md">
        <Link to="/"> <ModalHeader toggle={toggle} >Återställ lösenord</ModalHeader> </Link>
            <ModalBody>
            <Alert color="danger" isOpen={problem} fade={false}>
                Problem med din återställningslänk har det gått längre än ett dygn så kan du skicka en ny.
            </Alert>
            <Alert color="success" isOpen={created} toggle={dismissCreated} fade={false}>
            Om du har en användare så har du fått ett mejl
            </Alert>
            {  problem ? "" :
                <InputGroup>
                <Container>
                <Input placeholder="Lösenord" type="password" value={password} onChange={handlePasswordChange} className="mt-3" />
                </Container>
            </InputGroup>
            }
            </ModalBody>
            {  problem ? "" :
            <ModalFooter>
                <Button color="primary" onClick={gatherUserInfo}>
                Skicka återställningslänk
                </Button>
            <Link to="/">
                <Button color="secondary" onClick={toggle}>
                Avbryt
                </Button>
            </Link>
            </ModalFooter>
            }
        </Modal>
    </React.Fragment>
  );
}

export default UpdateNewPasswordModal;
