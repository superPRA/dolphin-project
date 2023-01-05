import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  deleteAddress,
  setAddressMapStatus,
} from "../../redux/app/features/inputs/inputSlice";
import DarkBG from "../../componenets/glob/darkBG";
import AddAddressMap from "../../componenets/glob/addAddressMap";
import Icons from "../../componenets/glob/Icons";
import uuid from "react-uuid"

type Props = {};

export default function UserAddress({}: Props) {
  const user = useAppSelector((state) =>
    state.inp.users.find((item) => item.isActive === true)
  );
  const dispatch = useAppDispatch();
  return (
    <div className="mx-auto w-[600px]">
      <h1 className="text-center pt-12 text-3xl font-semibold">
        لیست آدرس های من
      </h1>
      <div className="mt-12">
        {user?.address.length === 0 && (
          <div className="text-center text-neutral-600">
            <h2>آدرسی ثبت نشده است.</h2>
          </div>
        )}
        {user?.address &&
          user.address.length > 0 &&
          user.address.map((item) => {
            const { address, addressTitle, city, homeNumber, lat, lng, id } =
              item;
            return (
              <div
                className="flex justify-between items-center my-4 pl-2 group"
                key={uuid()}
              >
                <div className="flex">
                  <div className="mx-3 flex items-center justify-center text-xl">
                    <Icons name="location" />
                  </div>

                  <div>
                    <div className="flex items-center">
                      <span className="font-bold">{addressTitle}</span>
                      <span className="mx-2 px-2  border-r border-black text-sm">
                        {address}
                      </span>
                    </div>
                    <div>تلفن:{homeNumber}</div>
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <button className="hidden group-hover:block border border-gray-400 hover:border-red-600 rounded px-3 py-1 hover:bg-red-600 hover:text-white transition-all">
                    <Icons name="pen" />
                  </button>
                  <button
                    className="hidden group-hover:block border border-red-600 rounded px-3 py-1 hover:bg-red-600 hover:text-white transition-all"
                    onClick={() => {
                      dispatch(deleteAddress(id));
                    }}
                  >
                    <Icons name="trash" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => dispatch(setAddressMapStatus(true))}
        className="border-red-600 border rounded px-5 py-2 block mx-auto mt-12 hover:bg-red-600 hover:text-white transition-all"
      >
        افزودن ادرس
      </button>
      <AddAddressMap  />
      <DarkBG />
    </div>
  );
}
