// App.js or wherever your router setup is
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  Login,
  Register,
  PasswordReset,
  Profile,
  } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<PasswordReset />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);
