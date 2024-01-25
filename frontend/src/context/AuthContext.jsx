import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const localAuth = localStorage.getItem("authTokens");
  const [user, setUser] = useState(() => {
    return localAuth ? jwtDecode(localAuth) : null;
  });
  const [authToken, setAuthToken] = useState(() => {
    return localAuth ? JSON.parse(localAuth) : null;
  });
  const SignupUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      Swal.fire({
        title: "Good job!",
        text: "Registration successful. Please login",
        icon: "success"
      });
      navigate("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:5000/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access_token));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please check your credentials ",
      });
    }
  };
  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };
  const updateToken = async () => {
    let response = await fetch(`http://127.0.0.1:5000/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken?.refresh_token}`,
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthToken((prev) => {
        return { ...prev, access_token: data.access_token };
      });
      setUser(jwtDecode(data.access_token));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
    // if (loading) {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    const expires = 1000 * 60 * 15;
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, expires);
    return () => {
      clearInterval(interval);
    };
  }, [authToken]);

  const contextData = {
    authToken: authToken,
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    SignupUser: SignupUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
