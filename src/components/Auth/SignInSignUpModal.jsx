import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function SignInSignUpModal({ open, handleClose }) {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleSwitchToRegister = () => {
    navigate("/register"); 
  };

  const handleSwitchToLogin = () => {
    navigate("/login"); 
  };
  const isLogin = location.pathname === "/login";

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white w-full max-w-sm rounded-xl shadow-xl relative">
          <button
            className="absolute right-3 top-3 text-gray-600"
            onClick={handleClose}
          >
            <XMarkIcon className="w-6 h-6 cursor-pointer" />
          </button>
          {isLogin ? (
            <Login switchToRegister={handleSwitchToRegister} />
          ) : (
            <Register switchToLogin={handleSwitchToLogin} />
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
