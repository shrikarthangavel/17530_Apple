import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  function goToAboutPage() {
    navigate('/home');
  }
    return (
      <div className = "login-container">
        <div className = "login-box">
          <h2> Login to your JESSA Account</h2>
          <div className = "login-field">
            <label>Username :</label>
            <input type = "text" />
          </div>
          <div className = "login-field">
            <label>Password :</label>
            <input type = "password" />
          </div>
          <div className = "login-actions">
            <button className = "login-button">LOG IN</button>
            <button className = "new-user-button">NEW USER</button>
          </div>
        </div>
      <button onClick={goToAboutPage}>"Go To Home Page"</button>
    </div>
    );
}

export default LoginPage;