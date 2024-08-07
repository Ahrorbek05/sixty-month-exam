import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      if (location.pathname !== '/register') {
        navigate('/login');
      }
    }
  }, [token, location.pathname, navigate]);

  function TaskSuccess() {
    navigate('/login');
  }

  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register onRegisterSuccess={TaskSuccess} />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        {isAuth && (
          <>
            <Route path='/' element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
