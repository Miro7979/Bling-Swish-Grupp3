import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import {EditUser} from './EditUser';


const AdminPage = (props) => {
  const [state, setState] = useState({
    users:{},
    mail: []
  })

  useEffect(() => {
    async function getUsers() {
      let endpoint = 'http://mongodb://localhost/bling';
      const response = await fetch(endpoint);
      console.log(response);
      
      const myJson = await response.json();
      // 1. get the data with a fetch or whateva
      //(this line could take 20 seconds)
      let result = await fetch(myJson)
      // 2. set the data to your state variable (whichever you choose)
      setState((prev) => (
        { ...prev, users: result, loading: false }
      ))
    }
    getUsers();
  }, []);


function handleClick(e){
  console.log('open modal');
  //when clicked open edit modal
}

function deleteUser(){
  console.log('user deleted');
  
}

const openModal = () => {
  return (
  <div> hi!</div>)
}
  
  return (
    <React.Fragment>
      <button onClick={(e) => openModal(e)}>skapa ny användare</button>
      <button onClick={(e) => handleClick(e)}>redigera ny användare</button>
      {/* <button onClick={(e) => deleteUser(e)}>ta bort ny användare</button>  */}
      
      
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
            <th>Meddelanden</th>
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
            <td style={{"cursor": "pointer"}} onClick={(e) => deleteUser(e)}>(-)</td>
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
            <td style={{"cursor": "pointer"}} onClick={(e) => deleteUser(e)}>(-)</td>
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
            <td style={{"cursor": "pointer"}} onClick={(e) => deleteUser(e)}>(-)</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment >
  );
}

export default AdminPage;