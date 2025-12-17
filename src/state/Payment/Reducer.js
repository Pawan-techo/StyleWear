import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  paymentCreated: false,
  paymentUpdated: false,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        paymentCreated: false,
      };

    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        paymentCreated: true,
      };

    case CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentCreated: false,
      };

    case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        paymentUpdated: false,
      };

    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        paymentUpdated: true,
      };

    case UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentUpdated: false,
      };

    default:
      return state;
  }
};
