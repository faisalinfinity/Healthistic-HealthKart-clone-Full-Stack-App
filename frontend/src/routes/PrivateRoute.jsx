import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.authReducer.isLoggedIn,
    };
  });
  if (!isLoggedIn) {
    return <LoginPage/>;
  }
  return children;
};

export default PrivateRoute;
