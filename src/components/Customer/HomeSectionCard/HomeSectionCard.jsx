import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../state/Product/Action.js";
import { useNavigate } from "react-router-dom";
const HomeSectionCards = ({ sectionName, category }) => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      findProducts({
        category: category,
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 50000,
        minDiscount: 0,
        sort: "price_low",
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, [category]);

  const items = product.products?.content || [];

  return (
    <section
      className="w-screen bg-white py-4 ">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-700 tracking-tight px-6 sm:ml-10">
        {sectionName}
      </h2>
      <div
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-4 sm:px-8 md:px-16 py-2 sm:py-4"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {items?.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate( `/product/${item?._id}`)}
            className="min-w-[170px] w-[200px] sm:max-w-[200px] md:max-w-[240px] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden flex-shrink-0 group relative z-10"
          >
            <div className="relative h-[200px] sm:h-[230px] md:h-[250px] bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={item?.imageUrl[0]}
                alt={item.title}
                className="object-contain h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            <div className="p-2 sm:p-3 flex flex-col justify-between">
              <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1 group-hover:text-gray-700 transition-colors">
                {item.brand}
              </p>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-gray-600 transition-colors line-clamp-1">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeSectionCards;
