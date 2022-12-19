import React from "react";
import { Link } from "react-router-dom";
import link from "../api/links";
import { useAppDispatch } from "../redux/app/hooks";
import { setLoginWn } from "../redux/app/features/inputs/inputSlice";
import NavBTN from "./navBTN";

const { logo } = link;
type Props = {};

export default function Nav({}: Props) {
  const dispatch = useAppDispatch()
  return (
    <div className="flex justify-between items-center px-20 py-2 bg-white">
      <Link to="/" className="h-20 w-20">
        <img src={logo} alt="" />
      </Link>
      <NavBTN />
    </div>
  );
}
