import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  GET_ALL_RATING_REQUEST,
  GET_ALL_RATING_SUCCESS,
  GET_ALL_RATING_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_ALL_REVIEW_REQUEST,
  GET_ALL_REVIEW_SUCCESS,
  GET_ALL_REVIEW_FAILURE,
} from "./ActionType";

export const createRating = (ratingData,productId) => async (dispatch) => {
  console.log(ratingData)
  dispatch({ type: CREATE_RATING_REQUEST });
  try {
    const response = await api.post(`${API_BASE_URL}/api/rating/create`,{ratingData,productId});
    dispatch({ type: CREATE_RATING_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_RATING_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAllRatings = (productId) => async (dispatch) => {
  dispatch({ type: GET_ALL_RATING_REQUEST });
  try {
    const response = await api.get(`${API_BASE_URL}/api/rating/product/${productId}`);
    dispatch({ type: GET_ALL_RATING_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_RATING_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createReview = (reviewData,productId) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const response = await api.post(`${API_BASE_URL}/api/review/create`, {reviewData,productId});
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAllReviews = (productId) => async (dispatch) => {
  dispatch({ type: GET_ALL_REVIEW_REQUEST });
  try {
    const response = await api.get(`${API_BASE_URL}/api/review/prodcut/${productId}`);
    dispatch({ type: GET_ALL_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_REVIEW_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
