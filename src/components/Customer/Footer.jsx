import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-2">
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">Sarees</li>
            <li className="hover:text-white transition">Lehenga Choli</li>
            <li className="hover:text-white transition">Salwar Kameez</li>
            <li className="hover:text-white transition">Gowns</li>
            <li className="hover:text-white transition">Dresses</li>
            <li className="hover:text-white transition">Kurtis</li>
            <li className="hover:text-white transition">Co-Ords Set</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">About Us</li>
            <li className="hover:text-white transition">Return & Exchange Policy</li>
            <li className="hover:text-white transition">Shipping & Delivery</li>
            <li className="hover:text-white transition">Terms and Conditions</li>
            <li className="hover:text-white transition">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">Blog</li>
            <li className="hover:text-white transition">Contact Us</li>
            <li className="hover:text-white transition">My Account</li>
            <li className="hover:text-white transition">Size Guide</li>
            <li className="hover:text-white transition">FAQ</li>
            <li className="hover:text-white transition"><a href="/admin">Admin</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Stay Connected</h3>
          <p className="text-sm mb-3">
            Subscribe to get updates on sales, new collections, and offers.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-[40px] px-3 py-2 rounded-l-lg focus:outline-none text-gray-800 bg-white"
            />
            <button className="h-[40px] bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg text-white text-sm font-semibold transition">
              Subscribe
            </button>
          </div>
                    
        <div className="mt-3">
           <div className="flex space-x-3">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            >
              <FaLinkedinIn />
            </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StyleWear. All rights reserved. | Designed by Pawan Bhuyar
      </div>
    </footer>
  );
};

export default Footer;
