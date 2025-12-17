import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCards1 = ({ menFashionPath, womenFashionPath }) => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-10 px-4 sm:px-8 md:px-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide mb-8 sm:mb-10 text-center">
        Trending Fashion
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div
          onClick={() => navigate(womenFashionPath)}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
        >
          <div className="rounded-3xl overflow-hidden">
            <img
              src="https://cdn.shopify.com/s/files/1/0573/5733/6749/files/Blog_post_49_1024x1024.jpg?v=1654752874"
              className="w-full h-[220px] sm:h-[260px] md:h-[340px] lg:h-[380px] object-cover transform hover:scale-105 transition-transform duration-700"
              alt="Women Fashion"
            />
          </div>

          <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-800 py-4 sm:py-5">
            Trending Women Fashion
          </h3>
        </div>
        <div
          onClick={() => navigate(menFashionPath)}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
        >
          <div className="rounded-3xl overflow-hidden">
            <img
              src="https://ciyashop.potenzaglobalsolutions.com/suit/wp-content/uploads/sites/6/2018/03/banner-lising.jpg"
              className="w-full h-[220px] sm:h-[260px] md:h-[340px] lg:h-[380px] object-cover transform hover:scale-105 transition-transform duration-700"
              alt="Men Fashion"
            />
          </div>

          <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-800 py-4 sm:py-5">
            Trending Men Fashion
          </h3>
        </div>

      </div>
    </section>
  );
};

export default HomeSectionCards1;
