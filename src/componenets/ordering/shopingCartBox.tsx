import React from "react";
import { useAppDispatch } from "../../redux/app/hooks";
import {
  orderHandleMinus,
  orderHandlePlus,
} from "../../redux/app/features/shopingCart/cartSlice";

type Props = { title: string; price: number; count: number };

export default function ShopingCartBox({ title, price, count }: Props) {
  const currency = new Intl.NumberFormat("en-us", {
    currency: "USD",
  });
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between p-2 border-b border-b-gray-300">
      <div>
        <h2 className="my-1">{title}</h2>
        <h2 className="my-1">{currency.format(price)}</h2>
      </div>
      <div className="flex items-center gap-x-2">
        <button
          className="border border-red-600 rounded-full text-xl h-8 w-8 hover:bg-red-600 hover:text-white transition-all duration-300 font-extrabold "
          style={{ fontFamily: "initial" }}
          onClick={() => dispatch(orderHandleMinus(title))}
        >
          <div>-</div>
        </button>
        <div>{count}</div>
        <button
          className="border border-red-600 rounded-full text-xl h-8 w-8 hover:bg-red-600 hover:text-white transition-all duration-300 font-extrabold "
          style={{ fontFamily: "initial" }}
          onClick={() => dispatch(orderHandlePlus(title))}
        >
          <div>+</div>
        </button>
      </div>
    </div>
  );
}
