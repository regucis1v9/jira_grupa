import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css';

const Calendar = () => {
    const currentDate = new Date();
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    //fetcher
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost/pupsiks/back-end/GetAllTasks.php');
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

    return (
        <div className="calendar-container">
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
    );
};

export default Calendar;
