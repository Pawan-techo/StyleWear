import {Route, Routes} from "react-router-dom";
import Admin from "../components/Admin/Admin";
import Dashboard from "../components/Admin/Dashboard";
import AddProducts from "../components/Admin/AddProducts";
import Orders from "../components/Admin/Orders";
import Customers from "../components/Admin/Customers";
import Products from "../components/Admin/Products";
import Profile from "../components/Auth/Profile"
const AdminRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Admin/>}>
      <Route index element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="product/create" element={<AddProducts />} />
      <Route path="orders" element={<Orders />} />
      <Route path="customers" element={<Customers />} />
      <Route path="account" element={<Profile/>} /> 
  </Route> 
</Routes>

    </div>
  );
};

export default AdminRoutes;