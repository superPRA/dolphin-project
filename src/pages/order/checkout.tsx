import React from "react";
import { useAppSelector } from "../../redux/app/hooks";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Checkout({}: Props) {
  const isCartEmpty = useAppSelector((state) => state.cart.orders).every(
    (item) => item.count === 0
  );
  const navigate = useNavigate();
  if (isCartEmpty) {
    navigate("/order");
  }
  return (
    <div className="lg:col-span-8 col-span-12 lg:mr-20 mt-8">
      <div className="border-[1px] border-gray-300 bg-white">
        checkout
      </div>
    </div>
  );
}
