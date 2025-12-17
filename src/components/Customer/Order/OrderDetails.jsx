import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryById } from "../../../state/Order/Action";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((store) => store.order);
  const { user } = useSelector((store) => store.auth);
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    if (user?._id) dispatch(getOrderHistoryById());
  }, [user, dispatch]);

  if (loading) {
    return (
      <h1 className="flex items-center justify-center text-lg h-[100vh]">
        Loading orders...
      </h1>
    );
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-20 my-6 space-y-4 h-[100vh]">
      {orders?.orders?.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No order history found.
        </p>
      )}

      {orders?.orders?.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition
                     flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          {/* IMAGE STACK */}
          <div className="flex">
            <div className="relative h-20 mr-25 sm:w-10 flex justify-center sm:justify-start">
              {order.orderItems.slice(0, 3).map((item, i) => (
                <div
                  key={i}
                  className="absolute w-14 h-20 rounded-md overflow-hidden shadow-md border border-gray-300"
                  style={{ left: `${i * 26}px`, zIndex: i }}
                >
                  <img
                    src={item?.product?.imageUrl?.[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  {i === 2 && order.orderItems.length > 3 && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white font-semibold">
                      +{order.orderItems.length - 2}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex-1 text-center sm:text-left sm:ml-4">
              <p className="text-gray-500 text-xs">Order ID</p>
              <p className="font-semibold text-sm break-all">{order._id}</p>

              <div className="flex justify-center sm:justify-start gap-4 mt-2 text-sm">
                <p className="text-gray-600">
                  Items: <span className="font-medium">{order.totalItem}</span>
                </p>
                <p className="text-green-600 font-bold">
                  ₹{order.totalDiscountedPrice}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedOrder(order)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg
                       hover:bg-blue-700 transition cursor-pointer"
          >
            View Details
          </button>
        </div>
      ))}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          close={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderDetails;
