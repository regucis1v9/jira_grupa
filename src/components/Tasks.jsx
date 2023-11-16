import React, { useEffect, useState, useRef } from 'react';
import '../css/Tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [sortBy, setSortBy] = useState('due_date');

  useEffect(() => {
    fetch(`http://localhost/api/api.php?fetchTasks&sort=${sortBy}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        // Check the structure of the fetched data and set it accordingly
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (typeof data === 'object') {
          // If data is an object, convert it to an array
          setTasks([data]);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [sortBy]);
  


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


const handleSaveChanges = async () => {
  try {
    if (editTask) {
      const response = await fetch(`http://localhost/api/api.php?updateTask=${editTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Fetch the updated tasks after successful update
      fetch('http://localhost/api/api.php?fetchTasks', {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data);
          // Check the structure of the fetched data and set it accordingly
          if (Array.isArray(data)) {
            setTasks(data);
          } else if (typeof data === 'object') {
            // If data is an object, convert it to an array
            setTasks([data]);
          } else {
            console.error('Invalid data format:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });

      handleCloseEdit(); // Close the edit modal after saving changes
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
};


const handleEdit = (task) => {
  setEditTask(task);
};

const handleCloseEdit = () => {
  setEditTask(null);
};

const handleSortChange = (criteria) => {
  setSortBy(criteria);
};

const handleStatusChange = () => {
  const statusOptions = ['Active', 'On Hold', 'Finished'];
  const currentStatusIndex = statusOptions.indexOf(editTask.status);
  const nextStatusIndex = (currentStatusIndex + 1) % statusOptions.length; // Cycle through the options

  const updatedEditTask = {
    ...editTask,
    status: statusOptions[nextStatusIndex]
  };
  setEditTask(updatedEditTask);
};

return (
  <div className="Tasks">
    <div className="SortOptions">
      <label>Sort By:</label>
      <select onChange={(e) => handleSortChange(e.target.value)}>
        <option value="due_date_asc">Due Date (Newest to Oldest)</option>
        <option value="due_date_desc">Due Date (Oldest to Newest)</option>
        <option value="status_finished">Sort by Finished First</option>
        <option value="status_on_hold">Sort by On Hold First</option>
        <option value="status_active">Sort by Active First</option> {/* New option */}
      </select>
    </div>
    <div className="TasksCont" style={{ display: editTask ? 'none' : 'block' }}>
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
                <td className={task.status === 'Active' ? 'Active' : task.status === 'On Hold' ? 'OnHold' : 'Finished'}>
                  {task.status}
                </td>
                <td>
                  <div className="buttons-container">
                    <button className="Edit" onClick={() => handleEdit(task)}>
                      Edit
                    </button>
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

    {/* Edit modal */}
    {editTask && (
      <div className="EditModal">
        <h2>Edit Task</h2>
        
        <label>Title:</label>
        <input
          type="text"
          value={editTask.title}
          onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
        />
        <label>Description:</label>

        <textarea
          value={editTask.description}
          onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
        ></textarea>

        <label>Due Date:</label>
        <input
          type="date"
          value={editTask.due_date}
          onChange={(e) => setEditTask({ ...editTask, due_date: e.target.value })}
        />
        <label>Status:</label>
        <button className={editTask.status === 'Active' ? 'Active' : editTask.status === 'On Hold' ? 'OnHold' : 'Finished'} onClick={handleStatusChange}>{editTask.status}</button>
        <div>
          <button className="SaveChanges" onClick={handleSaveChanges}>Save changes</button>
          <button className="Cancel" onClick={handleCloseEdit}>Cancel</button>
        </div>
      </div>
    )}
  </div>
);
}

export default Tasks;