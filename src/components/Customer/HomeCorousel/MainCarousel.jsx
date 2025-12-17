import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { mainCorousalData } from "./MainCorousalData.js";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCorousal = () => {
  const items = mainCorousalData.map((item) => (
    <img className="cursor-pointer aspect-[16/9] md:aspect-[21/9]" src={item.image} alt="" />
  ));

  return (
     <div className="relative w-screen">
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay={true}
        infinite={true}
        autoPlayInterval={2500}
        animationDuration={2000}
      />
      <style>
        {`
          .alice-carousel__prev-btn,
          .alice-carousel__next-btn,
          .alice-carousel__dots {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
};
export default MainCorousal;
