import React, { useState, useEffect } from 'react';
import '../css/NewTask.css';
import Cookies from 'js-cookie';
import SideBar from './SideBar';

function NewTask() {
  const id = Cookies.get('id');
  const token = Cookies.get('token');
  const username = Cookies.get('username');
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    id:id,
    accessibility: 'Public',
  });

  const [error, setError] = useState(null); // New state for error handling

  const handleAccessibilityChange = () => {
    const accessibilityOptions = ['Public', 'Private'];
    const currentAccessibilityIndex = accessibilityOptions.indexOf(task.accessibility);
    const nextAccessibilityIndex = (currentAccessibilityIndex + 1) % accessibilityOptions.length;

    const updatedTask = {
      ...task,
      accessibility: accessibilityOptions[nextAccessibilityIndex],
    };
    setTask(updatedTask);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        body: JSON.stringify({ ...task, status: 'Active' }),
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

    fetch('http://localhost/regnars/api/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        status: 'Active',
        accessibility: task.accessibility || 'Public',
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Response from API:', data);
        setError(data.error);
        if (data.error) {
          // Handle error case
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
            <div>
              <label>Accessibility:</label>
              <div className='accessibility-options'>
                <button
                  className={task.accessibility === 'Public' ? 'Public' : 'Private'}
                  onClick={handleAccessibilityChange}
                  type='button' // Set type to 'button' to prevent form submission
                >
                  {task.accessibility === 'Public' ? 'Public' : 'Private'}
                </button>
              </div>
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
