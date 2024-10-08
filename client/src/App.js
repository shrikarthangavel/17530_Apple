import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ManagementPage from './components/ManagementPage';
import ReturnPage from './components/ReturnPage';
import CheckoutPage from './components/CheckoutPage';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/management" element={<ManagementPage />} />
        <Route path="/home/management/checkout" element={<CheckoutPage />} />
        <Route path="/home/management/checkout/return" element={<ReturnPage />} />
      </Routes>
    </Router>
  );
}

export default App;
