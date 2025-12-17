import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  deleteOrder,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  placeOrder,
} from "../../state/Admin/Order/Action";
import OrderDetailsModal from "./OrderDetailsModal";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders = [], loading } = useSelector((state) => state.adminOrder);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openStatusMenu, setOpenStatusMenu] = useState(null);

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  const handleStatusChange = (orderId, status) => {
    switch (status) {
      case "PLACED":
        dispatch(placeOrder(orderId));
        break;
      case "CONFIRMED":
        dispatch(confirmOrder(orderId));
        break;
      case "SHIPPED":
        dispatch(shipOrder(orderId));
        break;
      case "DELIVERED":
        dispatch(deliverOrder(orderId));
        break;
      case "CANCELLED":
        dispatch(cancelOrder(orderId));
        break;
      default:
        return;
    }
    setOpenStatusMenu(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-orange-100 text-orange-600";
      case "PLACED":
        return "bg-orange-100 text-green-500";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-600";
      case "SHIPPED":
        return "bg-purple-100 text-purple-600";
      case "DELIVERED":
        return "bg-green-100 text-green-600";
      case "CANCELLED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Orders Management</h2>

      {loading && (
        <p className="text-lg flex justify-center items-center font-medium">
          Wait, Loading orders...
        </p>
      )}

      <div className="space-y-4">
        {orders.map((order) => {
          return (
            <div
              key={order._id}
              className="bg-white rounded-lg p-5 flex flex-col md:flex-row justify-between gap-4 hover:shadow-md transition"
            >
          
              <div className="relative w-40 h-20 flex mt-8 items-center">
                {order.orderItems.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    className="absolute w-16 h-20 rounded-md overflow-hidden border shadow"
                    style={{ left: `${i * 28}px`, zIndex: i }}
                  >
                    <img
                      src={item?.product?.imageUrl?.[0]}
                      alt="product"
                      className="w-full h-full object-cover"
                    />
                    {i === 2 && order.orderItems.length > 3 && (
                      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                        +{order.orderItems.length - 2}
                      </div>
                    )}
                  </div>
                ))}
              </div>

          
              <div className="flex-1">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold text-lg">{order._id}</p>

                <p className="mt-1 text-gray-700">
                  <span className="font-medium">Customer:</span>{" "}
                  {order.user.firstName} {order.user.lastName}
                </p>

                <p className="mt-1 text-gray-700">
                  <span className="font-medium">Items:</span> {order.totalItem}
                </p>

                <p className="mt-1 font-semibold text-xl text-green-700">
                  ₹{order.totalDiscountedPrice}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    Status:
                  </span>

                  <button
                    onClick={() =>
                      setOpenStatusMenu(
                        openStatusMenu === order._id ? null : order._id
                      )
                    }
                    className={`px-4 py-1.5 flex items-center gap-2 rounded-full text-sm font-semibold cursor-pointer shadow-sm transition ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openStatusMenu === order._id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
                {openStatusMenu === order._id && (
                  <div className="absolute right-0 mt-10 bg-white border rounded-lg shadow-lg w-44 z-20 animate-fadeIn">
                    {[
                      "PLACED",
                      "CONFIRMED",
                      "SHIPPED",
                      "DELIVERED",
                      "CANCELLED",
                    ].map((status) => (
                      <p
                        key={status}
                        onClick={() => handleStatusChange(order._id, status)}
                        className="px-4 py-2 m-1 text-sm text-gray-700  border border-gray-300 hover:bg-gray-100 cursor-pointer"
                      >
                        {status}
                      </p>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          close={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;
