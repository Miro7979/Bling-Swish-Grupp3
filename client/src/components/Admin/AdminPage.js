import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import CreateAccountModal  from '../createAccount';
import { User } from 'the.rest/dist/to-import';

const AdminPage = (props) => {
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  //I WANNA FIND ALL THE USERS
  useEffect(() => {
    (async () => setUsers(await User.find()))();
  }, []);

  const deleteUser = () => {
    console.log('user deleted');
  }

  return (
    <Row>
      <Col>
        <Link to={'/adminsida/registrera-en-ny-anvandare'}>
          <Button onClick={toggle}
            className="btn edit-btn"
            color="info"
            size="sm"
          >skapa en användare</Button>
        </Link>
        <Table striped className="mt-3 table-responsive-md" style={{ color: "#FBF4FB" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Namn</th>
              <th>Telefonnummer</th>
              <th>Email </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* I DISPLAY ALL THE USERS IN A TABLE */}
            {users.map(({ _id, name, phone, email}, index) => (
              <tr key={_id}>
                <th scope="row">{index + 1}</th>
                <td className="align-middle">{name}</td>
                <td className="align-middle">{phone}</td>
                <td className="align-middle">{email}</td>
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
                      className="btn edit-btn"
                      color="info"
                      size="sm"
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