import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../state/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);

  const handleCheckoutClick = () => {
    navigate("/checkout?step=2");
  };

  useEffect(() => {
    if (auth.jwt) {
      dispatch(getCart());
    }
  }, [auth.jwt, cart.updateCartItem, cart.deleteCartItem]);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="lg:grid grid-cols-3 lg:px-16 gap-6 relative m-2">
   
       

          {(!cart.cartItems || cart.cartItems.length === 0) && (
             <div className="col-span-3 space-y-5">
            <div className="flex flex-col items-center justify-center py-47 bg-white rounded-xl shadow">
              <img
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                className="w-32 opacity-70"
                alt="empty-cart"
              />
              <h2 className="text-xl font-semibold text-gray-700 mt-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Looks like you haven’t added anything yet.
              </p>

              <Button
                onClick={() => navigate("/")}
                variant="contained"
                className="!mt-4 !bg-indigo-600 hover:!bg-indigo-700 !text-white !rounded-lg !px-6 !py-2"
              >
                Start Shopping
              </Button>
            </div></div>
          )}
           <div className="col-span-2 space-y-5">
          {Array.isArray(cart?.cartItems) &&
            cart.cartItems.length > 0 &&
            cart.cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
        </div>

        {cart.cartItems?.length > 0 && (
          <div className="px-6 sticky top-0 h-fit mt-6 lg:mt-0">
            <div className="shadow-md bg-white rounded-xl p-5 border border-gray-100">
              <p className="opacity-60 font-semibold pb-3 text-gray-600 text-sm">
                PRICE DETAILS
              </p>
              <hr className="mb-4 opacity-40" />

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <p>Price ({cart.cart?.totalItem})</p>
                  <p>₹{cart.cart?.totalPrice}</p>
                </div>

                <div className="flex justify-between">
                  <p>Discount</p>
                  <p className="text-green-600 font-medium">
                    − ₹{cart.cart?.discount}
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
                <p>₹{cart.cart?.totalDiscountedPrice}</p>
              </div>

              <Button
                onClick={handleCheckoutClick}
                variant="contained"
                fullWidth
                className="!mt-6 !bg-indigo-600 hover:!bg-indigo-700 !py-2.5 !text-white !font-semibold !rounded-lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
