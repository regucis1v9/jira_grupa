import React, { useState } from 'react';
import styles from './Register.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (username === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (username !== "" && password !== "") {
      console.log('Username:', username);
      console.log('Password:', password);
      // Further actions with the email and password values here
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container} id="inputContainer">
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <h1>Welcome back!</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="usernameInput">
              Username
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                id="usernameInput"
              />
              {usernameError && <p className={styles.error}>Username is required</p>}
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
              {passwordError && <p className={styles.error}>Password is required</p>}
            </label>
            <div className={styles.lol}>
              <button type="submit" className={styles.submit}>
                Log in
              </button>
            </div>
          </div>
          <div className={styles.text}>
            Don't have an account? <a href="">Sign up here</a>
          </div>
        </form>
      </div>
      <div className={styles.container2} id="imgContainer">
        <img src="https://images.pexels.com/photos/1687341/pexels-photo-1687341.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
      </div>
    </div>
  );
}

export default Login;
