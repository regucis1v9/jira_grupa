import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../css/Sidebar.css';
import Cookies from 'js-cookie';

function SideBar({ onSidebarCollapseChange }) {
  const username = Cookies.get('username');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTasksOn, setIsTasksOn] = useState(false);
  const [isCalendarOn, setIsCalendarOn] = useState(false);
  const [isAccountOn, setIsAccountOn] = useState(false);
  const [isSettingsOn, setIsSettingsOn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.toLowerCase();

    setIsTasksOn(pathname === '/tasks');
    setIsCalendarOn(pathname === '/calendar');
    setIsAccountOn(pathname === '/account');
    setIsSettingsOn(pathname === '/settings');
  }, [location.pathname]);

  useEffect(() => {
    // Log the current state of isSidebarCollapsed
    console.log("Sidebar State:", isSidebarCollapsed);
    // Pass the state up to the parent component
    onSidebarCollapseChange(isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  const handleLogout = () => {
    // Retrieve token and id from cookies
    const id = Cookies.get('id');
  
    // Check if token and id are present
    if (id) {
      // Fetch to the logout.php file with method POST
      fetch('http://localhost/regnars/api/logout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Logout response:', data);
          // Redirect to the login page or perform other actions as needed
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error('Error during logout:', error);
        });
    } else {
      console.error('Token or ID missing for logout');
    }
  };
  const handleTasksButtonClick = () => {
    if (!isTasksOn) {
      setIsTasksOn(true);
      setIsCalendarOn(false);
      setIsAccountOn(false);
      setIsSettingsOn(false);
  
      setTimeout(() => {
        window.location.href = "/tasks";
      }, 300);
    }
  };
  
  const handleCalendarButtonClick = () => {
    if (!isCalendarOn) {
      setIsCalendarOn(true);
      setIsTasksOn(false);
      setIsAccountOn(false);
      setIsSettingsOn(false);
  
      setTimeout(() => {
        window.location.href = "/calendar";
      }, 300);
    }
  };
  
  const handleAccountButtonClick = () => {
    if (!isAccountOn) {
      setIsAccountOn(true);
      setIsTasksOn(false);
      setIsCalendarOn(false);
      setIsSettingsOn(false);
  
      setTimeout(() => {
        window.location.href = "/account";
      }, 300);
    }
  };
  
  const handleSettingsButtonClick = () => {
    if (!isSettingsOn) {
      setIsSettingsOn(true);
      setIsTasksOn(false);
      setIsCalendarOn(false);
      setIsAccountOn(false);
  
      setTimeout(() => {
        window.location.href = "/settings";
      }, 300);
    }
  };

  const TasksButtonStyle = {
    color: isTasksOn ? '#035A3B' : '#D9D9D9',
  };

  const CalendarButtonStyle = {
    color: isCalendarOn ? '#035A3B' : '#D9D9D9',
  };

  const AccountButtonStyle = {
    color: isAccountOn ? '#035A3B' : '#D9D9D9',
  };

  const SettingsButtonStyle = {
    color: isSettingsOn ? '#035A3B' : '#D9D9D9',
  };

  const SidebarStyle = {
    width: isSidebarCollapsed ? '0px' : '250px',
  };
  return (
        <div style={SidebarStyle} className={`SideBar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="TopCont">
        <button
          className={`CollapseArrow ${isSidebarCollapsed ? 'collapsed' : ''}`}
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? '>' : '<'}
        </button>
        <div className="WelcomeUserCont">
          <h4>Hello,</h4>
          <h5>{username}!</h5>
        </div>
        <div className="TasksAndCalendarCont">
          <button
            className={`TasksButton ${isTasksOn ? 'ActiveButton' : ''}`}
            style={TasksButtonStyle}
            onClick={handleTasksButtonClick}
          >
            <div className={`Circle ${isTasksOn ? 'SlideRight' : 'SlideLeft'}`}></div>
            <h6 className="CustomClassName">Tasks</h6>
          </button>
          <button
            className={`CalendarButton ${isCalendarOn ? 'ActiveButton' : ''}`}
            style={CalendarButtonStyle}
            onClick={handleCalendarButtonClick}
          >
            <div className={`Circle ${isCalendarOn ? 'SlideRight' : 'SlideLeft'}`}></div>
            <h6 className="CustomClassName">Calendar</h6>
          </button>
        </div>
      </div>
      <div className="MidCont">
        <div className="CircleWithPlusCont">
          <p className="CustomClassName">Create New Task</p>
          <Link to="/newtask" className="MidContCircle">
            <div className="CrossSign">
              <div className="VerticalLine"></div>
              <div className="HorizontalLine"></div>
            </div>
          </Link>
        </div>
      </div>
      <div className="BotCont">
        <button
          className={`AccountButton ${isAccountOn ? 'ActiveButton' : ''}`}
          style={AccountButtonStyle}
          onClick={handleAccountButtonClick}
        >
          <div className={`Circle ${isAccountOn ? 'SlideRight' : 'SlideLeft'}`}></div>
          <h6 className="CustomClassName">Account</h6>
        </button>
        <button
          className={`SettingsButton ${isSettingsOn ? 'ActiveButton' : ''}`}
          style={SettingsButtonStyle}
          onClick={handleSettingsButtonClick}
        >
          <div className={`Circle ${isSettingsOn ? 'SlideRight' : 'SlideLeft'}`}></div>
          <h6 className="CustomClassName">Settings</h6>
        </button>
        <button className="LogoutButton" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
