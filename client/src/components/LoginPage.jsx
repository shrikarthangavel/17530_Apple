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
    const encryptedPass = encrypt(password, 1, 1)
    fetch('/createUser', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': encryptedPass})
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

  //change to also encrypt username and password before passing to server
  const handleLogin = async () => {
    const encryptedPass = encrypt(password, 1, 1)
    fetch('/loginUser', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username, 'password': encryptedPass})
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
    navigate(`/home/${username}/`);
  }

  function encrypt(toEncrypt, N, D) {
    const reversedText = toEncrypt.split('').reverse().join('');
    let encryptedText = '';
  
    for (let i = 0; i < reversedText.length; i++) {
      const char = reversedText[i];
      const ascii = char.charCodeAt(0);
  
      if (ascii >= 34) {
        const newAscii = ((ascii + N * D - 34) % (127 - 34)) + 34;
        encryptedText += String.fromCharCode(newAscii);
      } else {
        encryptedText += char;
      }
    }
  
    return encryptedText;
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
    </div>
  );
}

export default LoginPage;
