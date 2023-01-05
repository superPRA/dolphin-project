import React from "react";
import { Link } from "react-router-dom";
import link from "../../api/links";
import { useAppDispatch } from "../../redux/app/hooks";
import NavBTN from "../ordering/navBTN";

const { logo } = link;
type Props = {};

export default function Nav({}: Props) {
  const dispatch = useAppDispatch()
  return (
    <div className="flex justify-between items-center px-10 md:px-20 py-2 bg-white">
      <Link to="/" className="h-20 w-20">
        <img src={logo} alt="" />
      </Link>
      <NavBTN />
    </div>
  );
}
