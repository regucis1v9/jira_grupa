import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/Register.module.css';
import Cookies from 'js-cookie';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const glowRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('main');
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseMove = (e) => {
    const glow = glowRef.current;
    const x = e.clientX;
    const y = e.clientY;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    if (username === '') {
      setUsernameError('Username is required');
    } else {
      setUsernameError(false);
    }

    if (password === '') {
      setPasswordError('Password is required');
    } else {
      setPasswordError(false);
    }

    if (username !== '' && password !== '') {
      try {
        const response = await fetch('http://localhost/regnars/api/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          // Handle the response data as needed
          console.log(data);

          if (data.message === 'User not found') {
            setUsernameError(data.message);
          } else if (data.message === 'Invalid password') {
            setPasswordError(data.message);
          }else if (data.message === "Successfully logged in."){
            Cookies.set('token', data.token, { expires: 1 / 24 });
            Cookies.set('username', data.username, { expires: 1 / 24 });
            Cookies.set('email', data.email, { expires: 1 / 24 });
            Cookies.set('id', data.id, { expires: 1 / 24 });
            window.location.href = "/account";
          }
        } else {
          // Handle error responses
          console.error('Server response was not ok.');
        }
      } catch (error) {
        // Handle fetch error
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  };

  return (
    <div className={styles.main} id="main">
      <div className={styles.mainBackground}></div>
      <div className={styles.glow} ref={glowRef}></div>
      <div className={styles.container} id="inputContainer">
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <h1 className={styles.title}>Welcome back!</h1>
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
              {usernameError && <p className={styles.error}>{usernameError}</p>}
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
              <button type="submit" className={styles.submit}>
                Log in
              </button>
            </div>
          </div>
          <div className={styles.text}>

            <div className={styles.white}>
              Don't have an account? <a href="/register" className={styles.aTag}>Sign up here</a>              
            </div>
            <div className={styles.white}>
              Forgot your password? <a href="/reset" className={styles.aTag}>Get a new one here</a>              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
