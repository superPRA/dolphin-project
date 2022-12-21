import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { setAccountWn, setLoginWn } from "../../redux/app/features/inputs/inputSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

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
        } else if(user.isActive){
          dispatch(setAccountWn(true))
        }
        
      }}
    >
     {!!user?.name || "عضویت / ورود"}
     {!!user?.name && <span>{user.name}  <FontAwesomeIcon icon={solid("angle-down")} /> </span>}
    </button>
  );
}
