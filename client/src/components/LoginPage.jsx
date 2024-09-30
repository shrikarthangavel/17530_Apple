import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  function goToAboutPage() {
    navigate('/home');
  }
    return (
      <button onClick={goToAboutPage}>"Welcome to Login Page"</button>
    );
}

export default LoginPage;