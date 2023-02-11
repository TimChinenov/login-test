import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <input
          type="text"
          placeholder='Username'
          onBlur={(event) => setUsername(event.target.value)}>
        </input>

        <input
          type="password"
          placeholder='Password'
          onBlur={(event) => setPassword(event.target.value)}>
        </input>

        <div>
          <button onClick={() => createAccount(username, password)} >Login</button>
          <button onClick={() => login(username, password)}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

function createAccount(username: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password})
  }

  fetch('http://localhost:8080/users', requestOptions)
    .then(response => response.json())
}

function login(username: string, password: string) {

}

export default App;
