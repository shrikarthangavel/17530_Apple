import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './LoginPage.css';

function LoginPage() {  // This 'data' comes from the parent component as a prop
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleCreateUser = async () => {
    if (username == '' || password == '') {
      setMessage("Invalid field")
      setPassword('')
      return
    }
    fetch('/createUser', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    }).then(response => response.json())
    .then(result => {
        if (result == 0) {
          setMessage('User created')
        } else {
          setMessage('User already exists')
        }
    })
    setPassword('')
  }

  const handleLogin = async () => {
    fetch('/loginUser', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    }).then(response => response.json())
    .then(result => {
      console.log(result)
      if (result == 0) {
        //login passes
        console.log('pass')
        goToAboutPage()
      } else {
        //login fails
        console.log('fail')
        setMessage('Invalid credentials')
      }
      setPassword('')
    })
  }

  function goToAboutPage() {
    navigate('/home');
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <p>{message}</p>
        <div className="login-field">
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange}/>
        </div>
        <div className="login-field">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <div className="login-actions">
          <button className="login-button" onClick={handleLogin}>LOG IN</button>
          <button className="new-user-button" onClick={handleCreateUser}>NEW USER</button>
        </div>
      </div>
      <button onClick={goToAboutPage}>Go To Home Page</button>
    </div>
  );
}

export default LoginPage;
