import axios from "axios"
import { ORDER_ERROR, ORDER_LOADING, ORDER_SUCCESS } from "./actionTypes"
import { BASE_URL } from "../../constants/constants";

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
    return axios.post(`${BASE_URL}/users/order`, data, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("UserDetails")).token}`,
        }
    }).then(res => localStorage.removeItem("newItem"))
        .catch(err => dispatch(orderError()))
}

const payforOrder = () => (dispatch) => {
    dispatch(orderLoading());
    axios.post(`http://localhost:8080/users/payment/checkout`, {
        "amount": 1
    }, {
        headers: {
            Authorization: `Bearer ${storageData.token}`,
        }
    }).then(res => {
        console.log(res.data, process.env.REACT_APP_KEYID)
        const options = {
            "key": process.env.REACT_APP_KEYID, // Enter the Key ID generated from the Dashboard
            "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Healthistic Corp.", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:8080/users/payment/paymentverifier",
            "prefill": {
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    })
        .catch(err => dispatch(orderError));
}

const getOrder = () => (dispatch) => {
    dispatch(orderLoading())
    axios.get(`${BASE_URL}/users/order`, {
        headers: {
            Authorization: `Bearer ${storageData.user.token}`,
        }
    }).then(res => dispatch(orderSuccess(res.data)))
        .catch(err => dispatch(orderError()))
}

export { orderError, orderLoading, orderSuccess, addToOrder, getOrder, payforOrder }
