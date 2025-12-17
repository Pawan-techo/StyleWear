import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusCircle,
  FaShoppingBag,
  FaUsers,
  FaUserCircle,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../state/Auth/Action";

function Admin() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
const dispatch = useDispatch();
  return (
    <div className="flex bg-gradient-to-br from-[#faf7f7] via-[#f3e8e8] to-[#f8dede] min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 h-screen left-0 bg-white/30 backdrop-blur-lg shadow-2xl 
        border-r border-white/40 transition-all duration-500 flex flex-col 
        justify-between z-50 ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Scrollable section */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center h-20 border-b border-white/30">
            <img
              onClick={() => navigate("/")}
              src={Logo}
              alt="logo"
              className={`cursor-pointer transition-all duration-300 
              ${isOpen ? "w-20 mt-5" : "w-14 mt-5"}`}
            />
          </div>

          {/* Menu */}
          <div className="mt-6 space-y-1">
            <SidebarItem
              icon={<FaTachometerAlt />}
              label="Dashboard"
              isOpen={isOpen}
              to="/admin"
            />

            <SidebarItem
              icon={<FaBoxOpen />}
              label="Products"
              isOpen={isOpen}
              to="/admin/products"
            />

            <SidebarItem
              icon={<FaPlusCircle />}
              label="Add Product"
              isOpen={isOpen}
              to="/admin/product/create"
            />

            <SidebarItem
              icon={<FaShoppingBag />}
              label="Orders"
              isOpen={isOpen}
              to="/admin/orders"
            />

            <SidebarItem
              icon={<FaUsers />}
              label="Customers"
              isOpen={isOpen}
              to="/admin/customers"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="sticky bottom-0 bg-white/20 border-t border-white/30 flex flex-col items-center py-4 space-y-4">
          <button
            onClick={() => navigate("/admin/account")}
            className={`flex items-center justify-center gap-2 w-[85%] rounded-full px-4 py-2
            bg-white/40 text-black border border-gray-300 shadow-md hover:bg-gray-400 cursor-pointer
            transition-all duration-300 ${!isOpen ? "px-2 py-2 text-sm" : ""}`}
          >
            <FaUserCircle className="text-lg" />
            {isOpen && "Account"}
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem("jwt");
              localStorage.removeItem("role");
              window.location.href = "/"
            }}
            className={`flex items-center justify-center gap-2 w-[85%] rounded-full px-4 py-2 text-white
            bg-gradient-to-r from-black to-gray-700 hover:from-gray-900 hover:to-black shadow-lg 
            transition-all duration-300 cursor-pointer${!isOpen ? "px-2 py-2 text-sm" : ""}`}
          >
            <FaSignOutAlt className="text-lg" />
            {isOpen && "Logout"}
          </button>

          {/* Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black/80 hover:text-black text-lg cursor-pointer transition-transform duration-300 hover:scale-125"
          >
            {isOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-6 md:p-8 transition-all duration-500"
        style={{ marginLeft: isOpen ? "16rem" : "5rem" }}
      >
        <div className="rounded-2xl bg-white/60 backdrop-blur-xl shadow-lg p-6 min-h-screen border border-white/30">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// Sidebar Item Component
const SidebarItem = ({ icon, label, isOpen, to }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group flex items-center gap-4 px-5 py-3 mx-2 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-black to-gray-700 text-white shadow-lg"
            : "text-gray-800 hover:bg-white/40 hover:text-black"
        }`
      }
    >
      <div className="text-lg transition-transform duration-300 group-hover:scale-125">
        {icon}
      </div>
      {isOpen && <span className="font-medium tracking-wide">{label}</span>}
    </NavLink>
  );
};

export default Admin;
