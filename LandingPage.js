// LandingPage.js

import React, { useEffect } from 'react';
import './landing.css';

const LandingPage = () => {
    useEffect(() => {
        // Hide the loading overlay and reveal the content after the window has fully loaded
        document.getElementById('loadingOverlay').style.display = 'none';
        document.body.classList.remove('hidden');
    }, []);

    const transitionToNextPage = () => {
        // Show the loading overlay
        document.getElementById('loadingOverlay').style.display = 'flex';

        // Add a class to the body to trigger the fade-out transition
        document.body.classList.add('hidden');

        // After a short delay, navigate to the next page
        setTimeout(() => {
            window.location.href = 'test.html'; // Replace 'test.html' with the actual URL of your next page
        }, 1000); // Adjust the delay time (in milliseconds) as needed
    };

    return (
        <div className="landing-main" id="landingMain">
            <div className="landing-text-side">
                <div className="landing-info">
                    <div className="h1-landing-pupsiks">
                        <h1 className="landing-pupsiks">Pupsiks</h1>
                    </div>
                    <div className="p-landing-text">
                        <p className="landing-text">The coolest project tracking software you will ever see!</p>
                    </div>
                    <div className="button-landing-button">
                        <button className="landing-button" onClick={transitionToNextPage}>Get started</button>
                    </div>
                </div>
            </div>
            <div className="landing-image">
                <img src="paparde.jpeg" className="fern-image" alt="Fern" />
            </div>

            <div className="loading-overlay" id="loadingOverlay">
                <div className="loading-text">Loading...</div>
            </div>
        </div>
    );
};

export default LandingPage;
