import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ...props }) {
  const jwt = localStorage.getItem("jwt");
  return jwt || props.loggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
