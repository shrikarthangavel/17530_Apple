import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './LoginPage.css';

function LoginPage() {  // This 'data' comes from the parent component as a prop
  const [fetchedData, setFetchedData] = useState('');  // Rename state variable to avoid conflict
  const navigate = useNavigate();


  const fetchData = async () => {
    fetch('/home/management/checkout/9')  // Replace with the correct Flask endpoint
      .then(response => response.json())
      .then(result => setFetchedData({
        "projectID": 'backend response',
        "name": result.name,
        "description": result.description,
        "status": result.status,
        "last_updated": result.last_updated
    }))  // Set fetched data
      .catch(error => console.error('Error fetching data:', error));
  }

  const postUser = async () => {
    let res = await fetch('/test', {method:'Post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({'int': 1})
    })
  }

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
        <h2>{fetchedData.last_updated}</h2>
        <div className="login-field">
          <label>Username:</label>
          <input type="text"/>
        </div>
        <div className="login-field">
          <label>Password:</label>
          <input type="password" />
        </div>
        <div className="login-actions">
          <button className="login-button" onClick={fetchData}>LOG IN</button>
          <button className="new-user-button" onClick={postUser}>NEW USER</button>
        </div>
      </div>
      <button onClick={goToAboutPage}>Go To Home Page</button>
    </div>
  );
}

export default LoginPage;
