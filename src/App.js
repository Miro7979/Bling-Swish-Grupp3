import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from './components/NavBar';
import LoginPage from './components/loginPage';
import MyPagePage from './components/MyPagePage';
import AdminPage from './components/Admin/AdminPage';
import EditUser from './components/Admin/EditUser';
import AdminHistoryPage from './components/Admin/AdminHistoryPage';
import AdminCreateAccount from './components/Admin/AdminCreateAccount';
import HistoryPage from './components/HistoryPage/HistoryPage';
import PaymentPage from './components/PaymentPage';
import './App.scss';
import CreateAccountModal from './components/createAccount';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import UpdateNewPasswordModal from './components/UpdateNewPasswordModal';
import ActivateAccountModal from './components/ActivateAccountModal';
import Context from './components/Context';
import { Login } from 'the.rest/dist/to-import';
import SSE from 'easy-server-sent-events/sse';
import NotificationModal from './components/createNotificationModal';
import Loader from 'react-loader-spinner';

let sse;

function App() {
  let context = useContext(Context);
  const [state, setState] = useState(context);


  // listenToSSE();
  useEffect(() => {
    sse = new SSE('/api/sse');
    let messageListener = sse.listen('message', (data) => {
      setState((prev) => ({ ...prev, showNoti: true }))
    });

    return () => {
      sse.unlisten(messageListener);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.restartSSE]);


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
      sse.restart();
    }
    checkUserSession()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.reload]);

  const toggleNotificationModal = () => {
    setState((prev) => ({ ...prev, showNoti: false, reload: prev.reload+1 }))
  }

  let propsToNotificationModal = { toggleNotificationModal };


  function redirector() {
    let thisPath = window.location.pathname

    // if role is visitor
    if (state.user.role === 'visitor') {
      let allowedPaths = ['/aterstalllosenord', '/skapaKontoSida', '/aktiverakonto']
      let redirect = true;
      allowedPaths.map(path => {
        if (thisPath === path) {
          redirect = false
        }
        return null
      })

      if (redirect) {
        return <Redirect to="/login" />
      } else {
        return null
      }
    }
    // end of visitor

     // if role is admin
     if (state.user.role === 'admin') {
      let allowedPaths = ['/adminsida','/adminsida/redigera-anvandare', '/adminsida/betalningshistorik/:id', '/adminsida/registrera-en-ny-anvandare']
      let redirect = true;
      allowedPaths.map(path => {
        if (thisPath === path) {
          redirect = false
        }
        return null
      })

      if (redirect) {
        return <Redirect to="/adminsida" />
      } else {
        return null
      }
    }

    // if role is parent/child
    if (state.user.role === 'parent' || state.user.role === 'child') {
      // This path is the standard path if you ARE logged in
      let allowedPaths = ['/betalningar', '/betalningshistorik', '/minasidor']
      let redirect = true;
      allowedPaths.map(path => {
        if (thisPath === path) {
          redirect = false
        }
        return null
      })

      if (redirect) {
        return <Redirect to="/betalningar" />
      } else {
        return null
      }
    }
  }

  return (
    <Context.Provider value={[state, setState]}>
      {state.showNoti ?
        <NotificationModal {...propsToNotificationModal} />
        : ''}
      {state.booting ? <Loader className="spinner"
        type="Bars"
        color="#FFFF"
        height={150}
        timeout={3000} //3 secs
      /> :
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
                <Route path="/adminsida/betalningshistorik/:id" component={AdminHistoryPage} />
                <Route path="/adminsida/registrera-en-ny-anvandare" component={AdminCreateAccount} />
                <Route path="/betalningar" component={PaymentPage} />
                <Route path="/skapaKontoSida" component={CreateAccountModal} />
                <Route path="/minasidor" component={MyPagePage} />
                <Route path="/betalningshistorik" component={HistoryPage} />
                <Route path="/aterstalllosenord" component={ForgotPasswordModal} />
                <Route path="/nyttlosenord/:id" component={UpdateNewPasswordModal} />
                <Route path="/aktiverakonto/:id" component={ActivateAccountModal} />
              </Switch>
              {redirector()}
            </main>
          </div>
        </Router>
      }
    </Context.Provider>
  );
}

export default App;

