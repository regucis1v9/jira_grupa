import React, { useEffect, useState } from 'react';
import '../css/Tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  fetch('http://localhost/api/api.php?fetchTasks', {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Fetched data:', data);
      setTasks(data);
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error);
    });
}, []);


const deleteTask = (taskId) => {
  // Perform delete action - fetch API call or other method to delete task by ID
  // For example, using fetch to perform a DELETE request
  fetch(`http://localhost/api/api.php?deleteTask=${taskId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Task deleted successfully:', data);
      // If successful, update the UI by removing the deleted task from the state
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
    });
};

return (
  <div className="Tasks">
    <div className="TasksCont">
      <div className="TableWrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
              
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>{task.status}</td>
                
                <td>
                  <div className="buttons-container">
                    <button className="Edit">Edit</button>
                    <button className="Delete" onClick={() => deleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default Tasks;