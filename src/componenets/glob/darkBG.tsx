import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  setAccountWn,
  setLoginWn,
} from "../../redux/app/features/inputs/inputSlice";
import { setCartStatus } from "../../redux/app/features/shopingCart/cartSlice";

type Props = {};

export default function DarkBG({}: Props) {
  const [css, setCss] = useState("bg-opacity-0 hidden");
  const { accountWn, loginWn } = useAppSelector((state) => state.inp);
  const cartOpen = useAppSelector(state=>state.cart.cartOpen)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (accountWn || loginWn || cartOpen) {
      setCss("bg-opacity-0 block")
      setTimeout(()=>{
        setCss("bg-opacity-50 block")
      },10)
    } else {
        setCss("bg-opacity-0 block")
        setTimeout(()=>{
            setCss("bg-opacity-0 hidden")
        },300)
    }
  }, [accountWn, loginWn, cartOpen]);
  return (
    <div
      className={`fixed top-0 left-0 z-40 w-full h-screen bg-black transition-colors duration-300 ${css} `}
      onClick={() => {
        dispatch(setAccountWn(false));
        dispatch(setLoginWn(false));
        dispatch(setCartStatus(false))
        setTimeout(() => {
          setCss("-z-40");
        }, 300);
      }}
    ></div>
  );
}
