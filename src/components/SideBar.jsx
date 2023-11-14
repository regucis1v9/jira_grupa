import React, { useState } from 'react';
import '../css/SideBar.css';

function SideBar() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTasksOn, setIsTasksOn] = useState(true);
  const [isCalendarOn, setIsCalendarOn] = useState(false);
  const [isAccountOn, setIsAccountOn] = useState(false);
  const [isSettingsOn, setIsSettingsOn] = useState(false);

  const handleTasksButtonClick = () => {
    if (!isTasksOn) {
      setIsTasksOn(true);
      setIsCalendarOn(false);
      setIsAccountOn(false);
      setIsSettingsOn(false);
    }
  };

  const handleCalendarButtonClick = () => {
    if (!isCalendarOn) {
      setIsCalendarOn(true);
      setIsTasksOn(false);
      setIsAccountOn(false);
      setIsSettingsOn(false);
    }
  };

  const handleAccountButtonClick = () => {
    if (!isAccountOn) {
      setIsAccountOn(true);
      setIsTasksOn(false);
      setIsCalendarOn(false);
      setIsSettingsOn(false);
    }
  };

  const handleSettingsButtonClick = () => {
    if (!isSettingsOn) {
      setIsSettingsOn(true);
      setIsTasksOn(false);
      setIsCalendarOn(false);
      setIsAccountOn(false);
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
          <h5>Andrejs!</h5>
        </div>
        <div className="TasksAndCalendarCont">
          <button
            className={`TasksButton ${isTasksOn ? 'ActiveButton' : ''}`}
            style={TasksButtonStyle}
            onClick={handleTasksButtonClick}
          >
            <div className={`Circle ${isTasksOn ? 'SlideRight' : 'SlideLeft'}`}></div>
            <h6>Tasks</h6>
          </button>
          <button
            className={`CalendarButton ${isCalendarOn ? 'ActiveButton' : ''}`}
            style={CalendarButtonStyle}
            onClick={handleCalendarButtonClick}
          >
            <div className={`Circle ${isCalendarOn ? 'SlideRight' : 'SlideLeft'}`}></div>
            <h6>Calendar</h6>
          </button>
        </div>
      </div>
      <div className="MidCont">
        <div className="CircleWithPlusCont">
          <p>Create New Task</p>
          <button className="MidContCircle">
            <div className="CrossSign">
              <div className="VerticalLine"></div>
              <div className="HorizontalLine"></div>
            </div>
          </button>
        </div>
      </div>
      <div className="BotCont">
        <button
          className={`AccountButton ${isAccountOn ? 'ActiveButton' : ''}`}
          style={AccountButtonStyle}
          onClick={handleAccountButtonClick}
        >
          <div className={`Circle ${isAccountOn ? 'SlideRight' : 'SlideLeft'}`}></div>
          <h6>Account</h6>
        </button>
        <button
          className={`SettingsButton ${isSettingsOn ? 'ActiveButton' : ''}`}
          style={SettingsButtonStyle}
          onClick={handleSettingsButtonClick}
        >
          <div className={`Circle ${isSettingsOn ? 'SlideRight' : 'SlideLeft'}`}></div>
          <h6>Settings</h6>
        </button>
        <button className="LogoutButton">Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
