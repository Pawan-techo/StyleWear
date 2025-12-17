import { Button } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../../state/Order/Action";
import { useLocation } from "react-router-dom";
import { createPayment } from "../../../state/Payment/Action";
const OrderSummery = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const handleCheckOut = () => {
    dispatch(createPayment(orderId));
  };
  return (
    <div>
      <div className="p-5 ">
        <AddressCard address={order.order?.shippingAddress} readOnly={true} />
      </div>
      <div className="min-h-screen  py-6">
        <div className="lg:grid grid-cols-3 gap-6 relative m-4">
          
          <div className="col-span-2 space-y-5">
            {order.order?.orderItems?.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

       
          <div className=" sticky top-5 h-fit mt-6 lg:mt-0">
            <div className="shadow-md bg-white rounded-xl p-5 border border-gray-100">
              <p className="opacity-60 font-semibold pb-3 text-gray-600 text-sm">
                PRICE DETAILS
              </p>
              <hr className="mb-4 opacity-40" />
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <p>Price ({order.order?.totalItem}items)</p>
                  <p>₹{order.order?.totalPrice}</p>
                </div>

                <div className="flex justify-between">
                  <p>Discount</p>
                  <p className="text-green-600 font-medium">
                    − ₹{order.order?.discount}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p>Delivery Charges</p>
                  <p className="text-green-600 font-medium">Free</p>
                </div>
              </div>

              <hr className="my-4 opacity-70" />
              <div className="flex justify-between items-center font-semibold text-gray-900 text-base">
                <p>Total Amount</p>
                <p>₹{order.order?.totalDiscountedPrice}</p>
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="!mt-6 !bg-indigo-600 hover:!bg-indigo-700 !py-2.5 !text-white !font-semibold !rounded-lg"
                onClick={handleCheckOut}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
