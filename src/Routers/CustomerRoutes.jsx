import React from 'react';
import {Routes,Route} from "react-router-dom";
import Home from "../pages/Home"
import Cart from "../components/Customer/Cart/Cart"
import Navbar from "../components/Customer/Navigation/Navigation"
import Footer from '../components/Customer/Footer';
import Products from '../components/Customer/Product/Products';
import ProductDetails from "../components/ProductDetails/ProductDetails"
import Checkout from "../components/Customer/Checkout/Checkout"
import OrderDetails from "../components/Customer/Order/OrderDetails"
import ScrollToTop from "../ScrollToTop";
import PaymentSuccess from '../components/Customer/Payment/PaymentSuccess';
import Profile from '../components/Auth/Profile';
import AboutCompany from '../components/Customer/AboutCompany';
import Support from '../components/Customer/Support';
const CustomerRoutes = () => {
  return (
    <div>
      <ScrollToTop/>
    <Navbar/>
     <Routes>
       <Route path='/login' element={<Home/>}></Route>
        <Route path='/register' element={<Home/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/:category/:section/:item' element={<Products/>} ></Route>
        <Route path='/product/:productId' element={<ProductDetails/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/orders/history' element={<OrderDetails/>}></Route>
        <Route path='/payment/:orderId' element={<PaymentSuccess/>}></Route>
        <Route path='/account/profile' element={<Profile/>}></Route>
        <Route path='/company' element={<AboutCompany/>}></Route>
        <Route path='/support' element={<Support/>}></Route>
     </Routes>
      <Footer/>
    </div>
   
  );
};

export default CustomerRoutes;