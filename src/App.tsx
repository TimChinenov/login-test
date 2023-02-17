import React, { useEffect, useState } from 'react'
import './App.css';
import Cookies from 'js-cookie'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home/home';
import AuthenticateBeforeRender, { getCurrentUser, isAuthenticated, setAccessToken } from './services/AuthenticateBeforeRender';
import User from './dtos/user';

function App() {
  const [usernameField, setUsernameField] = useState<string>('')
  const [passwordField, setPasswordField] = useState<string>('')

  const [user, setUser] = useState<User>()

  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* <Routes>
        <Route path="/"></Route>
        <Route 
          path="/home"
          element={isAuthenticated() ? (
            <Home />
          ) : (
            <AuthenticateBeforeRender render={() => <Home />} />
          )}
        />
      </Routes> */}
      <div className='grid grid-cols-1 place-items-center'> 
        <div className='w-1/4'>
          <div className='pt-24 grid grid-rows-3'>
            <h1>{user?.username}</h1>

            <h1 className='flex justify-center'>Sign In or Sign Up!</h1>

            <input
              className='my-2 border-2'
              type="text"
              placeholder='Username'
              onBlur={(event) => setUsernameField(event.target.value)}>
            </input>

            <input
              className='my-2 border-2'
              type="password"
              placeholder='Password'
              onBlur={(event) => setPasswordField(event.target.value)}>
            </input>
          </div>

          <div className='grid grid-cols-1'>
            <button className="my-2 border-2 border-black" onClick={
              () => login(usernameField, passwordField).then(() => getCurrentUser(setUser))} >
                Login
            </button>
            <button className="my-2 border-2 border-black" onClick={() => createAccount(usernameField, passwordField)}>Create Account</button>
          </div>
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

  fetch('http://localhost:8080/api/users/', requestOptions)
    .then(response => response.json())
}

function login(username: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password})
  }

  return fetch('http://localhost:8080/api/login', requestOptions)
    .then(response => response.json())
    .then((data) => {
      setAccessToken(data.token)
    })
}


export default App;
