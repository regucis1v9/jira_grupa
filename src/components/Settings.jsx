// Profile.js
import React, { useState, useEffect } from 'react';
import styles from '../css/Profile.module.css';
import Cookies from 'js-cookie';
import SideBar from './SideBar';

function Settings() {
  const token = Cookies.get('token');
  const [username, setUsername] = useState(Cookies.get('username'));
  const [email, setEmail] = useState(Cookies.get('email'));
  const id = Cookies.get('id');

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedEmail, setEditedEmail] = useState(email);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check for token and username existence
    if (!token || !username) {
      window.location.href = "/login";
    }
  }, [token, username]);

  const handleSidebarCollapseChange = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleInputChange = () => {
    // Check if the token exists
    if (!token) {
      setErrorMessage('Token not available. Please log in.');
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
    const trimmedUsername = editedUsername.trim();

    // Check if the trimmed username is empty
    if (!trimmedUsername) {
      setErrorMessage('Username cannot be empty.');
      return;
    }
      // Check if the username contains HTML tags
    if (/<[^>]*>/g.test(trimmedUsername)) {
      setErrorMessage('Username cannot contain HTML tags');
      return;
    }
    // Update the fetch request to stringify the entire data object
    fetch('http://localhost/regnars/api/updateData.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        username: editedUsername,
        email: editedEmail,
        token: token,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        console.log('Response:', result);

        // Update state and cookies with the new values
        if(result.message === "User details updated successfully"){
          setUsername(result.username || editedUsername);
          setEmail(result.email || editedEmail);
          Cookies.set('username', result.username || editedUsername, { expires: 1 / 24 });
          Cookies.set('email', result.email || editedEmail, { expires: 1 / 24 });
          setErrorMessage('Data updated successfully');
        }else if(result.message === "Username already exists"){
          setErrorMessage( 'Username already exists');
        }else if(result.message === "Invalid email format"){
          setErrorMessage( 'Invalid email format');
        }else if (result.message === "Invalid token") {
          Cookies.set('username', "", { expires: new Date(0) });
          Cookies.set('email', "", { expires: new Date(0) });
          Cookies.set('id', "", { expires: new Date(0) });
          Cookies.set('token', "", { expires: new Date(0) });
          window.location.href = "/login";
        }
      })
      .catch(error => {
        console.error('Error updating data:', error);
        setErrorMessage('An error occurred while updating data');
      });
  };

  return (
    <>
      <SideBar onSidebarCollapseChange={handleSidebarCollapseChange} />
      <div className={styles.main}>
        <div className={`${styles.left} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
          <div className={styles.top}>
            <img className={styles.profileImage} src="https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg" alt="" />
          </div>
          <div className={styles.bottom}>
            <div className={styles.dataRow}>
              <h1 className={styles.rowTitle}>Username: </h1>
              <input
                type="text"
                className={styles.rowEdit}
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
            </div>
            <div className={styles.dataRow}>
              <h1 className={styles.rowTitle}>Email: </h1>
              <input
                type="text"
                className={styles.rowEdit}
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </div>
            <p className={styles.error}>{errorMessage}</p>
            <button className={styles.changeButton} onClick={handleInputChange}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
