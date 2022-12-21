import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  orderHandleMinus,
  orderHandlePlus,
} from "../../redux/app/features/shopingCart/cartSlice";

type Props = {
  img: string;
  ingridient: string;
  priceText: string;
  price: number;
  type: string;
  title: string;
  count: number;
  exist: boolean;
};

export default function FoodBox({
  img,
  ingridient,
  priceText,
  price,
  type,
  title,
  count,
  exist,
}: Props) {
  if (img === "") {
    img = "https://www.delino.com/img/general/food-default.jpg";
  }
  const dispatch = useAppDispatch();
  return (
    <div
      className={`bk1:col-span-4 bk2:col-span-6 col-span-12 border border-gray-300 ${
        count > 0 && "border-red-600"
      } `}
      onClick={(e) =>{ exist && dispatch(orderHandlePlus(title))}}
    >
      <div
        className="relative"
        
      >
        <img src={img} className="w-full" alt="" />
        <div className="bg-white hover:opacity-80 duration-300 w-full h-full absolute top-0 opacity-0 flex justify-center items-center group">
          <h2 className="relative top-3 group-hover:top-0 transition-all duration-700 select-none px-10">
            {ingridient}
          </h2>
        </div>
      </div>
      <div className="bg-white border-t border-gray-300 px-2">
        <div
          
          className="flex justify-between items-center pt-2"
        >
          <h2 onClick={() => dispatch(orderHandlePlus(title))}>{title}</h2>
          {!exist && (
            <h2 className="text-red-600 text-[12px] font-semibold">
              موجود نیست
            </h2>
          )}
        </div>

        <div className="flex justify-between my-2">
          <h3>{priceText}</h3>
          <div className="flex gap-x-2 items-center">
            {count > 0 && (
              <button
                className={`border border-red-600 rounded-full text-xl h-8 w-8 hover:bg-red-600 hover:text-white transition-all duration-300 font-extrabold ${
                  count > 0 && "bg-red-600 text-white"
                }`}
                onClick={(e) =>{ dispatch(orderHandleMinus(title));e.stopPropagation()}}
                style={{ fontFamily: "initial" }}
              >
                <div>-</div>
              </button>
            )}
            {count > 0 && <h4>{count}</h4>}
            <button
              className={`border border-red-600 rounded-full text-xl h-8 w-8 hover:bg-red-600 hover:text-white transition-all duration-300 font-extrabold disabled:border-gray-300 disabled:hover:bg-gray-300 ${
                count > 0 && "bg-red-600 text-white"
              }`}
              style={{ fontFamily: "initial" }}
              onClick={(e) =>{ exist && dispatch(orderHandlePlus(title)); e.stopPropagation()}}
              disabled={!exist}
            >
              <div>+</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
