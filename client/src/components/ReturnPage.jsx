import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';


function ReturnPage() {
  const navigate = useNavigate();
  function goToLoginPage() {
    navigate('/');
  }
    return (
    <div>
      <Header />
      <h1>Welcome to the Return Page</h1>
      <button onClick={goToLoginPage}>"Go To Login Page"</button>
    </div>
    );
}

export default ReturnPage;