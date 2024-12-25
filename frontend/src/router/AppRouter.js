// src/router/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";

import Dashboard from "../pages/Account/Dashboard/Dashboard";
import Login from "../pages/Account/Login/Login";
import Orders from "../pages/Account/Orders/Orders";
import Register from "../pages/Account/Register/Register";
import Settings from "../pages/Account/Settings/Settings";
import Wishlist from "../pages/Account/Wishlist/Wishlist";

import AdminDashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminOrders from "../pages/Admin/Orders/Orders";
import AdminProducts from "../pages/Admin/Products/Products";
import AdminReports from "../pages/Admin/Reports/Reports";
import AdminUsers from "../pages/Admin/Users/Users";

import Home from "../pages/Home/Home";

import PrivacyPolicy from "../pages/Legal/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/Legal/TermsAndConditions/TermsAndConditions";

import OrderConfirmation from "../pages/Order/Confirmation/Confirmation";
import OrderDetail from "../pages/Order/Detail/Detail";
import OrderProcessing from "../pages/Order/Processing/Processing";
import OrderTrack from "../pages/Order/Track/Track";

import Cart from "../pages/Payment/Cart/Cart";
import Checkout from "../pages/Payment/Checkout/Checkout";

import Category from "../pages/Shop/Categories/Detail/Category";
import Categories from "../pages/Shop/Categories/List/Categories";
import Products from "../pages/Shop/Products/List/Products";
import Product from "../pages/Shop/Products/Detail/Product";

import About from "../pages/Support/About/About";
import Contact from "../pages/Support/Contact/Contact";
import Faq from "../pages/Support/Faq/Faq";
import Help from "../pages/Support/Help/Help";
import Search from "../pages/Support/Search/Search";

import redirects from "./Redirects";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>

          <Route path="/account/dashboard" element={<Dashboard />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/account/wishlist" element={<Wishlist />} />

          <Route path="/admin/Dashboard" element={<AdminDashboard />} />
          <Route path="/admin/Orders" element={<AdminOrders />} />
          <Route path="/admin/Products" element={<AdminProducts />} />
          <Route path="/admin/Reports" element={<AdminReports />} />
          <Route path="/admin/Users" element={<AdminUsers />} />

          <Route path="/" element={<Home />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

          <Route path="/order/confirmation" element={<OrderConfirmation />} />
          <Route path="/order/detail" element={<OrderDetail />} />
          <Route path="/order/processing" element={<OrderProcessing />} />
          <Route path="/order/track" element={<OrderTrack />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product" element={<Product />} />
          

          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/frequently-asked-questions" element={<Faq/>} />
          <Route path="/help" element={<Help />} />
          <Route path="/search" element={<Search />} />



          {redirects.map(({ from, to }, index) => (<Route key={index} path={from} element={<Navigate to={to} replace />}/>))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
