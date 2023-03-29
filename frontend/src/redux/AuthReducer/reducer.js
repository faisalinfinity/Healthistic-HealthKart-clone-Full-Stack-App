import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

const initState = {
  isLoggedIn: false,
  name: "",
  email: "",
  token: "",
  gender: "",
  profile: "",
  isLoading: false,
  isError: true,
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        name: payload.name,
        email: payload.email,
        token: payload.token,
        gender: payload.gender,
        profile: payload.profile,
      };
    case LOGIN_FAILED:
      return { ...state, isLoading: false, isError: true };

    case LOGOUT:
      return state;
    default:
      return state;
  }
};

export { reducer };
