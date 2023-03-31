import axios from "axios";
import { CART_FAIL, CART_REQ, CART_SUCCESS } from "./actionTypes";

export const cartReqAction = () => {
  return { type: CART_REQ };
};
export const cartSuccessAction = (payload) => {
  return { type: CART_SUCCESS, payload };
};

export const cartFailAction = () => {
  return { type: CART_FAIL };
};

const storageData = JSON.parse(localStorage.getItem("UserDetails"));

export const addToCart = (data) => (dispatch) => {
  dispatch(cartReqAction());
  axios
    .post(`http://localhost:8080/users/cart`, data, {
      headers: {
        Authorization: `Bearer ${storageData.user.token}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export const getCartData = (dispatch) => {
  dispatch(cartReqAction());
  axios
    .get(`http://localhost:8080/users/cart`, {
      headers: {
        Authorization: `Bearer ${storageData.user.token}`,
      },
    })
    .then((res) => dispatch(cartSuccessAction(res.data)))
    .catch((err) => dispatch(cartFailAction()));
};
export const deleteCartItem = (id) => (dispatch) => {
  dispatch(cartReqAction());
  return axios
    .delete(`http://localhost:8080/users/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${storageData.user.token}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
export const updateQuantity = (data) => (dispatch) => {
  dispatch(cartReqAction());
  return axios
    .patch(`http://localhost:8080/users/cart/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${storageData.user.token}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
