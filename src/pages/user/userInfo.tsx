import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../redux/app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

type Props = {};
interface initVal {
  phoneNumber: string;
  name: string;
  email: string | undefined;
  day: string;
  mounth: string;
  year: string;
  gender: string;
}

export default function UserInfo({}: Props) {
  const user = useAppSelector((state) => state.inp.users).find(
    (item) => item.isActive === true
  );
  const initialValues: initVal = {
    phoneNumber: user?.phone as string,
    name: user?.name as string,
    email: user?.email as string,
    day: "",
    mounth: "",
    year: "",
    gender: ""
  };
  const formik = useFormik({
    initialValues,
    validate(values) {
      const error = {};

      return error;
    },
    onSubmit: (values) => {},
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
  console.log(formik.values.gender);
  return (
    <div>
      <form className="w-[32rem] mx-auto">
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
          <div className="w-full relative">
            <input
              className={`border-b ${
                formik.errors.name
                  ? "border-b-red-600 text-red-600"
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
        <div className="md:flex md:justify-center gap-x-10 md:items-center pt-10">
          <div className="w-full relative pt-8">
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
                  ? "top-2 text-gray-600 text-sm"
                  : "top-8 text-black text-base"
              } right-0 transition-all peer-focus:top-1  `}
            >
              ایمیل
            </label>
            <div className="text-red-600 p-1">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
          <div className="w-full relative">
            <label>تولد</label>
            <br />
            <div className="flex gap-x-4">
              <div className="flex justify-between w-full border-b pb-2 border-b-gray-400">
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
              <div className="flex justify-between w-full border-b pb-2 border-b-gray-400">
                <select
                  className="appearance-none outline-none"
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
              <div className="flex justify-between w-full border-b pb-2 border-b-gray-400">
                <select
                  className="appearance-none outline-none"
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
        <div className="flex justify-start">
          <label htmlFor="male">
            مرد
            <input
              type="radio"
              value="male"
              name="gender"
              id="male"
              onChange={formik.handleChange}
            />
          </label>
          <label htmlFor="female">
            زن
            <input
              type="radio"
              value="female"
              name="gender"
              id="female"
              onChange={formik.handleChange}
            />
          </label>
        </div>
      </form>
    </div>
  );
}
