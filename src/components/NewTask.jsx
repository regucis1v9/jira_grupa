import React, { useState, useEffect } from 'react';
import '../css/NewTask.css';
import Cookies from 'js-cookie';
import SideBar from './SideBar';

function NewTask() {
  const token = Cookies.get('token');
  const username = Cookies.get('username');
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    id: Cookies.get('id'),
  });

  const [error, setError] = useState(null); // New state for error handling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost/regnars/api/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task, status: 'Active' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        console.log('Response:', data);
        setError(data.error);
        if (data.error) {

        } else {
          // Handle successful response
          console.log('Task added successfully:', data);
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!token || !username) {
    window.location.href = "/login";
  }

  const handleSidebarCollapseChange = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <>
      <SideBar onSidebarCollapseChange={handleSidebarCollapseChange} />
      <div className='NewTask'>
        <div className={`NewTaskCont ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                className="formInput"
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                className="formInput"
                type="text"
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="due_date">Due Date:</label>
              <input
                className="formInput"
                type="date"
                id="due_date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
              />
            </div>
            <p className='newTaskError'>{error}</p>
            <button className="SubmitButton" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewTask;
