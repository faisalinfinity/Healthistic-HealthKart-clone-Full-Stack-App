import axios from "axios";
import { CART_FAIL, CART_REQ, CART_SUCCESS } from "./actionTypes";
import { BASE_URL } from "../../constants/constants";

export const cartReqAction = () => {
  return { type: CART_REQ };
};
export const cartSuccessAction = (payload) => {
  return { type: CART_SUCCESS, payload };
};

export const cartFailAction = () => {
  return { type: CART_FAIL };
};

export const addToCart = (data) => (dispatch) => {
  dispatch(cartReqAction());
  axios
    .post(BASE_URL + `/users/cart`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("UserDetails")).token}`,
      },
    })
    .then((res) =>console.log(res.data))
    .catch((err) => console.log(err));
};

export const getCartData = (dispatch) => {
  dispatch(cartReqAction());
  axios
    .get(BASE_URL + `/users/cart`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("UserDetails")).token
        }`,
      },
    })
    .then((res) => dispatch(cartSuccessAction(res.data)))
    .catch((err) => dispatch(cartFailAction()));
};
export const deleteCartItem = (id) => (dispatch) => {
  dispatch(cartReqAction());
  return axios
    .delete(BASE_URL + `/users/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("UserDetails")).token
        }`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
export const updateQuantity = (data) => (dispatch) => {
  dispatch(cartReqAction());
  return axios
    .patch(BASE_URL + `/users/cart/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("UserDetails")).token
        }`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
