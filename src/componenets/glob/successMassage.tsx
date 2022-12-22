import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/app/hooks";

type Props = {};

export default function SuccessMassage({}: Props) {
  const [css, setCss] = useState("md:scale-150 md:opacity-0 hidden");
  const status = useAppSelector((state) => state.inp.successMassageStatus);
  useEffect(() => {
    if (status) {
      setCss("md:scale-150 md:opacity-30 block");
      setTimeout(() => {
        setCss("md:scale-100 md:opacity-100 block");
      }, 10);
    } else {
      setCss("md:scale-50 md:opacity-0 block");
      setTimeout(() => {
        setCss("md:scale-150 md:opacity-0 hidden");
      }, 300);
    }
  }, [status]);
  return (
    <div
      className={`bg-white ${css} transition-all duration-300 h-32 w-[22rem] fixed left-[calc(50%-11rem)] top-[calc(50%-4rem)] text-center z-50 pt-3`}
    >
      <FontAwesomeIcon icon={solid("user")} className="text-5xl text-red-600" />
      <h1 className="mt-4 text-xl">پروفایل شما با موفقیت به روز شد</h1>
    </div>
  );
}
