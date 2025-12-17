import React from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { removeCartItem, updateCartItem } from "../../../state/Cart/Action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleQuantityClick = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?._id,
    };
    dispatch(updateCartItem(data));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id));
  };

  return (
    <div className="flex flex-row  gap-5 p-5 rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex flex-col items-center  flex-shrink-0 space-y-3">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl border border-gray-200 overflow-hidden">
          <img
            onClick={() => navigate(`/product/${item.product?._id}`)}
            src={item.product?.imageUrl[0]}
            alt="Product"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>

        <div className="flex gap-2">
          <IconButton
            size="small"
            onClick={() => handleQuantityClick(-1)}
            disabled={item.quantity <= 1}
            className="text-gray-600 hover:text-red-500"
          >
            <RemoveCircleOutlineIcon fontSize="small" />
          </IconButton>
          <span className="px-4 border rounded-md text-gray-700 font-medium">
            {item.quantity}
          </span>
          <IconButton
            size="small"
            onClick={() => handleQuantityClick(1)}
            className="text-gray-600 hover:text-green-600"
          >
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
            {item.product?.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Size: <span className="font-medium">{item?.size}</span> | Color:{" "}
            <span className="font-medium">{item.product?.color}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Seller: <span className="font-medium">{item.product?.brand}</span>
          </p>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <p className="text-lg font-semibold text-gray-900">
              ₹{item.product?.discountedPrice}
            </p>
            <p className="text-gray-400 line-through text-sm">
              ₹{item.product?.price}
            </p>
            <span className="text-green-600 font-semibold text-xs sm:text-sm bg-green-50 px-2 py-0.5 rounded-md">
              {item.product?.discountPercent}% off
            </span>
          </div>
        </div>

        <div className="mt-4 sm:mt-2">
          <Button
            onClick={handleRemoveCartItem}
            variant="outlined"
            color="error"
            size="small"
            className="!normal-case !text-red-600 hover:!bg-red-50 !px-4 !py-1"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
