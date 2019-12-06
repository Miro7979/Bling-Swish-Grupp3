import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { User } from 'the.rest/dist/to-import';

const AdminHistoryPage = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    findUserTransactions()
    // eslint-disable-next-line
  }, [])

  async function findUserTransactions() {
    let user = await User.findOne({ _id: props.match.params.id });
    setTransactions(user.transactions);
  }

  return (
    <div className="container">
      <Row>
        <Col m={{ size: 6, offset: 3 }}>

        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Belopp</th>
            <th>Till</th>
            <th>Från</th>
            <th>Ingående balans</th>
            <th>Utgående balans</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ date, ingoingBalance, outgoingBalance, amount, to, from }, index) => (
            <tr key={index + 1}>
              <td>{date}</td>
              <td>{amount}</td>
              <td>{to ? to.name : null}</td>
              <td>{from ? from.name : null}</td>
              <td>{ingoingBalance}</td>
              <td>{outgoingBalance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/adminsida"><Button >Gå tillbaka</Button></Link>
    </div>
  );
}
export default AdminHistoryPage;

