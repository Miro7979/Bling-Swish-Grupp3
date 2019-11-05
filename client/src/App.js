import React from 'react';
import './App.scss';
import './styles.scss';
import LoginPage from './components/loginPage';
import PaymentPage from './components/PaymentPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PaymentPage></PaymentPage>
      </header>
    </div>
  );
}

export default App;
