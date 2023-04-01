import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as authReducer } from "./AuthReducer/reducer";
import { reducer as cartReducer } from "./CartReducer/reducer";
import { reducer as checkoutReducer } from "./ChckoutReducer/reducer";
const rootReducer = combineReducers({ authReducer, cartReducer,checkoutReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
