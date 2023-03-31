import axios from "axios";
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";

export const loginReqAction = () => {
  return { type: LOGIN_REQUEST };
};
export const loginSuccessAction = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};
export const loginFailAction = () => {
  return { type: LOGIN_FAILED };
};

export const login = (data) => (dispatch) => {
  dispatch(loginReqAction());
  axios
    .post(`http://localhost:8080/users/login`, data)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem(
        "UserDetails",
        JSON.stringify({ isLoggedIn: true, ...res.data })
      );
      dispatch(loginSuccessAction(res.data));
    })
    .catch((err) => dispatch(loginFailAction()));
};

export const logout = (dispatch) => {
  localStorage.setItem("UserDetails", JSON.stringify(null));
};
