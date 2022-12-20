import React from "react";
import Nav from "../componenets/nav";
import Header from "../componenets/header";
import Navbar from "../componenets/navbar";
import ShopingCart from "../componenets/shopingCart";
import { Outlet } from "react-router-dom";
import FooterShopingCart from "../componenets/footerShopingCart";
import Footer from "../componenets/footer";
import LoginWn from "../componenets/loginWn";
import AcountWn from "../componenets/acountWn";
import DarkBG from "../componenets/darkBG";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className="bg-[rgb(248,248,248)]">
      <Nav />
      <Header />
      <div className="grid grid-cols-12">
        <div className="lg:col-span-8 col-span-12 lg:mr-20">
          <Navbar />
          <div className="border-[1px] border-gray-300 bg-white">
            <Outlet />
          </div>
        </div>
        <div className="lg:col-span-4  lg:ml-10 col-span-12 lg:mr-6 pt-8">
          <ShopingCart />
        </div>
      </div>
      <Footer />
      <FooterShopingCart />
      <AcountWn />
      <LoginWn />
      <DarkBG />
    </div>
  );
}
