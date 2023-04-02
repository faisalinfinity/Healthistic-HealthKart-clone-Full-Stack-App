import { ORDER_ERROR, ORDER_LOADING, ORDER_REQUEST, ORDER_SUCCESS } from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    order: []
}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case ORDER_LOADING:
            return {
                ...state, isLoading: true
            }
        case ORDER_SUCCESS:
            return {
                ...state, isLoading: false, order: payload
            }
        case ORDER_ERROR:
            return {
                ...state, isLoading: false, isError: true
            }
        default:
            return state;
    }
}

export { reducer }
