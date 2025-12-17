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

const initialState = {
  ratings: {
    loading: false,
    data: [],
    error: null,
  },
  reviews: {
    loading: false,
    data: [],
    error: null,
  },
  createRating: {
    loading: false,
    success: false,
    error: null,
  },
  createReview: {
    loading: false,
    success: false,
    error: null,
  },
};

export const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RATING_REQUEST:
      return { 
        ...state, 
        createRating: { loading: true, success: false, error: null } 
      };
    case CREATE_RATING_SUCCESS:
      return { 
        ...state, 
        createRating: { loading: false, success: true, error: null },
        ratings: { ...state.ratings, data: [...state.ratings.data, action.payload] }
      };
    case CREATE_RATING_FAILURE:
      return { 
        ...state, 
        createRating: { loading: false, success: false, error: action.payload } 
      };

    // GET ALL RATINGS
    case GET_ALL_RATING_REQUEST:
      return { ...state, ratings: { ...state.ratings, loading: true, error: null } };
    case GET_ALL_RATING_SUCCESS:
      return { ...state, ratings: { loading: false, data: action.payload, error: null } };
    case GET_ALL_RATING_FAILURE:
      return { ...state, ratings: { loading: false, data: [], error: action.payload } };

    // CREATE REVIEW
    case CREATE_REVIEW_REQUEST:
      return { 
        ...state, 
        createReview: { loading: true, success: false, error: null } 
      };
    case CREATE_REVIEW_SUCCESS:
      return { 
        ...state, 
        createReview: { loading: false, success: true, error: null },
        reviews: { ...state.reviews, data: [...state.reviews.data, action.payload] }
      };
    case CREATE_REVIEW_FAILURE:
      return { 
        ...state, 
        createReview: { loading: false, success: false, error: action.payload } 
      };

    // GET ALL REVIEWS
    case GET_ALL_REVIEW_REQUEST:
      return { ...state, reviews: { ...state.reviews, loading: true, error: null } };
    case GET_ALL_REVIEW_SUCCESS:
      return { ...state, reviews: { loading: false, data: action.payload, error: null } };
    case GET_ALL_REVIEW_FAILURE:
      return { ...state, reviews: { loading: false, data: [], error: action.payload } };

    default:
      return state;
  }
};
