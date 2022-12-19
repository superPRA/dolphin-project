import React, { useRef } from "react";
import list from "../api/lists";
import FoodNavBox from "./foodNavBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

type Props = {};

export default function FoodNav({}: Props) {
  const scrollElement: any = useRef();
  const foodNavElement = list.foodNav.map((item) => {
    const { img, title, link } = item;
    return <FoodNavBox img={img} title={title} link={link} key={title} />;
  });
  return (
    <div className="w-full flex sticky top-0 bg-white z-10 border-b border-b-gray-300">
      <button
        className="w-16  text-4xl hidden md:block"
        onClick={() => {
          scrollElement.current.scrollLeft += 150;
        }}
      >
        <FontAwesomeIcon
          className="text-gray-400"
          icon={solid("caret-right")}
        />
      </button>
      <div
        className="w-full flex justify-start gap-x-8 px-8 items-start md:overflow-hidden overflow-x-scroll  scroll-smooth"
        ref={scrollElement}
      >
        {foodNavElement}
      </div>
      <button
        className="w-16  text-4xl hidden md:block"
        onClick={() => {
          scrollElement.current.scrollLeft -= 150;
        }}
      >
        <FontAwesomeIcon className="text-gray-400" icon={solid("caret-left")} />
      </button>
    </div>
  );
}
