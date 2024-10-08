import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  function goToAboutPage() {
    navigate('/home');
  }
    return (
      <div>
      <h1>Welcome to the Login Page</h1>
      <button onClick={goToAboutPage}>"Go To Home Page"</button>
    </div>
    );
}

export default LoginPage;