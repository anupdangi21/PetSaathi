import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext "; // Import the context

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/dashboard" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the child component if authenticated
};

export default ProtectedRoute;
