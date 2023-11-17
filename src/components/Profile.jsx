// Profile.js
import React, { useState } from 'react';
import styles from '../css/Profile.module.css';
import Cookies from 'js-cookie';
import SideBar from './SideBar';

function Profile() {
  const token = Cookies.get('token');
  const username = Cookies.get('username');
  const email = Cookies.get('email');
  const id = Cookies.get('id');

  console.log("Token:", token);
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("id:", id);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!token || !username ) {
    window.location.href = "/login";
  }

  const handleSidebarCollapseChange = (collapsed) => {
    // Handle the collapsed state change in the Profile component
    setIsSidebarCollapsed(collapsed);
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
              <h1 className={styles.rowData}>{username}</h1>
            </div>
            <div className={styles.dataRow}>
              <h1 className={styles.rowTitle}>Email: </h1>
              <h1 className={styles.rowData}>{email}</h1>
            </div>
            <a href="/settings" className={styles.editButton}><div>Edit</div></a>
            <a href="/reset" className={styles.editButton}><div>Reset password</div></a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
