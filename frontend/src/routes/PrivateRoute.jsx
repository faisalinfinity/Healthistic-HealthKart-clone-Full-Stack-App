import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.authReducer.isLoggedIn,
    };
  });
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
