import React, { useState } from 'react';
import styles from '../css/Register.module.css'; // Importing the CSS module

function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (/<[^>]*>/g.test(password)) {
      setPasswordError('Password cannot contain HTML tags');
    } else {
      setPasswordError(false);
    }
        if (/<[^>]*>/g.test(username)) {
      setUsernameError('Username cannot contain HTML tags');
    } else {
      setUsernameError(false);
    }
    if (/<[^>]*>/g.test(email)) {
      setEmailError('Email cannot contain HTML tags');
      setUsername(username);
    } else {
      setEmailError(false);
    }
    if (username === "") {
      setUsernameError("Username is required");
    } else {
      setUsername('');
    }

    if (email === "") {
      setEmailError("Email is required");
      setUsername(username);
    } else {
      setEmailError('');
    }
    if (password === "") {
      setPasswordError('Password is required');
      setUsername(username);
    } else {
      setPasswordError('');;
    }
    if (username !== "" && email !== "" && password !== "") {
      console.log('username:', username);
      console.log('Email:', email);
      console.log('Password:', password);

      fetch('http://localhost/regnars/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          const responseData = data;
          console.log(responseData);

          if (responseData['message'] === 'Registration successful') {
            setRegistrationSuccess(true);
            setUsername('');
            setEmail('');
            setPassword('');           
          } else if (responseData['message'] === 'Username already exists') {
            setUsernameError('Username is already taken');
            setUsername(username);
            setEmailError(false);
            setPasswordError(false);
          } else if (responseData['message'] === 'Email already exists') {
            setEmailError('Email is already taken');
            setUsername(username);
            setUsernameError(false);
            setPasswordError(false);
          }else if(responseData['message'] === 'Invalid email address'){
            setEmailError('Invalid email address');
            setUsername(username);
            setUsernameError(false);
            setPasswordError(false);
          }else if (data.message === "Successfully logged in."){
            window.location.href = "http://localhost:3000/login";
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }

  };
  const closeAlert = () =>{
    setRegistrationSuccess(false);
  };
  return (
    <div className={styles.main}>
      <div className={`${styles['loading-overlay']} ${registrationSuccess ? styles.flex : ''}`}>
        <div className={styles.alert}>You've registered Successfully</div>
        <button className={styles.alertButton} onClick={closeAlert}>Close message</button>
      </div>
      <div className={styles.mainBackground}></div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <h1 className={styles.title}>Get Started Now</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="nameInput">
              Username
              <input
                type="text" 
                className={styles.input}
                placeholder="Enter your username"
                value={username}
                onChange={handleNameChange}
                id="nameInput"
              />
              {usernameError && <p className={styles.error}>{usernameError}</p>}
            </label>
            <label htmlFor="emailInput">
              Email address
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                id="emailInput"
              />
              {emailError && <p className={styles.error}>{emailError}</p>}
            </label>
            <label htmlFor="passwordInput">
              Password
              <input
                type="password"
                className={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                id="passwordInput"
              />
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            </label>
            <div className={styles.lol}>
              <button type="submit" className={styles.submit}>Register</button>
            </div>
          </div>
          <div className={styles.white}>Have an account? <a href="/login" className={styles.aTag}>Log in</a></div>
        </form>
      </div>
      <div className={styles.container2}>
        <img src="https://images.pexels.com/photos/1687341/pexels-photo-1687341.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
      </div>
    </div>
  );
}

export default Register;
