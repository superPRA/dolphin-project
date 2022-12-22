import { useFormik } from "formik";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { setSuccessMassage, updateUser } from "../../redux/app/features/inputs/inputSlice";

type Props = {};
interface initVal {
  phoneNumber: string;
  name: string;
  email: string;
  day: string;
  mounth: string;
  year: string;
  gender: string;
}

export default function UserInfo({}: Props) {
  const user = useAppSelector((state) => state.inp.users).find(
    (item) => item.isActive === true
  );
  const dispatch = useAppDispatch();
  const initialValues: initVal = {
    phoneNumber: user?.phone as string,
    name: user?.name as string,
    email: user?.email as string,
    day: user?.birthDay.day as string,
    mounth: user?.birthDay.mounth as string,
    year: user?.birthDay.year as string,
    gender: user?.gender as string,
  };
  const formik = useFormik({
    initialValues,
    validate(values) {
      const error = {}
      return error;
    },
    onSubmit: (values) => {
      dispatch(setSuccessMassage(true))
      setTimeout(()=>{
        dispatch(setSuccessMassage(false))
      },2000)
      dispatch(
        updateUser({
          phoneNumber: values.phoneNumber,
          day: values.day,
          email: values.email,
          gender: values.gender,
          mounth: values.mounth,
          name: values.name,
          year: values.year,
        })
      );
    },
  });
  const year = new Date().getFullYear() - (2022 - 1401);
  const years: number[] = Array.from(
    new Array(100),
    (val, index) => year - index
  ).reverse();

  const mounths: string[] = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "ابان",
    "اذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const days: number[] = Array.from(new Array(31), (val, index) => index + 1);
  return (
    <div>
      <form className="md:w-[32rem] mx-auto md:px-0 px-12" onSubmit={formik.handleSubmit}>
        <div className="md:flex md:justify-center gap-x-10 md:items-center pt-20">
          <div className="w-full relative">
            <input
              className={`border-b ${
                formik.errors.phoneNumber
                  ? "border-b-red-600 text-red-600"
                  : "border-b-gray-400 "
              } outline-none w-full disabled:text-gray-600 p-1`}
              {...formik.getFieldProps("phoneNumber")}
              disabled={true}
            />
            <label
              className={`absolute ${
                formik.values.phoneNumber
                  ? "-top-4 text-gray-600 text-sm"
                  : "-top-1 text-black text-base"
              } right-0 transition-all`}
            >
              شماره موبایل
            </label>
            <div className="text-red-600 p-1">
              {formik.touched.phoneNumber && formik.errors.phoneNumber}
            </div>
          </div>
          <div className="w-full relative md:mt-auto mt-10">
            <input
              className={`border-b ${
                formik.errors.name
                  ? "invalid:border-b-red-600 text-red-600"
                  : "border-b-gray-400"
              } outline-none w-full disabled:text-gray-600 p-1 peer`}
              {...formik.getFieldProps("name")}
            />
            <label
              className={`absolute ${
                formik.values.name
                  ? "-top-4 text-gray-600 text-sm"
                  : "-top-0 text-black text-base"
              } right-0 transition-all peer-focus:-top-6`}
            >
              نام
            </label>
            <div className="text-red-600 p-1">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>
        </div>
        <div className="md:flex md:justify-center gap-x-10 md:items-center md:pt-10 pt-5">
          <div className="w-full relative md:pt-12 pt-8">
            <input
              className={`border-b ${
                formik.errors.email
                  ? "border-b-red-600 text-red-600"
                  : "border-b-gray-400"
              } outline-none w-full disabled:text-gray-600 p-1 peer`}
              {...formik.getFieldProps("email")}
            />
            <label
              className={`absolute ${
                formik.values.email
                  ? "top-2 md:top-6 text-gray-600 text-sm"
                  : "top-8 md:top-12 text-black text-base"
              } right-0 transition-all peer-focus:top-5  `}
            >
              ایمیل
            </label>
            <div className="text-red-600 p-1">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
          <div className="w-full relative mt-5">
            <label>تولد</label>
            <br />
            <div className="grid grid-cols-12 md:flex gap-x-4 mt-3 md:mt-auto">
              <div className="flex justify-between col-span-4 w-full border-b pb-2 border-b-gray-400">
                <select
                  className="appearance-none outline-none w-full"
                  id="day"
                  {...formik.getFieldProps("day")}
                >
                  <option value="روز">روز</option>
                  {days.map((item) => {
                    return (
                      <option value={item.toString()} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="day">
                  <FontAwesomeIcon
                    icon={solid("angle-down")}
                    className="font-thin"
                  />
                </label>
              </div>
              <div className="flex justify-between w-full col-span-4 border-b pb-2 border-b-gray-400">
                <select
                  className="appearance-none outline-none w-full"
                  id="mounth"
                  {...formik.getFieldProps("mounth")}
                >
                  <option value="ماه">ماه</option>
                  {mounths.map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="mounth">
                  <FontAwesomeIcon
                    icon={solid("angle-down")}
                    className="font-thin"
                  />
                </label>
              </div>
              <div className="flex justify-between w-full col-span-4 border-b pb-2 border-b-gray-400">
                <select
                  className="appearance-none outline-none w-full"
                  id="year"
                  {...formik.getFieldProps("year")}
                >
                  <option value="سال">سال</option>
                  {years.reverse().map((item) => {
                    return (
                      <option value={item.toString()} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="year">
                  <FontAwesomeIcon
                    icon={solid("angle-down")}
                    className="font-thin"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-10">
          <label>جنسیت</label>
          <div className="flex justify-start gap-x-4 mt-5">
            <div className="flex">
              <label htmlFor="male">اقا</label>
              <input
                className="peer/male opacity-0"
                type="radio"
                value="male"
                name="gender"
                checked={formik.values.gender === "male"}
                id="male"
                onChange={formik.handleChange}
              />
              <label
                htmlFor="male"
                className=" h-5 w-5 border-2 border-gray-400 rounded-full peer-checked/male:bg-red-600 transition-all duration-300 flex justify-center items-center hover:border-red-600 peer-hover/male:border-red-600 peer-checked/male:border-red-600"
              >
                <FontAwesomeIcon
                  icon={solid("check")}
                  className="text-sm text-white"
                />
              </label>
            </div>
            <div className="flex">
              <label htmlFor="female">خانوم</label>
              <input
                className="peer/female opacity-0"
                type="radio"
                value="female"
                name="gender"
                checked={formik.values.gender === "female"}
                id="female"
                onChange={formik.handleChange}
              />
              <label
                htmlFor="female"
                className=" h-5 w-5 border-2 border-gray-400 rounded-full peer-checked/female:bg-red-600 transition-all duration-300 flex justify-center items-center hover:border-red-600 peer-hover/female:border-red-600 peer-checked/female:border-red-600"
              >
                <FontAwesomeIcon
                  icon={solid("check")}
                  className="text-sm text-white"
                />
              </label>
            </div>
          </div>

          <button
            className="bg-red-600 rounded mt-16 mx-auto block text-white px-6 py-3"
          >
            ذخیره
          </button>
        </div>
      </form>
    </div>
  );
}
