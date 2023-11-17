// LandingPage.js

import React, { useEffect } from 'react';
import styles from '../css/Landing.module.css'; // Import the CSS 

const LandingPage = () => {
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
    }, 1000); // Adjust the delay time (in milliseconds) as needed
  };

  return (
    <div className={styles['landing-main']} id="landingMain">
      <div className={styles['landing-text-side']}>
        <div className={styles['landing-info']}>
          <div className={styles['h1-landing-pupsiks']}>
            <h1 className={styles['landing-pupsiks']}>Pupsiks</h1>
          </div>
          <div className={styles['p-landing-text']}>
            <p className={styles['landing-text']}>
              The coolest project tracking software you will ever see!
            </p>
          </div>
          <div className={styles['button-landing-button']}>
            <button className={styles['landing-button']} onClick={transitionToNextPage}>
              Get started
            </button>
          </div>
        </div>
      </div>
      <div className={styles['landing-image']}>
        <img src="https://images.pexels.com/photos/1687341/pexels-photo-1687341.jpeg?auto=compress&cs=tinysrgb&w=1600" className={styles['fern-image']} alt="Fern" />
      </div>

      <div className={styles['loading-overlay']} id="loadingOverlay">
        <div className={styles['loading-text']}>Loading...</div>
      </div>
    </div>
  );
};

export default LandingPage;
