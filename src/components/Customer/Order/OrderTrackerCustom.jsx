import React from "react";

const OrderTrackerCustom = ({ status }) => {
  const steps = ["PLACED", "CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

  const activeIndex = steps.indexOf(status);

  const isDelivered = status === "DELIVERED";
  const isCancelled = status === "CANCELLED";

  return (
    <div className="flex flex-col gap-4 p-4">
      {steps.slice(0, isCancelled ? 6 : isDelivered ? 5 : 5).map((step, idx) => {
        const isActive = idx <= activeIndex;

        return (
          <div key={idx} className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold 
            ${isDelivered ? "bg-green-500" : isCancelled ? "bg-red-500" : isActive ? "bg-blue-500" : "bg-gray-300"}`}
            >
              {idx + 1}
            </div>
            <p
              className={`text-sm font-medium 
            ${isDelivered ? "text-green-600" : isCancelled ? "text-red-600" : isActive ? "text-blue-600" : "text-gray-500"}`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTrackerCustom;
