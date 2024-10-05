import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('authenticated');

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
