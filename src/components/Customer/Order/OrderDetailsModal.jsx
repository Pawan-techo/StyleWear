import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewModal from "./ReviewModal";
import { useSelector } from "react-redux";

const OrderDetailsModal = ({ order, close }) => {
  const status = order.orderStatus;
  const { auth } = useSelector((store) => store);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleOpenReview = (productId) => {
    setSelectedProductId(productId);
    setReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setReviewModalOpen(false);
    setSelectedProductId(null);
  };

  let steps = [];
  let stepColors = [];

  if (status === "DELIVERED") {
    steps = ["PLACED", "DELIVERED"];
    stepColors = steps.map(() => "bg-green-600");
  } else if (status === "CANCELLED") {
    steps = ["PLACED", "CANCELLED"];
    stepColors = steps.map(() => "bg-red-600");
  } else {
    steps = ["PLACED", "CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"];
    stepColors = steps.map((s) =>
      s === status ? "bg-blue-600" : "bg-gray-400"
    );
  }
  const currentUserId = auth?.user?._id;
const hasUserReviewed = (reviews = []) => {
  return reviews.some(
    (review) => review.user?._id === currentUserId
  );
};


  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-scaleIn">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Order Details</h2>
            <button
              onClick={close}
              className="text-gray-500 hover:text-black text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="p-6">
            <div className="mb-8">
              <p className="font-semibold text-gray-700 mb-3">Order Status</p>

              <div className="flex items-center gap-3">
                {steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`w-8 h-8 rounded-full text-white flex items-center justify-center ${stepColors[i]}`}
                    >
                      {i + 1}
                    </div>
                    {i !== steps.length - 1 && (
                      <div className="flex-1 h-1 bg-gray-300"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex justify-between mt-2 text-xs text-gray-600">
                {steps.map((step) => (
                  <span key={step}>{step.replace("_", " ")}</span>
                ))}
              </div>
            </div>
            <div className="mb-6 shadow-sm pl-4">
              <p className="font-bold text-lg mb-1">Delivery Address</p>
              <p className="text-sm">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p className="text-sm">{order.shippingAddress.streetAddress}</p>
              <p className="text-sm">
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p className="text-sm">{order.shippingAddress.zipCode}</p>
            </div>
            <div className="space-y-4">
              <p className="font-bold text-lg">Products</p>

              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between shadow-md rounded-xl p-4 hover:shadow transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.imageUrl[0]}
                      className="w-20 h-24 rounded-lg object-cover object-top border"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold">{item.product.title}</p>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                      <p className="text-xs text-gray-500">
                        Color: {item.product.color}
                      </p>
                      <p className="font-bold text-gray-900 mt-1">
                        ₹{item.discountedPrice}
                      </p>
                    </div>
                  </div>

                 {status === "DELIVERED" &&
  (hasUserReviewed(item.product.reviews) ? (
    <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
      <FaStar className="text-green-500" />
  Already Rated
    </div>
  ) : (
    <button
      onClick={() => handleOpenReview(item.product._id)}
      className="flex items-center gap-2 border border-yellow-400 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-50 transition cursor-pointer"
    >
      <FaStar className="text-yellow-500" />
      Rate & Review
    </button>
  ))}

                </div>
              ))}
            </div>
            <div className="text-right mt-6">
              <button
                onClick={close}
                className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal
        productId={selectedProductId}
        open={reviewModalOpen}
        handleClose={handleCloseReview}
      />
    </>
  );
};

export default OrderDetailsModal;
