import React, { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { Link } from "react-router-dom";
import {
  logOut,
  setAccountWn,
} from "../../redux/app/features/inputs/inputSlice";
import Icons from "./Icons";
import uuid from "react-uuid";

type Props = {};
type links = {
  title: string;
  icon: ReactElement;
  link: string;
}[];

export default function AcountWn({}: Props) {
  const { accountWn, users } = useAppSelector((state) => state.inp);
  const dispatch = useAppDispatch();

  const user = users.find((item) => item.isActive === true);
  const [css, setCss] = useState("md:scale-150 md:opacity-0 hidden");
  const links: links = [
    {
      title: "اطلاعات من",
      icon: <Icons name="infoCircle" />,
      link: "/user/info",
    },
    {
      title: "ادرس ها",
      icon: <Icons name="location" />,
      link: "/user/address",
    },
    {
      title: "کیف پول",
      icon: <Icons name="wallet" />,
      link: "/user/wallet",
    },
    {
      title: "سفارشات من",
      icon: <Icons name="order" />,
      link: "/user/orders",
    },
    {
      title: "تغییر رمز",
      icon: <Icons name="setting" />,
      link: "/user/setting",
    },
  ];
  useEffect(() => {
    if (accountWn) {
      setCss("md:scale-150 md:opacity-30 block");
      setTimeout(() => {
        setCss("md:scale-100 md:opacity-100 block");
      }, 10);
    } else {
      setCss("md:scale-50 md:opacity-0 block");
      setTimeout(() => {
        setCss("md:scale-150 md:opacity-0 hidden");
      }, 300);
    }
  }, [accountWn]);
  return (
    <div
      className={`w-60 ${css} transition-all h-full md:h-auto duration-300 z-50 top-0 md:top-20 bg-white absolute left-0 md:left-20`}
    >
      <header className="bg-[url('https://static.delino.com/exclusive/img/bg-cover.png')] text-white w-full ">
        <div className="px-4 font-semibold bg-neutral-700 py-3 bg-opacity-70">
          <div className="flex justify-between items-center  ">
            <h2 className="">{user?.name}</h2>
            <button onClick={() => dispatch(setAccountWn(false))}>
              <Icons name="close" />
            </button>
          </div>
          <h2 className="mt-1"> کیف پول: {0} تومان </h2>
        </div>
      </header>
      <main className="mx-6 py-2 border-b">
        {links.map((item) => {
          const { title, icon, link } = item;
          return (
            <Link
              key={uuid()}
              to={link}
              className="flex justify-between items-center  py-2 hover:text-red-600 transition-colors"
            >
              <h2>{title}</h2>
              <i className="text-2xl">{icon}</i>
            </Link>
          );
        })}
      </main>
      <footer className="px-6 py-3 text-red-600">
        <button
          onClick={() => {
            dispatch(logOut());
            dispatch(setAccountWn(false));
          }}
        >
          خروج
        </button>
      </footer>
    </div>
  );
}
