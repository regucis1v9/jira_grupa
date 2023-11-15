import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import{SideBar, Tasks, NewTask, Account, Calendar, Settings} from "./components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <div>
      <SideBar/>
      <Routes>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/newTask" element={<NewTask/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </div>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
