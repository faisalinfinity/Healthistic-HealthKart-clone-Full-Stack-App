import React from "react";
import { Route, Routes } from "react-router-dom";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/LoginPage";
import Signup from "../pages/SignUpPage";
import SingleProductPage from "../pages/SingleProductPage";
import PrivateRoute from "./PrivateRoute";
import MultiProductPage from "../pages/MultiProductPage";
import AccountInfo from "../pages/Home/AccountInfo";
import AdminPage from "../admin/pages/AdminPage";
import CheckoutPage from "../pages/CheckoutPage";
import Payment from "../pages/Payment";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/product/multi/:category" element={<MultiProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={< Payment/>} />
      <Route
        path="/profile"
        element={
          
            <AccountInfo />
          
        }
      />
      <Route path="*" element={<h1>Nothing Found</h1>} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      />
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
