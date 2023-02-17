import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './profile/home';
import Login from './login/login';
import { isAuthenticated } from './services/auth-service';

function App() {
  return (
    <>
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />}/>
          <Route 
            path="/home"
            element={isAuthenticated() ? (
              <Home />
            ) : (
              <Login />
            )}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
