import React, { useState } from 'react';
import styles from '../css/Reset.module.css';

function PasswordReset() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailError("Fill out the email");
    } else {
      setEmailError(""); // Clear existing error

      // Use fetch to send the email to your PHP script
      try {
        const response = await fetch('http://localhost/regnars/api/passwordReset.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
          const responseData = await response.json();
          console.log('Response from server:', responseData);

          // Set the reset message as emailError
          setEmailError(responseData.message);
          
        } else {
          console.error('Error sending request:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };


  return (
    <>
    <div className={styles.main}>
      <h1 className={styles.header}>Time For A New Password!</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="" className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Your email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={styles.emailError}>{emailError}</p>
        </label>
        <button type="submit" className={styles.submit}>
          Send New Password
        </button>
      </form>
    </div>
    </>
  );
}

export default PasswordReset;
