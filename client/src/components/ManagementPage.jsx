import React from 'react'
import { useNavigate } from 'react-router-dom';

function ManagementPage() {
  const navigate = useNavigate();
  function goToCheckoutPage() {
    navigate('/home/management/checkout');
  }
    return (
    <div>
      <h1>Welcome to the Management Page</h1>
      <button onClick={goToCheckoutPage}>"Go To Checkout Page"</button>
    </div>
    );
}

export default ManagementPage;