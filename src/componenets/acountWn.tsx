import React, { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { logOut, setAccountWn } from "../redux/app/features/inputs/inputSlice";

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
  const [css, setCss] = useState("scale-150 opacity-0 hidden");
  const links: links = [
    {
      title: "اطلاعات من",
      icon: <FontAwesomeIcon icon={solid("exclamation")} />,
      link: "",
    },
    {
      title: "ادرس ها",
      icon: <FontAwesomeIcon icon={solid("map-location")} />,
      link: "",
    },
    {
      title: "کیف پول",
      icon: <FontAwesomeIcon icon={solid("wallet")} />,
      link: "",
    },
    {
      title: "سفارشات من",
      icon: <FontAwesomeIcon icon={solid("sheet-plastic")} />,
      link: "",
    },
    {
      title: "تغییر رمز",
      icon: <FontAwesomeIcon icon={solid("gear")} />,
      link: "",
    },
  ];
  useEffect(() => {
    if (accountWn) {
      setCss("scale-150 opacity-30 block");
      setTimeout(() => {
        setCss("scale-100 opacity-100 block");
      }, 10);
    } else {
      setCss("scale-50 opacity-0 block");
      setTimeout(() => {
        setCss("scale-150 opacity-0 hidden");
      }, 300);
    }
  }, [accountWn]);
  return (
    <div
      className={`w-60 ${css} transition-all duration-300 z-50 top-20 bg-white absolute left-20`}
    >
      <header className="bg-[url('https://static.delino.com/exclusive/img/bg-cover.png')] text-white w-full ">
        <div className="px-4 font-semibold bg-gray-400 py-3 bg-opacity-40">
          <div className="flex justify-between items-center  ">
            <h2 className="">{user?.name}</h2>
            <button onClick={() => dispatch(setAccountWn(false))}>
              <FontAwesomeIcon icon={solid("x")} />
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
              to={link}
              className="flex justify-between items-center  py-2 hover:text-red-600 transition-colors"
            >
              <h2>{title}</h2>
              {icon}
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
