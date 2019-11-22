import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import LoginPage from './components/loginPage';
import MyPagePage from './components/MyPagePage';
import AdminPage from './components/Admin/AdminPage';
// import EditUser from './components/Admin/EditUser';
import HistoryPage from './components/HistoryPage';
import PaymentPage from './components/PaymentPage';
import './App.scss';
import CreateAccountModal from './components/createAccount';
import Context from './components/Context';
import { Login } from 'the.rest/dist/to-import';
import Loader from 'react-loader-spinner'
import SSE from 'easy-server-sent-events/sse';


console.log("starting sse");

let sse = new SSE('/api/sse');
async function listenToSSE(){

  // Create an instance
  // a connect it to the endpoint
  // '/api/sse' (default)


  sse.listen('message', (data) => {
    console.log('message', data);
  });
  
  // sse.listen('other', (data) => {
  //   console.log('other', data);
  // });

}

listenToSSE();
console.log(sse);


function App() {
  let context = useContext(Context);
  const [state, setState] = useState(context);

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
            <main>
              <Switch className="switch">
                <Route exact path="/" component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/adminpage" component={AdminPage} />
                {/* <Route exact path="/adminpage/edituser" component={EditUser} /> */}
                <Route path="/betalningar" component={PaymentPage} />
                <Route path="/skapaKontoSida" component={CreateAccountModal} />
                <Route path="/minasidor" component={MyPagePage} />
               

                <Route path="/betalningshistorik" component={HistoryPage} />
              </Switch>
            </main>
          </div>
        </Router>
      }
    </Context.Provider>
  );
}

export default App;

