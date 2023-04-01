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
    axios.post(`http://localhost:8080/users/order`, data, {
        headers: {
            Authorization: `Bearer ${storageData.user.token}`,
        }
    }).then(res => dispatch(orderSuccess(res.data)))
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
