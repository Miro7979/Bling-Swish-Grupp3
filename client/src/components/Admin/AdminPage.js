import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'reactstrap';

import EditUser from './EditUser';


const AdminPage = (props) => {
  const [state, setState] = useState({
    users: [],
    mail: []
  })

  useEffect(() => {
    async function getUsers() {
      let endpoint = 'http://localhost:3001/api/users';
      const response = await fetch(endpoint);


      const users = await response.json();
      console.log(users);

      setState((prev) => (
        { ...prev, users: users, loading: false }
      ))
    }
    getUsers();
  }, []);


  const handleClick = (e) => {
    console.log('open modal');
    //when clicked go to edit user
  }
  const editUser = () => {
    console.log('edit');

  }
  const deleteUser = () => {
    console.log('user deleted');

  }

  const openModal = () => {

    console.log('open a modal, hoho');

  }

  return (
    <Container>
      <React.Fragment>
        <button onClick={(e) => openModal(e)}>skapa ny användare</button>
        <button onClick={(e) => handleClick(e)}>redigera ny användare</button>

        <EditUser />
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Namn</th>
              <th>Telefonnummer</th>
              <th>Email </th>
              {/*<th>Personnummer</th>
              <th>Roll</th>
               <th>Barn</th>
            <th>Meddelanden</th> */}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.users.map(({ _id, name, phone, email, nationalIdNumber, role, children, notifications }, index) => (
              <tr key={_id}>
                <th scope="row">{index + 1}</th>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{email}</td>
                {/*<td>{nationalIdNumber}</td>
                <td>{role}</td>
                <td>{}</td>
              <td>{notifications}</td> */}
                <td>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={deleteUser}
                  >ta bort</Button>
                </td>
                <td>
                  <Button
                    className="edit-btn"
                    color="info"
                    size="sm"
                    onClick={editUser}
                  >redigera</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    </Container>
  );
}

export default AdminPage;