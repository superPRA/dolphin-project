import React from "react";
import link from "../../api/links";

const { header } = link;

type Props = {};

export default function Header({}: Props) {
  const date: Date = new Date();
  const Hour: number = date.getHours();
  return (
    <div
      className="h-80 bg-no-repeat bg-cover bg-center text-center md:text-start"
      style={{ backgroundImage: `url(${header})` }}
    >
      <div className="bg-[rgba(0,0,0,0.6)] h-80 bg-cover px-20 pt-10">
        <h1 className="text-4xl font-semibold text-white">فست فود دلفین</h1>
        <h2 className="text-lg font-semibold text-white mt-2">
          آدرس: سالاریه، نبش میدان میثم
        </h2>
        {23 > Hour && Hour >= 8 && (
          <div className="flex md:justify-start justify-center items-center mt-36 gap-x-2">
            <div className="bg-green-500 border-[4px] border-green-900 h-5 w-5 rounded-full flash"></div>
            <h2 className="text-white">سفارش می‌پذیریم</h2>
          </div>
        )}
        {(Hour >= 23 || Hour < 8) && (
          <div className="mt-32 text-white font-semibold">
            <div className="flex gap-x-2 items-center justify-center md:justify-start">
              <div className="bg-gray-400 h-3 w-3 rounded-full"></div>
              <h2>سفارش نمی پزیریم</h2>
            </div>
            <h2 className="mt-2">پایان سفارش گیری امروز</h2>
          </div>
        )}
      </div>
    </div>
  );
}
