import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { User } from 'the.rest/dist/to-import';

const AdminPage = (props) => {
  const [users, setUsers] = useState([]);
  //I WANNA FIND ALL THE USERS
  useEffect(() => {
    (async () => setUsers(await User.find()))();
  }, []);

  const editUser = () => {
  }

  const deleteUser = () => {
    console.log('user deleted');
  }


  return (
    <Row>
      <Col>
        <Table striped className="mt-3 table-responsive-md">
          <thead>
            <tr>
              <th>#</th>
              <th>Namn</th>
              <th>Telefonnummer</th>
              <th>Email </th>
              <th>Personnummer</th>
              <th>Roll</th>
              <th>Barn</th>
              <th>Meddelanden</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* I DISPLAY ALL THE USERS IN A TABLE */}
            {users.map(({ _id, name, phone, email, nationalIdNumber, role, children, notifications }, index) => (
              <tr key={_id}>
                <th scope="row">{index + 1}</th>
                <td className="align-middle">{name}</td>
                <td className="align-middle">{phone}</td>
                <td className="align-middle">{email}</td>
                <td className="align-middle">{nationalIdNumber}</td>
                <td className="align-middle">{role}</td>
                <td className="align-middle">{children}</td>
                <td className="align-middle">{notifications}</td>
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