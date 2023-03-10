import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Order from "./pages/order/order";
import Home from "./pages/home";
import Info from "./pages/order/info";
import { useEffect } from "react";
import LoginWn from "./componenets/glob/loginWn";
import User from "./pages/user";
import AcountWn from "./componenets/glob/acountWn";
import DarkBG from "./componenets/glob/darkBG";
import { useAppDispatch } from "./redux/app/hooks";
import { setAccountWn, setLoginWn } from "./redux/app/features/inputs/inputSlice";
import UserInfo from "./pages/user/userInfo";
import SuccessMassage from "./componenets/glob/successMassage";
import UserAddress from "./pages/user/userAddress";
import UserWallet from "./pages/user/userWallet";
import UserOrders from "./pages/user/userOrders";
import UserSetting from "./pages/user/userSetting";
import Checkout from "./pages/order/checkout";

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
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="user" element={<User />}>
            <Route path="info" element={<UserInfo />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="wallet" element={<UserWallet />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="setting" element={<UserSetting />} />
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
