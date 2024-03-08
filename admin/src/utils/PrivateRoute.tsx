import React, { useEffect } from "react";
import useAuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
type PrivateRouteProps = {
  children: React.ReactNode;
};
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, setUrl } = useAuthContext();

  const isAuthenticated = user;
  useEffect(() => {
    if (isAuthenticated) setUrl("/");
    else setUrl("/login");
  }, []);
  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
}
