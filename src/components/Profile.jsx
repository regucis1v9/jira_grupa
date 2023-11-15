import React from 'react';
import styles from './Profile.module.css';
import Cookies from 'js-cookie';

function Profile() {
  const token = Cookies.get('token');
  const username = Cookies.get('username');
  const email = Cookies.get('email');

  console.log("Token:", token);
  console.log("Username:", username);
  console.log("Email:", email);

  if (!token || username === "") {
    window.location.href = "/login";
  }

  return (
    <div className={styles.main}>
      <div className={styles.left}>
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
          <button className={styles.editButton}>Edit</button>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.top}></div>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
}

export default Profile;
