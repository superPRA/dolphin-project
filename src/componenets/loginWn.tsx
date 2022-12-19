import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { activateUser, addUser, setLoginWn } from "../redux/app/features/inputs/inputSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useFormik } from "formik";
import * as Yup from "yup";

interface initVal {
  phoneNumber: string;
  passSet1: string,
  passSet2: string,
  passWord: string,
  name: string
}

const initialValues: initVal = {
  phoneNumber: "",
  passSet1:"",
  passSet2:"",
  passWord: "",
  name:""
};

export default function LoginWn() {
  const [page, setPage] = useState("PN");
  const dispatch = useAppDispatch();
  const loginWnStatus = useAppSelector((state) => state.inp.loginWn);
  const users = useAppSelector((state) => state.inp.users);
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      phoneNumber: Yup.number(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    if (!loginWnStatus) {
      formik.values.phoneNumber = "";
      formik.values.passSet1 = "";
      formik.values.passSet2 = ""
      formik.errors.passWord = ""
      formik.errors.passSet1 = ""
      formik.errors.passSet2 = ""
      formik.errors.passWord = ""
      formik.errors.phoneNumber =""
      setPage("PN");
    }
  }, [loginWnStatus]);
  function PNclickHandle() {
    const user = users.find((item) => formik.values.phoneNumber === item.phone);
    if (!user) {
      setPage("PSS");
    }
  }
  function PSSclickHandle(){
    if(formik.values.passSet1 === formik.values.passSet2){
      formik.errors.passSet2 = ""
      setPage("NM")
    } else {
      formik.errors.passSet2 = "two pass are not the same"
    }
    
  }
  function NMclickHandle(){
    const $ = formik.values
    dispatch(addUser({
      name: $.name,
      pass: $.passSet1,
      phone: $.phoneNumber
    }))
    dispatch(activateUser({pass: $.passSet1, phone: $.phoneNumber}))
    dispatch(setLoginWn(false))
  }
  return (
    <div
      className={`fixed duration-300 ${
        loginWnStatus ? "z-50 bg-opacity-50" : "-z-50 bg-opacity-0"
      } transition-colors bg-black  top-0 left-0 h-screen w-full`}
      onClick={() => {
        dispatch(setLoginWn(false));
      }}
    >
      <div
        className={`absolute left-[calc(50%-12.5rem)] ${
          loginWnStatus ? "scale-100 opacity-100" : "scale-150 opacity-0"
        } z-50 top-[calc(50%-12.5rem)] bg-white w-[25rem] transition-all duration-300 h-[25rem]  border`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-end border-b p-3 text-xl">
          <button onClick={() => dispatch(setLoginWn(false))}>
            <FontAwesomeIcon icon={solid("x")} />
          </button>
        </header>
        {page === "PN" && (
          <main className="px-12">
            <h4 className="text-center mt-6 text-sm">
              برای ورود یا عضویت شماره تلفن خود را ورد کنید
            </h4>
            <form className="relative">
              <input
                type="text"
                id="PN"
                className={`text-center outline-none border-b w-full mt-20 peer p-1 text-lg`}
                {...formik.getFieldProps("phoneNumber")}
              />
              <label
                htmlFor="PN"
                className={`absolute  transition-all ${
                  formik.values.phoneNumber ? "top-11" : "top-20"
                } text-gray-400 peer-focus:top-12 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center`}
              >
                شماره موبایل
              </label>
              <button
                className="w-full border-black transition-colors text-center hover:bg-red-600 hover:border-red-600 hover:text-white border rounded-md py-3 mt-12"
                type="button"
                onClick={PNclickHandle}
              >
                ادامه
              </button>
            </form>
          </main>
        )}
        {page === "PSS" && (
          <main className="px-12">
            <h4 className="text-center mt-6 text-sm">
              برای ساخت اکانت رمز خود را انتخاب کنید
            </h4>
            <form>
              <div className="mt-8 relative">
                <input
                  type="text"
                  id="PSS1"
                  className={`text-center outline-none border-b w-full peer p-1 text-lg`}
                  {...formik.getFieldProps("passSet1")}
                />
                <label
                  htmlFor="PSS1"
                  className={`absolute  transition-all ${
                    formik.values.passSet1 ? "-top-6" : "top-0"
                  } text-gray-400 peer-focus:-top-7 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center`}
                >
                  رمز عبور
                </label>
              </div>
              <div className="mt-8 relative">
                <input
                  type="text"
                  id="PSS2"
                  className={`text-center outline-none border-b w-full peer p-1 text-lg ${formik.values.passSet1 !== formik.values.passSet2?"border-b-red-600":"border-grey-300"}`}
                  {...formik.getFieldProps("passSet2")}
                />
                <label
                  htmlFor="PSS2"
                  className={`absolute  transition-all ${
                    formik.values.passSet2 ? "-top-6" : "top-0"
                  } text-gray-400 peer-focus:-top-7 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center`}
                >
                  تکرار رمز عبور
                </label>
              </div>

              <button
                className="w-full border-black transition-colors text-center hover:bg-red-600 hover:border-red-600 hover:text-white border rounded-md py-3 mt-12"
                type="button"
                onClick={PSSclickHandle}
              >
                ادامه
              </button>
            </form>
          </main>
        )}
        {
          page === "NM" && (
            <main className="px-12">
            <h4 className="text-center mt-6 text-sm">
              نام خود را وارد کنید
            </h4>
            <form>
              <div className="mt-20 relative">
                <input
                  type="text"
                  id="PSS1"
                  className={`text-center outline-none border-b w-full peer p-1 text-lg`}
                  {...formik.getFieldProps("name")}
                />
                <label
                  htmlFor="PSS1"
                  className={`absolute  transition-all ${
                    formik.values.name ? "-top-6" : "top-0"
                  } text-gray-400 peer-focus:-top-7 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center`}
                >
                  نام
                </label>
              </div>
              <button
                className="w-full border-black transition-colors text-center hover:bg-red-600 hover:border-red-600 hover:text-white border rounded-md py-3 mt-12"
                type="button"
                onClick={NMclickHandle}
              >
                ادامه
              </button>
            </form>
          </main>
          )
        }
      </div>
    </div>
  );
}
