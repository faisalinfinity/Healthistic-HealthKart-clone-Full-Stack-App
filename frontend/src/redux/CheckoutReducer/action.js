import axios from "axios"
import { ORDER_ERROR, ORDER_LOADING, ORDER_SUCCESS } from "./actionTypes"

const orderSuccess = (payload) => {
    return {
        type: ORDER_SUCCESS,
        payload
    }
}

const orderError = () => {
    return {
        type: ORDER_ERROR,
    }
}

const orderLoading = () => {
    return {
        type: ORDER_LOADING,
    }
}

const storageData = JSON.parse(localStorage.getItem("UserDetails"));

const addToOrder = (data) => (dispatch) => {
    dispatch(orderLoading())
    return axios.post(`http://localhost:8080/users/order`, data, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0M2I0NmVhN2FhMDU3YTI3ODI4YWUiLCJpYXQiOjE2ODAxNjQ3MDd9.dnwiGLzmb7tv-c6bKcIlGRmRNQsSz61NGRjcw1tNML8`,
        }
    }).then(res => localStorage.removeItem("newItem"))
        .catch(err => dispatch(orderError()))
}

const getOrder = () => (dispatch) => {
    dispatch(orderLoading())
    axios.get(`http://localhost:8080/users/order`, {
        headers: {
            Authorization: `Bearer ${storageData.user.token}`,
        }
    }).then(res => dispatch(orderSuccess(res.data)))
        .catch(err => dispatch(orderError()))
}

export { orderError, orderLoading, orderSuccess, addToOrder, getOrder }
