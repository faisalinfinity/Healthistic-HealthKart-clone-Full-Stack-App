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
