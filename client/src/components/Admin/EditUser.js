import React, { useState , useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditUser = (props) => {
  const [state, setState] = useState({
    user: {}
  })

  useEffect(() => {
    async function getUser() {
      let endpoint = 'http://localhost:3001/api/users:_id';
      const response = await fetch(endpoint);


      const user = await response.json();
      console.log(user);

      setState((prev) => (
        { ...prev, user: user, loading: false }
      ))
    }
    getUser();
  }, []);

  //     notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]

  return (
    <Form>
      
      <FormGroup>
        <Label for="userName">Namn</Label>
        <Input type="name" name="name" id="userName" placeholder="kundens namn här" />
      </FormGroup>
      <FormGroup>
        <Label for="userPhone">Telefonnummer</Label>
        <Input type="phone" name="phone" id="userPhone" placeholder="kundens telefonnummer här" />
      </FormGroup>
      <FormGroup>
        <Label for="userEmail"></Label>
        <Input type="email" name="email" id="userEmail" placeholder="kundens email här" />
      </FormGroup>
      <FormGroup>
        <Label for="userIdNumber">Personnummer</Label>
        <Input type="idNumber" name="idNumber" id="userIdNumber" placeholder="kundens personnummer här" />
      </FormGroup>
      <FormGroup>
        <Label for="userPassword">Personnummer</Label>
        <Input type="password" name="password" id="userPassword" placeholder="kundens personnummer här" />
      </FormGroup>
      <FormGroup>
        <Label for="selectRole">Roll:</Label>
        <Input type="select" name="select" id="selectRole">
          <option>Välj</option>
          <option>kundkund</option>
          <option>förälderkund</option>
          <option>barnkund</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="selectKids">Har barn:</Label>
        <Input type="select" name="select" id="selectKids">
          <option>Välj</option>
          <option>inga</option>
          <option>1 barn</option>
          <option>2 barn</option>
          <option>3 barn</option>
          <option>4 barn</option>
        </Input>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          reset password email
        </Label>
      </FormGroup>
      <Button>Skicka</Button>
      <Button>Skicka</Button>
    </Form>
  );
}

export default EditUser;