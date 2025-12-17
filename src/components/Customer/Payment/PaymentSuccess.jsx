import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../state/Order/Action";
import { updatePayment } from "../../../state/Payment/Action";

export default function PaymentSuccess() {
const steps = ["PLACED", "CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"];

  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setPaymentId(params.get("razorpay_payment_id"));
    setPaymentStatus(params.get("razorpay_payment_link_status"));
    setOrderId(params.get("razorpay_payment_link_reference_id"));
  }, []);

  useEffect(() => {
    if (paymentId && orderId) {
      const data = { orderId, paymentId };

      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [paymentId, orderId, dispatch]);
const getActiveStep = (status) => {
  switch (status) {
    case "PLACED":
      return 0;
    case "CONFIRMED":
      return 1;
    case "SHIPPED":
      return 2;
    case "OUT_FOR_DELIVERY":
      return 3;
    case "DELIVERED":
      return 4;
    default:
      return 0; 
  }
};
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-2xl mx-auto bg-white border border-green-500 rounded-2xl p-5 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-4 animate-pulse">
          <CheckCircleIcon className="text-green-500 !text-4xl  mr-2" />
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mt-2">
          Congratulations! Your order has been placed successfully.
        </p>
      </div>
      <div className="lg:px-20 mt-10">
       <Box sx={{ width: "100%" }}>
  <Stepper activeStep={getActiveStep(order?.order?.orderStatus)} alternativeLabel>
    {steps.map((status, index) => (
      <Step key={index}>
        <StepLabel>{status.replace(/_/g, " ")}</StepLabel>
      </Step>
    ))}
  </Stepper>
</Box>

      </div>
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-5">
          {order.order?.orderItems?.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row bg-white shadow-md rounded-xl p-4 gap-4"
            >
              <div className="flex gap-4 w-full md:w-2/3">
                <img
                  src={item?.product?.imageUrl?.[0]}
                  alt={item?.product?.title}
                  className="w-28 h-35 object-cover object-top rounded-lg border border-gray-400 shadow-md"
                />

                <div>
                  <h3 className="font-semibold text-lg">{item?.product?.title}</h3>
                  <p className="text-sm text-gray-700"><strong>Brand:</strong> {item?.product?.brand}</p>
                  <p className="text-sm text-gray-700"><strong>Size:</strong> {item?.size}</p>
                  <p className="text-sm text-gray-700"><strong>Color:</strong> {item?.product?.color}</p>
                  <p className="text-sm text-gray-700"><strong>Seller:</strong> {item?.product?.seller}</p>

                  <p className="font-bold text-gray-900 mt-1">
                    ₹{item?.discountedPrice} /-
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg w-full md:w-1/3 border border-gray-300">
                <h4 className="font-semibold mb-1">Shipping Address</h4>

                <p className="text-sm text-gray-700">{`${order?.order?.shippingAddress?.firstName} ${order?.order?.shippingAddress?.lastName}`}</p>
                <p className="text-sm text-gray-700">
                  {order?.order?.shippingAddress?.streetAddress}, {order?.order?.shippingAddress?.city}
                </p>
                <p className="text-sm text-gray-700">
                  {order?.order?.shippingAddress?.state} - {order?.order?.shippingAddress?.zipCode}
                </p>
                <p className="text-sm text-gray-700">
                  Phone: {order?.order?.shippingAddress?.mobile}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
