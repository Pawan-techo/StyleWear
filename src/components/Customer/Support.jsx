import React from "react";
import { HelpCircle, Truck, RotateCcw, Phone, Package } from "lucide-react";

const supportItems = [
  {
    title: "FAQs",
    description: "Find answers to the most common questions",
    icon: <HelpCircle className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Shipping & Delivery",
    description: "Learn about delivery timelines and shipping charges",
    icon: <Truck className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Returns & Refunds",
    description: "Easy returns and quick refunds policy",
    icon: <RotateCcw className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Track Your Order",
    description: "Check your order status anytime",
    icon: <Package className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Contact Support",
    description: "We’re here to help you 24/7",
    icon: <Phone className="w-8 h-8 text-indigo-600" />,
  },
];

const Support = () => {
  return (
    <div className="px-4 lg:px-20 py-12 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          StyleWear Support Center
        </h1>
        <p className="text-gray-600 mt-2">
          Need help? We’re always here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="mb-4">{item.icon}</div>
            <h2 className="text-lg font-semibold text-gray-900">
              {item.title}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-16 bg-white rounded-xl p-8 shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Still need help?
        </h2>
        <p className="text-gray-600 mb-4">
          Reach out to our customer support team anytime.
        </p>
        <p className="text-gray-800">
          📧 Email: <span className="font-medium">support@stylewear.com</span>
        </p>
        <p className="text-gray-800">
          📞 Phone: <span className="font-medium">+91 88888 99999</span>
        </p>
      </div>
    </div>
  );
};

export default Support;
