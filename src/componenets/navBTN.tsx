import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { setLoginWn } from "../redux/app/features/inputs/inputSlice";

type Props = {};

export default function NavBTN({}: Props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state=>state.inp.users)
  const user = users.find(item=>item.isActive)
  return (
    <button
      className="border border-red-600 py-3 px-5 rounded-md hover:bg-red-600 hover:text-white transition text-sm"
      onClick={() => {
        if(!user){
            dispatch(setLoginWn(true));
        }
        
      }}
    >
     {!!user?.name || "عضویت / ورود"}
     {!!user?.name && user.name}
    </button>
  );
}
