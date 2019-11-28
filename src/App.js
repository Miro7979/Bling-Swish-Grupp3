import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from './components/NavBar';
import LoginPage from './components/loginPage';
import MyPagePage from './components/MyPagePage';
import AdminPage from './components/Admin/AdminPage';
import EditUser from './components/Admin/EditUser';
import HistoryPage from './components/HistoryPage/HistoryPage';
import PaymentPage from './components/PaymentPage';
import './App.scss';
import CreateAccountModal from './components/createAccount'
import ForgotPasswordModal from './components/ForgotPasswordModal'
import UpdateNewPasswordModal from './components/UpdateNewPasswordModal'
import ActivateAccountModal from './components/ActivateAccountModal'
import Context from './components/Context';
import { Login } from 'the.rest/dist/to-import';
import SSE from 'easy-server-sent-events/sse';
import NotificationModal from './components/createNotificationModal';
import Loader from 'react-loader-spinner';



function App(props) {
  let context = useContext(Context);
  const [state, setState] = useState(context);


  let sse = new SSE('/api/sse');
  async function listenToSSE() {

    sse.listen('message', (data) => {
      setState((prev) => ({ ...prev, showNoti: true }))
    });
  }

  listenToSSE();



  let stateUpdater = async () => {
    let whoIsLoggedIn = await Login.findOne()
    if (whoIsLoggedIn._id) {
      setState({ ...state, user: whoIsLoggedIn })
      return;
    }
  }
  global.stateUpdater = stateUpdater


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

  const toggleNotificationModal = () => {
    setState((prev) => ({ ...prev, showNoti: false, reload: true }))
  }

  let propsToNotificationModal = { toggleNotificationModal };

  const commonRoute = () => {
    let path = window.location.pathname;
    if (path.indexOf('/aterstalllosenord') === 0) { return true; }
    if (path.indexOf('/nyttlosenord') === 0) { return true; }
    if (path.indexOf('/aktiverakonto') === 0) { return true; }

  }

  return (
    <Context.Provider value={[state, setState]}>
      {state.showNoti ?
        <NotificationModal {...propsToNotificationModal} />
        : ''}
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
                <Route path="/aterstalllosenord" component={ForgotPasswordModal} />
                <Route path="/nyttlosenord/:id" component={UpdateNewPasswordModal} />
                <Route path="/aktiverakonto/:id" component={ActivateAccountModal} />
              </Switch>
            </main>
          </div>
          {state.user.role === 'admin' && <Redirect to="/adminsida" />}
          {state.user.role === 'parent' && <Redirect to="/betalningar" />}
          {state.user.role === 'child' && <Redirect to="/betalningar" />}
          {state.user.role === 'visitor' && !commonRoute() && <Redirect to="/login" />}
        </Router>
      }
    </Context.Provider>
  );
}

export default App;

