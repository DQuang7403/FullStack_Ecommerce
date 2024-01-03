import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//import pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import ProductByCategory from "./pages/ProductByCategory";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";

import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import YourCart from "./pages/YourCart";
//import context
import { CategoryProvider } from "./context/CategoryContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <CategoryProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="/contact" element={<ContactPage />}></Route>

              <Route path="/product/:id" element={<ProductPage />}></Route>

              <Route
                path="/category/:name"
                element={<ProductByCategory />}
              ></Route>
              <Route path="/products/:name" element={<ProductsPage />}></Route>
              <Route
                path="/products/search/:search"
                element={<ProductsPage />}
              ></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/yourcart" element={<YourCart />}></Route>
            </Routes>
            <Footer />
          </CategoryProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
