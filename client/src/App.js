import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from './components/NavBar';
import LoginPage from './components/loginPage';
import MyPagePage from './components/MyPagePage';
import AdminPage from './components/Admin/AdminPage';
import EditUser from './components/Admin/EditUser';
import HistoryPage from './components/HistoryPage';
import PaymentPage from './components/PaymentPage';
import './App.scss';
import CreateAccountModal from './components/createAccount';
import Context from './components/Context';
import { Login } from 'the.rest/dist/to-import';
import Loader from 'react-loader-spinner'

function App() {
  let context = useContext(Context);
  const [state, setState] = useState(context);
  console.table(state.user)
  useEffect(() => {
    async function checkUserSession() {
      let whoIsLoggedIn = await Login.findOne()
      if (whoIsLoggedIn._id) {
        setState((prev) => ({ ...prev, user: whoIsLoggedIn, booting: false }))
        return;
      }
      setState((prev) => ({ ...prev, booting: false }))
    }
    checkUserSession()
  }, []);

  return (
    <Context.Provider value={[state, setState]}>
      {state.booting && <Loader className="spinner"
        type="BallTriangle"
        color="#FFFF"
        height={150}
        width={300}
        timeout={3000} //3 secs
      />}
      {!state.booting &&
        <Router>
          <div className="App">
            <header className="App-header">
              <NavBar />
            </header>
            <main className="container mt-2">
              <Switch className="switch">
                <Route exact path="/" component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <Route exact path="/adminsida" component={AdminPage} />
                <Route path="/adminsida/redigera-anvandare" component={EditUser} />
                <Route path="/adminsida/registrera-en-ny-anvandare" component={CreateAccountModal} />
                <Route path="/betalningar" component={PaymentPage} />
                <Route path="/skapaKontoSida" component={CreateAccountModal} />
                <Route path="/minasidor" component={MyPagePage} />
                <Route path="/betalningshistorik" component={HistoryPage} />
              </Switch>
            </main>
          </div>
          {state.user.role === 'admin' && <Redirect to="/adminsida" />}
          {state.user.role === 'parent' && <Redirect to="/betalningar" />}
          {state.user.role === 'child' && <Redirect to="/betalningar" />}
          {state.user.role === 'visitor' && <Redirect to="/login" />}
        </Router>
      }
    </Context.Provider>
  );
}

export default App;

