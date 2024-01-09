import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//import pages
import HomePage from "./pages/View/HomePage";
import AboutPage from "./pages/View/AboutPage";
import ContactPage from "./pages/View/ContactPage";
import AccountPage from "./pages/Member/AccountPage";
import OrderPage from "./pages/Member/OrderPage";
import WishListPage from "./pages/Member/WishListPage";

import ProductByCategory from "./pages/Product/ProductByCategory";
import ProductsPage from "./pages/Product/ProductsPage";
import ProductPage from "./pages/Product/ProductPage";

import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import YourCart from "./pages/YourCart";
//import context
import { CategoryProvider } from "./context/CategoryContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishListProvider } from "./context/WishListContext";

//import ultils
import ScrollToTop from "./utils/srollToTop";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <>
      <WishListProvider>
        <AuthProvider>
          <CartProvider>
            <CategoryProvider>
              <ScrollToTop>
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
                  <Route
                    path="/products/:name"
                    element={<ProductsPage />}
                  ></Route>
                  <Route
                    path="/products/search/:search"
                    element={<ProductsPage />}
                  ></Route>
                  <Route path="/wishlist" element={<WishListPage />}></Route>

                  <Route
                    path="/account"
                    element={
                      <PrivateRoute>
                        <AccountPage />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/order"
                    element={
                      <PrivateRoute>
                        <OrderPage />
                      </PrivateRoute>
                    }
                  ></Route>

                  <Route path="/signup" element={<SignUpPage />}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route path="/yourcart" element={<YourCart />}></Route>
                </Routes>
                <Footer />
              </ScrollToTop>
            </CategoryProvider>
          </CartProvider>
        </AuthProvider>
      </WishListProvider>
    </>
  );
}

export default App;
