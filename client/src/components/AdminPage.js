import React from 'react';
import { Table } from 'reactstrap';

const AdminPage = (props) => {
  return (
    <React.Fragment>
    <button>skapa ny användare</button>
    <button>redigera ny användare</button>
    <button>ta bort ny användare</button>
    <button>skicka bekräftelse email</button>
    <button>skicka nytt lösenord email</button>

    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Namn</th>
          <th>Telefonnummer</th>
          <th>Email </th>
          <th>Personnummer</th>
          <th>Roll</th>
          <th>Barn</th>
          <th>Meddleanden</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark Otto</td>
          <td>2345678</td>
          <td>@mdo</td>
          <td>453635-8769</td>
          <td>förälder</td>
          <td>ja</td>
          <td>10</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob Thornton</td>
          <td>876543</td>
          <td>@fat</td>
          <td>345261-8765</td>
          <td>barn</td>
          <td>nej</td>
          <td>20</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry the Bird</td>
          <td>234567</td>
          <td>@twitter</td>
          <td>997654-9876</td>
          <td>användare</td>
          <td>nej</td>
          <td>4</td>
        </tr>
      </tbody>
    </Table>
    </React.Fragment >
  );
}

export default AdminPage;