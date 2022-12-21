import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  activateUser,
  addUser,
  setAccountWn,
  setLoginWn,
} from "../../redux/app/features/inputs/inputSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useFormik } from "formik";
import * as Yup from "yup";

interface initVal {
  phoneNumber: string;
  passSet1: string;
  passSet2: string;
  passWord: string;
  name: string;
  isSigning: boolean;
}

const initialValues: initVal = {
  phoneNumber: "",
  passSet1: "",
  passSet2: "",
  passWord: "",
  name: "",
  isSigning: false,
};

export default function LoginWn() {
  const [css, setCss] = useState("scale-150 opacity-0 hidden");
  const [page, setPage] = useState("PN");
  const dispatch = useAppDispatch();
  const loginWnStatus = useAppSelector((state) => state.inp.loginWn);
  const users = useAppSelector((state) => state.inp.users);
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const error: initVal = {
        name: "",
        passSet1: "",
        passSet2: "",
        passWord: "",
        phoneNumber: "",
        isSigning: false,
      };
      if (!values.phoneNumber) {
        error.phoneNumber = "شماره تلفن وارد نشده است";
      } else {
        if (values.phoneNumber.match(/^[0-9]/i)) {
          if (!values.phoneNumber.startsWith("09")) {
            error.phoneNumber = "شماره تلفن صحیح وارد نشده است";
          } else {
            if (values.phoneNumber.length !== 11) {
              error.phoneNumber = "شماره تلفن کامل وارد نشده است";
            }
          }
        } else {
          error.phoneNumber = "از اعداد استفاده کن";
        }
      }

      if (!values.passWord) {
        error.passWord = "رمز عبور وارد نشده است";
      } else {
        if (values.passWord.includes(" ")) {
          error.passWord = "رمز نمیتواند فاصله داشته باشد";
        }
        if (values.passWord.length <= 7) {
          error.passWord = "رمز عبور کوتاه است";
        }
      }

      if (!values.passSet1) {
        error.passSet1 = "رمز عبوری وارد نشده است";
      } else {
        if (values.passSet1.includes(" ")) {
          error.passSet1 = "رمز نمیتواند فاصله داشته باشد";
        }
        if (values.passSet1.length <= 7) {
          error.passSet1 = "رمز عبور کوتاه است";
        }
      }

      if (!values.passSet2) {
        error.passSet2 = "رمز عبوری وارد نشده است";
      } else {
        if (values.passSet2.includes(" ")) {
          error.passSet2 = "رمز نمیتواند فاصله داشته باشد";
        }
        if (values.passSet2.length <= 7) {
          error.passSet2 = "رمز عبور کوتاه است";
        }
      }

      if (values.passSet1 !== values.passSet2) {
        error.passSet2 = "رمز ها باید یکی باششند";
      }

      if (!values.name) {
        error.name = "نامی وجود ندارد";
      } else {
        if (values.name.length > 20) {
          error.name = "اسم شما خیلی طولانی است";
        }
        if (values.name.length < 3) {
          error.name = "اسم شما خیلی کوتاه است";
        }
      }
      return error;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      setSubmitting(false);
    },
  });
  useEffect(() => {
    if (loginWnStatus) {
      setCss("scale-150 opacity-30 block");
      setTimeout(() => {
        setCss("scale-100 opacity-100 block");
      }, 10);
    } else {
      formik.values.phoneNumber = "";
      formik.values.passSet1 = "";
      formik.values.passSet2 = "";
      formik.errors.passWord = "";
      formik.errors.passSet1 = "";
      formik.errors.passSet2 = "";
      formik.errors.passWord = "";
      formik.errors.phoneNumber = "";
      setPage("PN");
      setCss("scale-50 opacity-0 block");
      setTimeout(() => {
        setCss("scale-150 opacity-0 hidden");
      }, 300);
    }
  }, [loginWnStatus]);
  function pageNavigationAndFormHandle() {
    const user = users.find((item) => formik.values.phoneNumber === item.phone);
    switch (page) {
      case "PN":
        if (user) {
          setPage("PS");
          formik.values.isSigning = false;
        } else {
          setPage("PSS");
          formik.values.isSigning = true;
        }
        break;
      case "PS":
        if (user?.pass === formik.values.passWord) {
          dispatch(
            activateUser({
              pass: formik.values.passWord,
              phone: formik.values.phoneNumber,
            })
          );
          dispatch(setLoginWn(false));
        } else {
          alert("رمز نا درست");
        }
        break;
      case "PSS":
        setPage("NM");
        break;
      default:
        break;
    }
  }

  function NMclickHandle() {
    const $ = formik.values;
    dispatch(
      addUser({
        name: $.name,
        pass: $.passSet1,
        phone: $.phoneNumber,
      })
    );
    dispatch(activateUser({ pass: $.passSet1, phone: $.phoneNumber }));
    dispatch(setLoginWn(false));
  }
  return (
    <div
      className={`fixed left-[calc(50%-12.5rem)] ${css} z-50 top-[calc(50%-12.5rem)] bg-white w-[25rem] transition-all duration-300 h-[25rem]  border`}
      onClick={(e) => e.stopPropagation()}
    >
      <header className="flex justify-end border-b p-3 text-xl">
        <button onClick={() => dispatch(setLoginWn(false))}>
          <FontAwesomeIcon icon={solid("x")} />
        </button>
      </header>
      <main className="px-12">
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          {page === "PN" && (
            <div>
              <h4 className="text-center mt-6 text-sm">
                برای ورود یا عضویت شماره تلفن خود را ورد کنید
              </h4>

              <input
                type="text"
                id="PN"
                className={`text-center outline-none border-b w-full ${
                  formik.errors.phoneNumber && formik.touched.phoneNumber
                    ? "border-b-red-600"
                    : ""
                } mt-20 peer p-1 text-lg`}
                {...formik.getFieldProps("phoneNumber")}
              />
              <label
                htmlFor="PN"
                className={`absolute  transition-all ${
                  formik.values.phoneNumber ? "top-[75px]" : "top-[100px]"
                } ${
                  formik.errors.phoneNumber && formik.touched.phoneNumber
                    ? "text-red-600"
                    : "text-gray-400"
                }  peer-focus:top-16 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center`}
              >
                شماره موبایل
              </label>
              <div className="h-4 w-full text-center text-red-600">
                {formik.touched.phoneNumber && formik.errors.phoneNumber}
              </div>
              <button
                className="w-full transition-colors text-center bg-red-600 text-white  rounded-md py-3 mt-10"
                type="button"
                onClick={pageNavigationAndFormHandle}
                disabled={!!formik.errors.phoneNumber}
              >
                ادامه
              </button>
            </div>
          )}
          {page === "PSS" && (
            <div>
              <h4 className="text-center mt-6 text-sm">
                برای ساخت اکانت رمز خود را انتخاب کنید
              </h4>

              <div className="mt-8 relative">
                <input
                  type="text"
                  id="PSS1"
                  className={`text-center outline-none border-b ${
                    formik.touched.passSet1 && formik.errors.passSet1
                      ? "border-b-red-600"
                      : ""
                  } w-full peer p-1 text-lg`}
                  {...formik.getFieldProps("passSet1")}
                />
                <label
                  htmlFor="PSS1"
                  className={`absolute  transition-all ${
                    formik.values.passSet1 ? "-top-6" : "top-0"
                  } peer-focus:-top-7 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center ${
                    formik.touched.passSet1 && formik.errors.passSet1
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  رمز عبور
                </label>
                <div className="w-full text-center text-red-600">
                  {formik.touched.passSet1 && formik.errors.passSet1}
                </div>
              </div>
              <div className="mt-8 relative">
                <input
                  type="text"
                  id="PSS2"
                  className={`text-center outline-none border-b w-full peer p-1 text-lg ${
                    formik.touched.passSet2 && formik.errors.passSet2
                      ? "border-b-red-600"
                      : ""
                  }`}
                  {...formik.getFieldProps("passSet2")}
                />
                <label
                  htmlFor="PSS2"
                  className={`absolute  transition-all ${
                    formik.values.passSet2 ? "-top-6" : "top-0"
                  } ${
                    formik.touched.passSet2 && formik.errors.passSet2
                      ? "text-red-600"
                      : "text-gray-400"
                  }  peer-focus:-top-7 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center`}
                >
                  تکرار رمز عبور
                </label>
                <div className="w-full text-center text-red-600">
                  {formik.touched.passSet2 &&
                    formik.touched.passSet1 &&
                    formik.errors.passSet2}
                </div>
              </div>
              <button
                className="w-full transition-colors text-center bg-red-600 text-white  rounded-md py-3 mt-12"
                type="button"
                disabled={!!formik.errors.passSet2}
                onClick={pageNavigationAndFormHandle}
              >
                ادامه
              </button>
            </div>
          )}
          {page === "NM" && (
            <div>
              <h4 className="text-center mt-6 text-sm">نام خود را وارد کنید</h4>

              <div className="mt-20 relative">
                <input
                  type="text"
                  id="PSS1"
                  className={`text-center outline-none border-b w-full peer p-1 text-lg ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-600"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
                <label
                  htmlFor="PSS1"
                  className={`absolute  transition-all ${
                    formik.values.name ? "-top-6" : "top-0"
                  } ${
                    formik.touched.name && formik.errors.name
                      ? "text-red-600"
                      : "text-gray-400"
                  } peer-focus:-top-7 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center`}
                >
                  نام
                </label>{" "}
                <div className="text-center text-red-600 w-full h-3">
                  {formik.touched.name && formik.errors.name}
                </div>
              </div>
              <button
                className="w-full transition-colors text-center bg-red-600 text-white  rounded-md py-3 mt-12"
                type="button"
                onClick={NMclickHandle}
              >
                ادامه
              </button>
            </div>
          )}
          {page === "PS" && (
            <div>
              <h4 className="text-center mt-6 text-sm">
                {"رمز خود را وارد کنید"}
              </h4>
              <div className="mt-20 relative">
                <input
                  type="text"
                  id="PS"
                  className={`text-center outline-none border-b w-full peer ${
                    formik.touched.passWord && formik.errors.passWord
                      ? "border-b-red-600"
                      : ""
                  } p-1 text-lg`}
                  {...formik.getFieldProps("passWord")}
                />
                <label
                  htmlFor="PS"
                  className={`absolute  transition-all ${
                    formik.values.passWord ? "-top-6" : "top-0"
                  } ${
                    formik.touched.passWord && formik.errors.passWord
                      ? "text-red-600"
                      : "text-gray-400"
                  } peer-focus:-top-7 cursor-text peer-focus:text-sm peer-focus:text-black w-full left-0 text-center`}
                >
                  رمز
                </label>
              </div>
              <div className="w-full text-center text-red-600">
                {formik.touched.passWord && formik.errors.passWord}
              </div>
              <button
                className="w-full transition-colors text-center bg-red-600 text-white  rounded-md py-3 mt-10"
                type="button"
                disabled={!!formik.errors.passWord}
                onClick={pageNavigationAndFormHandle}
              >
                ادامه
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
