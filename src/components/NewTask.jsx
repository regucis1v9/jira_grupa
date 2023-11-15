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
    console.log('Task:', task);
    // Here you can perform any action with the entered values, e.g., send them to an API, etc.
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
          <button type="submit">Submit</button>
          </form>
        </div>
      </div>

  );
}

export default NewTask;
