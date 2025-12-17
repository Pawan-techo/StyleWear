import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductRedcuer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { paymentReducer } from "./Payment/Reducer";
import adminOrderReducer from "./Admin/Order/Reducer";
import { feedbackReducer } from "./Rate&Review/Reducer";
const rootReducers = combineReducers({
  auth: authReducer,
  product: customerProductRedcuer,
  cart: cartReducer,
  order: orderReducer,
  payment:paymentReducer,
  adminOrder:adminOrderReducer,
  feedback:feedbackReducer,
});
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
