import React, { useEffect } from "react";
import { FaBoxOpen, FaShoppingBag, FaUsers, FaRupeeSign } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../state/Admin/Order/Action";
import { findProducts } from "../../state/Product/Action";
import { getAllUsers } from "../../state/Auth/Action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.adminOrder);
  const { product } = useSelector((store) => store);
  const { users, jwt } = useSelector((state) => state.auth);

  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 1,
      pageSize: 200,
      stock: "",
    };
    dispatch(findProducts(data));
    dispatch(getAllOrder());

    if (jwt) dispatch(getAllUsers(jwt));
  }, [dispatch, jwt]);
  const totalOrders = orders?.length || 0;
  const totalRevenue =
    orders?.reduce((acc, o) => acc + (o.totalDiscountedPrice || 0), 0) || 0;
  const totalCustomers = users?.length || 0;
  const totalProducts = product?.products?.content?.length || 0;

  const salesData = [];

  if (orders?.length) {
    const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
    months.forEach((m, idx) => {
      const monthOrders = orders.filter(
        (o) => new Date(o.createdAt).getMonth() === idx
      );

      const monthSales = monthOrders.length
        ? monthOrders.reduce((sum, o) => sum + o.amount, 0)
        : Math.floor(Math.random() * 500000) + 100000;

      salesData.push({ month: m, sales: monthSales });
    });
  } else {
    const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
    months.forEach((m) => {
      const dummySales = Math.floor(Math.random() * 500000) + 100000;
      salesData.push({ month: m, sales: dummySales });
    });
  }

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentProducts = [...(product?.products?.content || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<FaShoppingBag />}
          color="from-pink-500 to-red-400"
        />
        <StatCard
          title="Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={<FaRupeeSign />}
          color="from-green-500 to-emerald-400"
        />
        <StatCard
          title="Customers"
          value={totalCustomers}
          icon={<FaUsers />}
          color="from-blue-500 to-indigo-400"
        />
        <StatCard
          title="Products"
          value={totalProducts}
          icon={<FaBoxOpen />}
          color="from-purple-500 to-violet-400"
        />
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="col-span-2 bg-white/70 shadow-xl rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={480}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#6b6b6bff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Added Products */}
        <div className="bg-white/70 shadow-xl rounded-2xl p-6 backdrop-blur-md w-82 lg:w-auto">
          <h2 className="text-xl font-semibold mb-4">
            Recently Added Products
          </h2>
          <div className="space-y-4">
            {recentProducts.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition"
              >
                <img
                  src={p.imageUrl?.[0] || "/placeholder.png"}
                  alt={p.title}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-md font-semibold">{p.title}</h3>
                  <p className="text-gray-600">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white/70 shadow-xl rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left border-separate p-5 border-spacing-y-2 border border-gray-300">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o, i) => (
              <tr
                key={i}
                className="shadow-md hover:bg-gray-100 transition"
              >
                <td className="py-3 px-3">{o._id}</td>
                <td>
                  {o.user?.firstName} {o.user?.lastName}
                </td>
                <td>₹{o.totalDiscountedPrice}</td>
                <td>
                  <span
                    className={`text-sm font-medium ${
                      o.orderStatus === "DELIVERED"
                        ? " text-green-700"
                        : o.orderStatus === "PENDING"
                        ? " text-yellow-700"
                        : o.orderStatus === "CANCELLED"
                        ? " text-red-700"
                        : " text-blue-700"
                    }`}
                  >
                    {o.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r ${color} flex items-center justify-between`}
  >
    <div>
      <p className="text-sm opacity-80">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    <div className="text-4xl opacity-70">{icon}</div>
  </div>
);

export default Dashboard;
