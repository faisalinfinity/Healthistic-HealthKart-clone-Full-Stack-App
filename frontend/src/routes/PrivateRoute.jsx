import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../admin/pages/AdminPage";
const PrivateRoute = ({ children }) => {
  const { isLoggedIn ,role} = useSelector((store) => {
    return {
      isLoggedIn: store.authReducer.isLoggedIn,
    };
  });

  if(isLoggedIn && role==="admin" ){
    return <AdminPage/>
  }
  if (!isLoggedIn) {
    return <LoginPage/>;
  }
  return children;
};

export default PrivateRoute;
