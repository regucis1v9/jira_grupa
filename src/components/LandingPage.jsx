// LandingPage.js

import React, { useEffect, useRef } from 'react';
import styles from '../css/Landing.module.css'; // Import the CSS

const LandingPage = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('landingMain');
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

  useEffect(() => {
    // Hide the loading overlay and reveal the content after the window has fully loaded
    document.getElementById('loadingOverlay').style.display = 'none';
    document.body.classList.remove(styles.hidden); // Use styles.hidden instead of 'hidden'
  }, []);

  const transitionToNextPage = () => {
    // Show the loading overlay
    document.getElementById('loadingOverlay').style.display = 'flex';

    // Add a class to the body to trigger the fade-out transition
    document.body.classList.add(styles.hidden); // Use styles.hidden instead of 'hidden'

    // After a short delay, navigate to the next page
    setTimeout(() => {
      window.location.href = '/login'; // Replace 'test.html' with the actual URL of your next page
    },); // Adjust the delay time (in milliseconds) as needed
  };

  return (
    <div className={styles['landing-main']} id="landingMain">
      <div className={styles['landing-background']}></div>
      <div className={styles['glow']} ref={glowRef}></div>
      <div className={styles['landing-text-side']}>
        <div className={styles['p-landing-text']}>
          <p className={styles['landing-text']}>
            The best <b>project tracking </b>software you will ever see!
          </p>
        </div>
        <div className={styles['button-landing-button']}>
          <button className={styles['landing-button']} onClick={transitionToNextPage}>
            Get started
          </button>
        </div>
      </div>
      <div className={styles['loading-overlay']} id="loadingOverlay">
        <div className={styles['loading-text']}>Loading...</div>
      </div>
    </div>
  );
};

export default LandingPage;
