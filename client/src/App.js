import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.scss';
import './styles.scss';
import LogInPage from './components/logInPage';

function App() {
  return (
    <Router>
      <div className="App">
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

