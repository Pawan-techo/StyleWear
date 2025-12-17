import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You are not authorized to view this page.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
      >
        Go to Homepage
      </button>
    </div>
  );
}
