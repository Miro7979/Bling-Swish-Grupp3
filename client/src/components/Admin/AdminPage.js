import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { User } from 'the.rest/dist/to-import';
import deleteIcon from '../../images/delete-icon.png';
import editIcon from '../../images/edit-icon.png';
import showProperty from '../../images/show-property.png';

const AdminPage = (props) => {
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  //I wanna find all the users
  useEffect(() => {
    const abortController = new AbortController();

    (async () => setUsers(await User.find()))();
    return () => {
      abortController.abort();
    }
  }, []);

  const sortTable = () => {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  const showTransactions = () => {
    console.log('show transactions');

  }

  const deleteUser = async (e) => {
    //find the right user with _id
    //compare if it is the right one and if so delete from list
    let id = e.target.attributes['data-id'].value;
    let userToDelete = await User.findOne(id);

    userToDelete.delete()
    const filteredUsers = users.filter(user =>
      user._id !== id);
    setUsers(filteredUsers)
  };

  return (
    <Row>
      <Col>
        <Link to={'/adminsida/registrera-en-ny-anvandare'}>
          <Button onClick={toggle}
            className="btn create-btn"
            color="info"
            size="sm"
          >skapa en användare</Button>
        </Link>
        <Button className="btn edit-btn ml-3"
          color="info"
          size="sm"
          onClick={sortTable}>Sortera A till Ö</Button>
        {/*the table head*/}
        <Table striped id="myTable" className="mt-3 table-responsive-md">
          <thead>
            <tr>
              <th>#</th>
              <th>För-&nbsp;och&nbsp;Efternamn</th>
              <th>Telefonnummer</th>
              <th>Email</th>
              <th className="one">Personnummer</th>
              <th className="one">Utdrag</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* display all users in a table */}
            {users.map(({ _id, name, phone, email, nationalIdNumber }, index) => (
              <tr key={_id}>
                <th className="align-middle" scope="row">{index + 1}</th>
                <td className="align-middle" >{name}</td>
                <td className="align-middle">{phone}</td>
                <td className="one align-middle">{email}</td>
                <td className="one align-middle">{nationalIdNumber}</td>
                <td className="align-middle">
                  <span
                    className="show-more-btn ml-2"
                    color="info"
                    size="sm"
                    data-id={_id}
                    onClick={showTransactions}
                  >{' '}<img src={showProperty} alt="sök ikon"></img>
                  </span>
                </td>

                {/* <td className="align-middle">{transactions}</td> */}

                <td className="align-middle">
                  <span
                    className="remove-btn"
                    size="sm"
                    data-id={_id}
                    onClick={deleteUser}
                  ><img src={deleteIcon} alt="ta bort ikon"></img>

                  </span>
                </td>
                <td className="align-middle">
                  <Link className="btn edit-btn"
                    color="info"
                    size="sm" to={'/adminsida/redigera-anvandare/' + _id}>
                    <img src={editIcon} alt="ändra ikon"></img>
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