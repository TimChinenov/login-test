import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './profile/home';
import Login from './login/login';
import { isAuthenticated } from './services/auth-service';
import CreateAccount from './create-account/create-account';

function App() {

  const verifyAuthentication = (authDestination: any, unauthDestination: any): any =>
    isAuthenticated() ? (authDestination) : (unauthDestination) 

  return (
    <>
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/home"
            element={verifyAuthentication(<Home />, <Login />)}
          />
          <Route index path="/login" element={verifyAuthentication(<Home />, <Login/>)}/>
          <Route 
            path="/"
            element={verifyAuthentication(<Home />, <CreateAccount />)}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
