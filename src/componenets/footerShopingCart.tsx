import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { setCartStatus } from "../redux/app/features/shopingCart/cartSlice";

type Props = {};

export default function FooterShopingCart({}: Props) {
  const dispatch = useAppDispatch();
  const allOrders = useAppSelector((state) => state.cart.orders);
  const priceReduction = 1 - useAppSelector(state=>state.inp.priceReduction)
  const openCart: boolean = useAppSelector(state=>state.cart.cartOpen)
  const numberOfOrders = allOrders.reduce((total, value) => {
    return total + value.count;
  }, 0);
  const totalvalue = allOrders.reduce((total, value) => {
    return total + value.count * value.price;
  }, 0);
  const PriceAfterReduction = totalvalue * priceReduction
  if (numberOfOrders > 0) {
    return (
      <div
        className={`flex justify-between items-center fixed w-full  ${openCart?"-bottom-20":"bottom-0"} transition-all duration-300 bg-red-600 text-white  p-2 px-4 z-20 lg:hidden `}
        onClick={() => dispatch(setCartStatus(true))}
      >
        <div className="flex items-center gap-x-2">
          <FontAwesomeIcon className="text-2xl" icon={solid("cart-plus")} />
          <h2 className="text-2xl pb-2">سبد خرید({numberOfOrders})</h2>
        </div>
        <h3 className="bg-black bg-opacity-40 px-4 py-2 rounded-full">
          {PriceAfterReduction + " " + "تومان"}
        </h3>
      </div>
    );
  }
  return null;
}
