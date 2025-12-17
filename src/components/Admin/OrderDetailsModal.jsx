import { useEffect } from "react";

const OrderDetailsModal = ({ order, close }) => {
  const { shippingAddress, user, orderItems } = order;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
   <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center mb-15">
  <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-gray-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 shadow-sm">
          <h2 className="text-2xl font-bold">Order Receipt</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-32 bg-gray-50 shadow-sm p-4 rounded-xl">
            <Info label="Order ID" value={order._id} />
            <Info label="Order Date" value={new Date(order.createdAt).toLocaleString()} />
            <Info label="Payment" value={order.paymentDetails?.paymentStatus} />
            <Info label="Status" value={order.orderStatus} badge status={order.orderStatus} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Section title="Customer Info">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </Section>

            <Section title="Shipping Address">
              <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
              <p>{shippingAddress.streetAddress}</p>
              <p>{shippingAddress.city}, {shippingAddress.state}</p>
              <p>PIN: {shippingAddress.zipCode}</p>
              <p><strong>Mobile:</strong> {shippingAddress.mobile}</p>
            </Section>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 pb-2">Ordered Items</h3>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center flex-col md:flex-row gap-4 shadow-sm pb-3 last:border-none"
                >
                  <img
                    src={item.product?.imageUrl?.[0]}
                    alt={item.product?.title}
                    className="w-16 h-16 rounded-md ml-5 object-cover object-top border border-gray-200 shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.product?.title}</p>
                    <p className="text-gray-600 text-sm">Size: {item.size} | Qty: {item.quantity}</p>
                    <p className="mt-1 font-semibold text-green-600">₹{item.discountedPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl shadow-sm p-4 space-y-1 mt-4">
            <PriceRow label="Total Price" value={`₹${order.totalPrice}`} />
            <PriceRow label="Discount" value={`- ₹${order.discount}`} />
            <PriceRow label="Final Amount" value={`₹${order.totalDiscountedPrice}`} bold/>
          </div>
        </div>
        <div className="flex justify-end border-t p-4 bg-gray-50">
          <button
            onClick={close}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
const Section = ({ title, children }) => (
  <div className="border rounded-xl p-4 bg-white shadow-sm">
    <h4 className="font-semibold mb-2">{title}</h4>
    {children}
  </div>
);

const Info = ({ label, value, badge, status }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    {!badge ? (
      <p className="font-semibold">{value}</p>
    ) : (
      <span
        className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-semibold ${
          status === "PENDING"
            ? "bg-orange-100 text-orange-600"
            : status === "PLACED"
            ? "bg-yellow-100 text-yellow-600"
            : status === "CONFIRMED"
            ? "bg-blue-100 text-blue-600"
            : status === "SHIPPED"
            ? "bg-purple-100 text-purple-600"
            : status === "DELIVERED"
            ? "bg-green-100 text-green-600"
            : status === "CANCELLED"
            ? "bg-red-100 text-red-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {value}
      </span>
    )}
  </div>
);

const PriceRow = ({ label, value, bold }) => (
  <div className="flex justify-between">
    <p className={bold ? "font-semibold" : "text-gray-600"}>{label}</p>
    <p className={bold ? "font-semibold" : "text-gray-800"}>{value}</p>
  </div>
);

export default OrderDetailsModal;
