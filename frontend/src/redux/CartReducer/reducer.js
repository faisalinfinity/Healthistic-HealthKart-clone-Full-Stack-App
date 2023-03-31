import { CART_FAIL, CART_REQ, CART_SUCCESS } from "./actionTypes";

const initState = { isLoading: false, isError: false, items: [] };
const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case CART_REQ:
      return { ...state, isLoading: true };
    case CART_SUCCESS:
      return { ...state, isLoading: false, items: payload };
    case CART_FAIL:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export { reducer };
