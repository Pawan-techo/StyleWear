import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="max-w-[250px] sm:max-w-[280px] bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-[250px] sm:h-[280px] bg-gray-100 flex items-start justify-center overflow-hidden">
        <img
          src={product.imageUrl[0]} 
          alt={product.title || "product image"}
          className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <p className="text-sm font-bold text-gray-900">{product.brand}</p>
        <h3 className="text-base font-semibold text-gray-800 mt-1 line-clamp-2">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <p className="text-lg font-bold text-gray-900">
            ₹{product.discountedPrice}
          </p>
          <p className="text-sm text-gray-400 line-through">₹{product.price}</p>
          <p className="text-sm font-semibold text-green-600">
            {product.discountPercent}% OFF
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
