import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/NavBar';
import './App.scss';
import './styles.scss';
import LogInPage from './components/logInPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Switch className="switch">
            <Route path="/" exact component={LogInPage} />

          </Switch>
        </main>

      </div>
    </Router>
  );
}

export default App;

