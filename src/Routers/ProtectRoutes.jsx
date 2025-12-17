import { Navigate } from "react-router-dom";

export  function AdminRoute({ children }) {
  return localStorage.getItem("role") === "ADMIN"
    ? children
    : <Navigate to="/not-authorized" />;
}
export function UserRoute({ children }) {
  return localStorage.getItem("role") === "CUSTOMER"
    ? children
    : <Navigate to="/login" />;
}
