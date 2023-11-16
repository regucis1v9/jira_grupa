import React, { useState } from 'react';
import '../css/NewTask.css';

function NewTask() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('http://localhost/api/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task, status: 'Active' }), // Include the 'status' field
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Change to response.text() to handle response as text
      })
      .then((data) => {
        // Handle successful response
        console.log('Task added successfully:', data);
        // You might want to update the UI or perform other actions upon successful addition
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };
  

  return (
    <div className="NewTask">
      <div className="NewTaskCont">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
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
              type="date"
              id="due_date"
              name="due_date"
              value={task.due_date}
              onChange={handleChange}
            />
          </div>
          <button className="Submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default NewTask;
