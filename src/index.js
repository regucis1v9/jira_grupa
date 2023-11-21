// App.js or wherever your router setup is
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  Login,
  Register,
  PasswordReset,
  Profile,
  LandingPage,
  Settings,
  NewTask,
  Tasks,
  Calendar,
  UserSearch,
  ViewUser,
  } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<PasswordReset />} />
      <Route path="/account" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/newtask" element={<NewTask />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/userSearch" element={<UserSearch />} />
      <Route path="/viewUser/:id" element={<ViewUser />} />
    </Routes>
  </Router>
);
