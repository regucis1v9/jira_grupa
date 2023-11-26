import React, { useEffect, useState } from 'react';
import "../css/ViewUser.css";
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import SideBar from './SideBar';

function ViewUser() {
  const token = Cookies.get('token');
  const username = Cookies.get('username');
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [fetchedUser, setUsername] = useState();
  const [publicTasks, setPublicTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {

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
        const response = await fetch(`http://localhost/regnars/api/viewUser.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTasks(data);

        // Filter tasks to get only public tasks
        const publicTasksFiltered = data.filter(task => task.accessibility === 'Public');
        setPublicTasks(publicTasksFiltered);
      } catch (error) {
        console.error('Error fetching user tasks:', error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    if (id) {
      fetchUserTasks();
    }
  }, [id]);


  useEffect(() => {
    const fetchUsernames = async () => {

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
        const response = await fetch(`http://localhost/regnars/api/getUsername.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsername(data);
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };

    if (id) {
        fetchUsernames();
    }
  }, [id]);


  
  

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapseChange = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <>
      <SideBar onSidebarCollapseChange={handleSidebarCollapseChange} />
      <div className='main' >
        <div className={`TasksCont ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="TableWrapper">
          <h2>{fetchedUser} Public Tasks</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                {Array.isArray(publicTasks) ? (
                  publicTasks.map((task, index) => (
                    <tr key={task.id}>
                      <td>{(index + 1)}</td>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.due_date}</td>
                      <td className={task.status === 'Active' ? 'Active' : task.status === 'On Hold' ? 'OnHold' : 'Finished'}>
                        {task.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No public tasks found</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
