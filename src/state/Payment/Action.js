import { api } from "../../config/apiConfig";
import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "./ActionType";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/payments/${orderId}`, {});

    if (data.payment_Link_Url) {
      window.location.href = data.payment_Link_Url;
      dispatch({ type: CREATE_PAYMENT_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
  }
};

export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post("/api/payments", {
      payment_id: reqData.paymentId,
      order_id: reqData.orderId
    });
    dispatch({ type: UPDATE_PAYMENT_SUCCESS });
    console.log("update payment :-", data);
  } catch (error) {
    dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message });
  }
};

 