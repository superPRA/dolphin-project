import React from "react";
import FoodNav from "../../componenets/ordering/foodNav";
import FilterInput from "../../componenets/ordering/filterInput";
import Foods from "../../componenets/ordering/foods";
import Navbar from "../../componenets/ordering/navbar";

type Props = {};

export default function Order({}: Props) {
  return (
    <div className="lg:col-span-8 col-span-12 lg:mr-20">
      <Navbar />
      <div className="border-[1px] border-gray-300 bg-white">
        <FoodNav />
        <FilterInput />
        <Foods />
      </div>
    </div>
  );
}
