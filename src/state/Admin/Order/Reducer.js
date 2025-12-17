import {
  CANCELLED_ORDER_FAILURE,
  CANCELLED_ORDER_REQUEST,
  CANCELLED_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PLACED_ORDER_FAILURE,
  PLACED_ORDER_REQUEST,
  PLACED_ORDER_SUCCESS,
  SHIPPED_ORDER_FAILURE,
  SHIPPED_ORDER_REQUEST,
  SHIPPED_ORDER_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  orders: [],
  error: "",
};

const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, loading: true };
    case GET_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload, error: "" };
    case GET_ORDERS_FAILURE:
      return { loading: false, orders: [], error: action.payload };
    case CONFIRM_ORDER_REQUEST:
    case PLACED_ORDER_REQUEST:
    case CANCELLED_ORDER_REQUEST:
    case DELIVERED_ORDER_REQUEST:
    case SHIPPED_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PLACED_ORDER_SUCCESS:
    case CONFIRM_ORDER_SUCCESS:
    case SHIPPED_ORDER_SUCCESS:
    case DELIVERED_ORDER_SUCCESS:
    case CANCELLED_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };

    case DELETE_ORDER_REQUEST:
      return { ...state, loading: true };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    case DELETE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CONFIRM_ORDER_FAILURE:
    case SHIPPED_ORDER_FAILURE:
    case CANCELLED_ORDER_FAILURE:
    case PLACED_ORDER_FAILURE:
    case DELIVERED_ORDER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default adminOrderReducer;
