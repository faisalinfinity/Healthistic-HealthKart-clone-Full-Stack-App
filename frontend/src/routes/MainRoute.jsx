import React from "react";
import { Route, Routes } from "react-router-dom";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/LoginPage";
import Signup from "../pages/SignUpPage";
import SingleProductPage from "../pages/SingleProductPage";
import PrivateRoute from "./PrivateRoute";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/productDetails" element={<SingleProductPage />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default MainRoute;
