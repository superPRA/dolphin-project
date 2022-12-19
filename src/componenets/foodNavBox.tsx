import React from "react";

type Props = { img: string; title: string; link: string };

export default function FoodNavBox({ img, title, link }: Props) {
  return (
    <div>
      <a className="my-4 w-20 block" href={"#"+link}>
        <img className="w-10 h-10 mx-auto" src={img} />
        <h3 className="whitespace-nowrap text-clip overflow-hidden mt-2 text-gray-500 text-center">
          {title}
        </h3>
      </a>
    </div>
  );
}
