import { Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(AuthContext);
  const isAuthenticated = user;
  return isAuthenticated ? children : <Navigate to="/login" />;
}
