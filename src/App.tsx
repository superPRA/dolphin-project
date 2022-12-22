import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Order from "./pages/order/order";
import Home from "./pages/home";
import Info from "./pages/order/info";
import { useState, useEffect } from "react";
import ShopingCart from "./componenets/ordering/shopingCart";
import LoginWn from "./componenets/glob/loginWn";
import User from "./pages/user";
import AcountWn from "./componenets/glob/acountWn";
import DarkBG from "./componenets/glob/darkBG";
import { useAppDispatch } from "./redux/app/hooks";
import { setAccountWn, setLoginWn } from "./redux/app/features/inputs/inputSlice";
import UserInfo from "./pages/user/userInfo";
import SuccessMassage from "./componenets/glob/successMassage";
import UserAddress from "./pages/user/userAddress";

function App() {
  const location = useLocation() 
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(setLoginWn(false))
    dispatch(setAccountWn(false))
  },[location])
  return (
    <div className="rtl">
      <Routes>
        <Route path="/" element={<Navigate to="/order" />} />
        <Route path="order" element={<Home />}>
          <Route path="" element={<Order />} />
          <Route path="info" element={<Info />} />
        </Route>
        <Route path="user" element={<User />}>
            <Route path="info" element={<UserInfo />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="wallet" element={<h1>wallet</h1>} />
            <Route path="orders" element={<h1>orders</h1>} />
            <Route path="setting" element={<h1>setting</h1>} />
        </Route>
        <Route path="/adminPanel" element={<h1>admin panel</h1>} />
      </Routes>
      <AcountWn />
      <LoginWn />
      <SuccessMassage />
      <DarkBG />
    </div>
  );
}

export default App;
