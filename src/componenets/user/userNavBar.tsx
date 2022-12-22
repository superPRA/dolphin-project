import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

export default function UserNavBar({}: Props) {
  const LinksData = [
    {
      title: "اطلاعات من",
      link: "info",
    },
    {
      title: "ادرس ها",
      link: "address",
    },
    {
      title: "کیف پول",
      link: "wallet",
    },
    {
      title: "سفارشات قبلی",
      link: "orders",
    },
    {
      title: "تغییر رمز عبور",
      link: "setting",
    },
  ];
  return (
    <div className="flex justify-center items-center gap-x-6 mt-8">
      {LinksData.map((item) => {
        const { link, title } = item;
        return (
          <NavLink
          key={link}
            to={link}
            className={({ isActive }) => {
              return isActive
                ? "text-white font-bold"
                : "text-gray-400 font-semibold";
            }}
          >
            {title}
          </NavLink>
        );
      })}
    </div>
  );
}
