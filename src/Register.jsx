import React, { useState } from 'react';
import styles from './Register.module.css'; // Importing the CSS module

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (name !== "" && email !== "" && password !== "") {
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <h1 className={styles.h1}>Get Started Now</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="nameInput">
              Name
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                id="nameInput"
              />
              {nameError && <p className={styles.error}>Name is required</p>}
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
              {emailError && <p className={styles.error}>Email is required</p>}
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
              <button type="submit" className={styles.submit}>Register</button>
            </div>
          </div>
          <div className={styles.text}>Have an account? <a href="">Log in</a></div>
        </form>
      </div>
      <div className={styles.container2}>
        <img src="https://images.pexels.com/photos/1687341/pexels-photo-1687341.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
      </div>
    </div>
  );
}

export default Register;
