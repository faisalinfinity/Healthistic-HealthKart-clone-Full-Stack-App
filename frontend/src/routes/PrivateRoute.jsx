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
  console.log("IS LoggedIn",isLoggedIn)
  if (!isLoggedIn) {
    return <LoginPage/>;
  }
  if(isLoggedIn && role==="admin" ){
    return <AdminPage/>
  }
  
  return children;
};

export default PrivateRoute;
