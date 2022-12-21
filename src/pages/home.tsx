import React from "react";
import Nav from "../componenets/glob/nav";
import Header from "../componenets/ordering/header";
import Navbar from "../componenets/ordering/navbar";
import ShopingCart from "../componenets/ordering/shopingCart";
import { Outlet } from "react-router-dom";
import FooterShopingCart from "../componenets/ordering/footerShopingCart";
import Footer from "../componenets/ordering/footer";
import LoginWn from "../componenets/glob/loginWn";
import AcountWn from "../componenets/glob/acountWn";
import DarkBG from "../componenets/glob/darkBG";

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
    </div>
  );
}
