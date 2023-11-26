import React, { useEffect, useState, useRef } from 'react';
import '../css/Tasks.css';
import Cookies from 'js-cookie';
import SideBar from './SideBar';


function Tasks() {
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    const id = Cookies.get('id');
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [sortBy, setSortBy] = useState('due_date');
    const [searchValue, setSearchValue] = useState('');
    
    // Add state variables for error and success messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {

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

    fetch(`http://localhost/regnars/api/api.php?fetchTasks&sort=${sortBy}&id=${id}`, {
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
  }, [sortBy, id]);
  


const deleteTask = (taskId) => {

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
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
    return;
  }

  // Perform delete action - fetch API call or other method to delete task by ID
  // For example, using fetch to perform a DELETE request
  fetch(`http://localhost/regnars/api/api.php?deleteTask=${taskId}`, {
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
    if (editTask) {
      const response = await fetch(`http://localhost/regnars/api/api.php?updateTask=${editTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTaskResponse = await fetch(`http://localhost/regnars/api/api.php?fetchTasks&id=${id}`, {
        method: 'GET',
      });

      if (!updatedTaskResponse.ok) {
        throw new Error('Failed to fetch updated tasks');
      }

      const updatedTasksData = await updatedTaskResponse.json();

      // Check if the update operation has indeed modified the task
      const updatedTask = updatedTasksData.find(task => task.id === editTask.id);

      if (!updatedTask) {
        throw new Error('Task not updated in the database');
      }

      setTasks(updatedTasksData);
      console.log('Task updated successfully');
      handleCloseEdit(); // Close the edit modal after saving changes
    }
  } catch (error) {
    console.error('Error updating task:', error);
    // Handle error states, set error messages, or perform necessary actions here
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
  if (editTask) {
    const statusOptions = ['Active', 'On Hold', 'Finished'];
    const currentStatusIndex = statusOptions.indexOf(editTask.status);
    const nextStatusIndex = (currentStatusIndex + 1) % statusOptions.length; // Cycle through the options

    const updatedEditTask = {
      ...editTask,
      status: statusOptions[nextStatusIndex]
    };
    setEditTask(updatedEditTask);
  }
};

const handleAccessibilityChange = () => {
  if (editTask) {
    const accessibilityOptions = ['Public', 'Private'];
    const currentAccessibilityIndex = accessibilityOptions.indexOf(editTask.accessibility);
    const nextAccessibilityIndex = (currentAccessibilityIndex + 1) % accessibilityOptions.length;

    const updatedEditTask = {
      ...editTask,
      accessibility: accessibilityOptions[nextAccessibilityIndex]
    };
    setEditTask(updatedEditTask);
  }
};


const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

if (!token || !username) {
  window.location.href = "/login";
}

const handleSidebarCollapseChange = (collapsed) => {
  setIsSidebarCollapsed(collapsed);
};
const handleSearch = async (e) => {
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
        const response = await fetch('http://localhost/regnars/api/search.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: searchValue,
                id: id,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (Array.isArray(data)) {
                setTasks(data);
              } else if (typeof data === 'object') {
                // If data is an object, convert it to an array
                setTasks([data]);
              } else {
                console.error('Invalid data format:', data);
              }
        } else {
            console.error('Error searching tasks:', response.statusText);
        }
    } catch (error) {
        console.error('Error performing search:', error);
    }

};


return (
<>
<SideBar onSidebarCollapseChange={handleSidebarCollapseChange} />
  <div className="Tasks">
  {errorMessage && <div className="error-message">{errorMessage}</div>}
  {successMessage && <div className="success-message">{successMessage}</div>}
    <form className={`searchBarContainer ${isSidebarCollapsed ? 'collapsed' : ''}`} onSubmit={handleSearch}>
        <input
          type="text"
          name=""
          id=""
          className='searchBar'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className='searchButton'> <img src="/magnifying-glass.png" alt="" /></button>
    </form>
    <div className={`SortOptions ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <label>Sort By:</label>
      <select onChange={(e) => handleSortChange(e.target.value)}>
        <option value="due_date_asc">Due Date (Newest to Oldest)</option>
        <option value="due_date_desc">Due Date (Oldest to Newest)</option>
        <option value="status_finished">Sort by Finished First</option>
        <option value="status_on_hold">Sort by On Hold First</option>
        <option value="status_active">Sort by Active First</option>
        <option value="accessibility_public">Sort by Public First</option>
        <option value="accessibility_private">Sort by Private First</option>
      </select>
    </div>
    <div className={`TasksCont ${isSidebarCollapsed ? 'collapsed' : ''}`} style={{ display: editTask ? 'none' : 'block' }}>
      <div className="TableWrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Accessibility</th>
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
                <td className={task.accessibility === 'Public' ? 'Public' : 'Private'}>
                  {task.accessibility === 'Public' ? 'Public' : 'Private'}
                </td>
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
      <div className={`EditModal ${isSidebarCollapsed ? 'collapsed' : ''}`}>
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

        <label>Accessibility:</label>
        <div className="accessibility-options">
          <button
            className={editTask.accessibility === 'Public' ? 'Public' : 'Private'}
            onClick={handleAccessibilityChange}
          >
            {editTask.accessibility === 'Public' ? 'Public' : 'Private'}
          </button>
        </div>
        
        <label>Status:</label>
        <button className={editTask.status === 'Active' ? 'Active' : editTask.status === 'On Hold' ? 'OnHold' : 'Finished'} onClick={handleStatusChange}>{editTask.status}</button>
        <div>
          <button className="SaveChanges" onClick={handleSaveChanges}>Save changes</button>
          <button className="Cancel" onClick={handleCloseEdit}>Cancel</button>
        </div>
      </div>
    )}
  </div>
  </>
);
}

export default Tasks;