import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LoginPage from './components/loginPage';
import MyPagePage from './components/MyPagePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        
      </header>

      <MyPagePage />

    </div>
  );
}

export default App;
