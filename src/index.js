import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DateTask from "./components/DateTask";
import App from "./components/App";
import Calendar from "./components/Calendar";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={ <App/>}/>
            <Route path="/Calendar" element={ <Calendar/>}/>
            <Route path="/DateTask" element={ <DateTask/>}/>
        </Routes>
    </Router>
);
