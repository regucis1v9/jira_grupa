import React, { useState, useEffect } from 'react';
import '../css/Calendar.css';
import SideBar from './SideBar';
import Cookies from 'js-cookie';

const Calendar = () => {

    const token = Cookies.get('token');
    const username = Cookies.get('username');
    const email = Cookies.get('email');
    const id = Cookies.get('id');

    const daysInMonth = 30;
    const startDay = 3;
    const month = 'November';

    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    // Fetch tasks from the PHP script
    const fetchTasks = async () => {

        if (!token) {
            Cookies.set('username', "", { expires: new Date(0) });
            Cookies.set('email', "", { expires: new Date(0) });
            Cookies.set('id', "", { expires: new Date(0) });
            Cookies.set('token', "", { expires: new Date(0) });
            
            const id = Cookies.get('id');
        
          // Check if token and id are present
      
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
            return;
          }
        try {
            const response = await fetch('http://localhost/regnars/api/GetAllTasks.php');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDayClick = (day) => {
        const dayValue = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const tasksForDay = tasks.filter((task) => task.due_date === dayValue);

        setSelectedDate({
            date: dayValue,
            tasks: tasksForDay,
        });
    };

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="day-name" />);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === new Date().getDate();
            const dayValue = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const tasksForDay = tasks.filter((task) => task.due_date === dayValue);

            days.push(
                <div
                    key={`day-${i}`}
                    className={`day${isToday ? ' today' : ''}`}
                    onClick={() => handleDayClick(i)}
                >
                    <div className="date-number">{i}</div>
                    {isToday && <div className="today-text"></div>}
                    {tasksForDay.length > 0 && (
                        <div className="tasks">
                            {tasksForDay.map((task, index) => (
                                <div key={index} className="task" style={{ color: 'red' }}>
                                    {task.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    if (!token || !username ) {
      window.location.href = "/login";
    }
  
    const handleSidebarCollapseChange = (collapsed) => {
      // Handle the collapsed state change in the Profile component
      setIsSidebarCollapsed(collapsed);
    };

    return (
        <>
        <SideBar onSidebarCollapseChange={handleSidebarCollapseChange} />
    <div className="calendar-main">
        <div className= {`calendar-container ${isSidebarCollapsed ? 'collapsed-calendar-container' : ''}`}>
            <div className="calendar">
                <div className="cal-header">{`${month} 2023`}</div>
                <div className="week">
                    <div className="day-name">Sun</div>
                    <div className="day-name">Mon</div>
                    <div className="day-name">Tue</div>
                    <div className="day-name">Wed</div>
                    <div className="day-name">Thu</div>
                    <div className="day-name">Fri</div>
                    <div className="day-name">Sat</div>
                </div>
                <div className="week">{renderDays()}</div>
            </div>

            <div className="sidebar">
                {selectedDate ? (
                    <>
                        <h2>{selectedDate.date}</h2>
                        {selectedDate.tasks.length > 0 ? (
                            selectedDate.tasks.map((task, index) => (
                                <div key={index} className="sidebar-task">
                                    <div>{task.title}</div>
                                    <div>{task.description}</div>
                                    <div>Status: {task.status}</div>
                                </div>
                            ))
                        ) : (
                            <div>No tasks.</div>
                        )}
                    </>
                ) : (
                    <div>Select a date to view tasks.</div>
                )}
            </div>
        </div>
    </div>
    </>
    );
};

export default Calendar;
