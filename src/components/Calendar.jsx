import React, { useState, useEffect } from 'react';
import '../css/Calendar.css';
import SideBar from './SideBar';
import Cookies from 'js-cookie';

const Calendar = () => {
    const currentDate = new Date();
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const token = Cookies.get('token');
    const id = Cookies.get('id');

    console.log(id);

    //fetcher
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
            const response = await fetch(`http://localhost/regnars/api/GetAllTasks.php?id=${id}`);
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
    }, [currentYear, currentMonth]);

    const handleDayClick = (day) => {
        const dayValue = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
            const isToday = currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && i === currentDate.getDate();
            const dayValue = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
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
    //pariet uz ieprieksejo menesi
    const handlePrevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    };
    //pariet uz nakoso menesi
    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    };

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleSidebarCollapseChange = (collapsed) => {
      setIsSidebarCollapsed(collapsed);
    };

    return (
        <>
        <SideBar onSidebarCollapseChange={handleSidebarCollapseChange} />
        <div className="calendar-main">
        <div className={`calendar-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="calendar">
                <div className="cal-header">
                    <div className= "button-box">
                    <button onClick={handlePrevMonth} className = "prev-button">&lt;</button>
                    </div>
                    <div className = "this-month-box">
                    {`${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth))} ${currentYear}`}
                    </div>
                    <div className = "button-box">
                    <button onClick={handleNextMonth} className = "next-button">&gt;</button>
                    </div>
                </div>
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
                                    <div className = "task-title-style"> {task.title}</div>
                                    <div className = "task-desc-style">{task.description}</div>
                                    <div className = "task-status-style">Status: {task.status}</div>
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
