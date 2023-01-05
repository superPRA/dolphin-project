import React from "react";
import Nav from "../componenets/glob/nav";
import { useAppSelector } from "../redux/app/hooks";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import UserNavBar from "../componenets/user/userNavBar";
import Footer from "../componenets/ordering/footer";
import AddAddressMap from "../componenets/glob/addAddressMap";
import DarkBG from "../componenets/glob/darkBG";

type Props = {};

export default function User({}: Props) {
  const user = useAppSelector((state) => state.inp.users).find(
    (item) => item.isActive === true
  );
  const navigate = useNavigate();
  if (typeof user !== "undefined") {
    return (
      <>
        <Nav />
        <div className="bg-[url('https://static.delino.com/exclusive/img/bg-cover.png')] w-full h-48">
          <div className="bg-neutral-700 py-3 bg-opacity-70 w-full h-full">
            <h1 className="text-center text-white text-3xl pt-5">
              {user?.name}
            </h1>
            <div className="bg-black bg-opacity-10 text-center text-sm w-fit mx-auto py-2 px-3 mt-3 border border-neutral-400 rounded-full text-white">
              کیف پول:0 تومان
            </div>
            <UserNavBar />
          </div>
        </div>
        <div className="min-h-[80vh]">
          <Outlet />
        </div>
        <Footer />
      </>
    );
  } else {
    navigate("/");
  }
  return <h1 className="text-center mt-40 text-3xl">کاربری یافت نشد</h1>;
}
