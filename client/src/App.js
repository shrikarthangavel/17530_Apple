import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ManagementPage from './components/ManagementPage';
import ReturnPage from './components/ReturnPage';
import CheckoutPage from './components/CheckoutPage';
import ProjectDetails from './components/ProjectDetails';

function App() {
    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:username" element={<CheckoutPage />} />
        <Route path="/home/management" element={<ManagementPage />} />          {/* Delete */}
        <Route path="/home/management/checkout" element={<CheckoutPage />} />   {/* Delete */}
        <Route path="/home/management/checkout/:id" element={<ProjectDetails />} />   {/* Delete */}
        <Route path="/home/management/checkout/return" element={<ReturnPage />} />    {/* Delete */}
      </Routes>
    </Router>
  );
}

export default App;
