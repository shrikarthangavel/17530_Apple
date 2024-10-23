import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './LoginPage.css';

function LoginPage() {  // This 'data' comes from the parent component as a prop
  const [fetchedData, setFetchedData] = useState('');  // Rename state variable to avoid conflict
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/home/management/checkout/124')  // Replace with the correct Flask endpoint
      .then(response => response.json())
      .then(result => setFetchedData({
        "projectID": result.projectID,
        "name": result.name,
        "description": result.description,
        "status": result.status,
        "last_updated": result.last_updated
    }))  // Set fetched data
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  function goToAboutPage() {
    navigate('/home');
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{fetchedData.projectID}</h2>
        <div className="login-field">
          <label>Username:</label>
          <input type="text" />
        </div>
        <div className="login-field">
          <label>Password:</label>
          <input type="password" />
        </div>
        <div className="login-actions">
          <button className="login-button">LOG IN</button>
          <button className="new-user-button">NEW USER</button>
        </div>
      </div>
      <button onClick={goToAboutPage}>Go To Home Page</button>
    </div>
  );
}

export default LoginPage;
