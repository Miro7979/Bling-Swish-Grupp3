import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import LoginPage from './components/loginPage';
import AdminPage from './components/Admin/AdminPage';
// import EditUser from './components/Admin/EditUser';
import HistoryPage from './components/HistoryPage';
//import MyPagePage from './components/MyPagePage';
import PaymentPage from './components/PaymentPage';
import './App.scss';

import CreateAccountModal from './components/createAccount'
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <CreateAccountModal />
          {/* On path="/" a ternary operator should be introduced to alternate
            between two stages, based on if you´re logged in or not.
            eg. component={PaymentPage} if logged in 
          */}
          <Switch className="switch">
            <Route exact path="/" component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/adminpage" component={AdminPage} />
            {/* <Route exact path="/adminpage/edituser" component={EditUser} /> */}
            <Route path="/betalningar" component={PaymentPage} />
            {/* <Route path="/minasidor" component={MyPagePage} /> */}
            <Route path="/betalningshistorik" component={HistoryPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

