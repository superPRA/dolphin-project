import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Order from "./pages/order";
import Home from "./pages/home";
import Info from "./pages/info";
import { useState, useEffect } from "react";
import ShopingCart from "./componenets/shopingCart";
import LoginWn from "./componenets/loginWn";

function App() {
  return (
    <div className="rtl">
      <Routes>
        <Route path="/" element={<Navigate to="/order" />} />
        <Route path="order" element={<Home />}>
          <Route path="" element={<Order />} />
          <Route path="info" element={<Info />} />
        </Route>
        <Route path="/adminPanel" element={<h1>admin panel</h1>} />
      </Routes>
    </div>
  );
}

export default App;
