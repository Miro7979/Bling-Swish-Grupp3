import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { User } from 'the.rest/dist/to-import';
// import CreateAccountModal from '../createAccountModal';
import EditUser from './EditUser';


const AdminPage = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => setUsers(await User.find()))();
  }, []);


  const createUser = (e) => {
    return(
      <div></div>
    )
    //when clicked go to edit user
  }
  const editUser = () => {
    console.log('edit');
  }

  const deleteUser = () => {
    console.log('user deleted');
  }


  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);
{/* <CreateAccountModal /> */}

  return (
    <Row>
      <Col>
        <Link to="/adminsida/skapa-anvandare" className="btn btn-info" onClick={createUser}>skapa ny användare</Link>

        <Table striped className="mt-3">
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
            {users.map(({ _id, name, phone, email, nationalIdNumber, role, children, notifications }, index) => (
              <tr key={_id}>
                <th scope="row">{index + 1}</th>
                <td className="align-middle">{name}</td>
                <td className="align-middle">{phone}</td>
                <td className="align-middle">{email}</td>
                {/*<td>{nationalIdNumber}</td>
                <td>{role}</td>
                <td>{}</td>
              <td>{notifications}</td> */}
                <td className="align-middle">
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={deleteUser}
                  >ta&nbsp;bort</Button>
                </td>
                <td className="align-middle">
                  <Link to={'/adminsida/redigera-anvandare/' + _id}>
                    <Button
                      className="edit-btn"
                      color="info"
                      size="sm"
                      onClick={editUser}
                    >redigera</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default AdminPage;