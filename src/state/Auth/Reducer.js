import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from "./ActionType";

const savedUser = JSON.parse(localStorage.getItem("user"));
const savedJwt = localStorage.getItem("jwt");

const initialState = {
  user: savedUser || null,
  users: [],                   
  jwt: savedJwt || null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        error: null,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      return {
        ...initialState,
        user: null,
        jwt: null,
        users: [],
      };

    default:
      return state;
  }
};
