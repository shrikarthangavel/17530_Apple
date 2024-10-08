import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  function goToManagementPage() {
    navigate('/home/management');
  }
    return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToManagementPage}>"Go To Management Page"</button>
    </div>
    );
}

export default HomePage;