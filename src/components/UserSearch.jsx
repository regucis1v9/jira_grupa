import React, { useEffect, useState } from 'react';
import styles from '../css/UserSearch.module.css';
import Cookies from 'js-cookie';
import SideBar from './SideBar';

function UserSearch() {
  const token = Cookies.get('token');
  const username = Cookies.get('username');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  if (!token || !username) {
    Cookies.set('username', "", { expires: new Date(0) });
    Cookies.set('email', "", { expires: new Date(0) });
    Cookies.set('id', "", { expires: new Date(0) });
    Cookies.set('token', "", { expires: new Date(0) });
    window.location.href = "/login";
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const logSearch = async (e) => {
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
      const response = await fetch('http://localhost/regnars/api/searchUsers.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }else{
        const data = await response.json();
        console.log(data)
        setSearchResults(data);
        
      }

    } catch (error) {
      console.error('Error during search:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapseChange = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };
  return (
    <>
      <SideBar onSidebarCollapseChange={handleSidebarCollapseChange} />
      <div className={`
        ${styles.main}
        ${styles.searchBarContainer}
        ${isSidebarCollapsed ? styles.collapsed : ''}
      `}>
        <form className={`searchBarContainer ${isSidebarCollapsed ? styles.collapsed : ''}`} onSubmit={logSearch}>
          <input
            type="text"
            name=""
            id=""
            placeholder='Search for users'
            className='searchBar'
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit" className='searchButton'>
            <img src="/magnifying-glass.png" alt="" />
          </button>
        </form>
        <div className={`${styles.resultContainer} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
          {Array.isArray(searchResults) ? (
            searchResults.map((result, index) => (
              <a className={styles.resultRow} key={index} href={`http://localhost:3000/viewUser/${result.id}`}>
                <p className={styles.resultID}>{(index + 1) + "."}</p>
                <p className={styles.resultUser}>{result.username}</p>
              </a>
            ))
          ) : (
            <p className={styles.errorMsg}>No users found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserSearch;
