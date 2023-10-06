import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SpecialNavBar from "./components/SpecialNavBar";
import Footer from "./components/Footer";
//import pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="About" element={<AboutPage />}></Route>
        <Route path="Signup" element={<SignUpPage />}></Route>
        <Route path="Login" element={<LoginPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
