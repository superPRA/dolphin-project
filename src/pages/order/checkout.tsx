import React from "react";
import { useAppSelector } from "../../redux/app/hooks";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useFormik } from "formik";

type Props = {};
interface initVal {
  orderInfo: string;
  reseiveMethod: string;
  payMethod: string;
}

export default function Checkout({}: Props) {
  const isCartEmpty = useAppSelector((state) => state.cart.orders).every(
    (item) => item.count === 0
  );
  const initialValues: initVal = {
    orderInfo: "",
    reseiveMethod: "motor",
    payMethod: "online",
  };
  const formik = useFormik({
    initialValues,
    validate: () => {},
    onSubmit: () => {},
  });

  if (isCartEmpty) {
    return <Navigate to="/order" />;
  }
  return (
    <div className="lg:col-span-8 col-span-12 lg:mr-20 mt-8">
      <form className="border-[1px] border-gray-300 bg-white">
        <div className="flex justify-between items-center py-3 px-2 border-b border-b-gray-300">
          <h1 className="font-bold text-xl">فستفود دلفین</h1>
          <Link to="/order" className="flex items-center">
            بازگشت به منو
            <FontAwesomeIcon
              icon={solid("angle-left")}
              className="px-2 text-xl"
            />
          </Link>
        </div>

        <div className="flex m-4 py-4 border-dashed border-b border-b-gray-300">
          <div className="w-1/5">
            <h1>توضیحات سفارش</h1>
          </div>
          <div className="w-4/5">
            <textarea
              className="border outline-none rounded w-96 min-h-[8rem]"
              {...formik.getFieldProps("orderInfo")}
            />
            <h4 className="text-sm text-neutral-600">
              مثال: زنگ خراب است تماس بگیرید.
            </h4>
          </div>
        </div>

        <div className="border-b border-b-gray-300 flex p-4">
          <div className="w-1/5">
            <h1>روش تحویل سفارش</h1>
          </div>
          <div className="w-4/5">
            <div className="flex justify-between w-1/2">
              <div className="flex items-start gap-x-6">
                <input
                  type="radio"
                  value="motor"
                  name="reseiveMethod"
                  id="reseive-motor"
                  className="peer hidden"
                  onChange={formik.handleChange}
                  checked={formik.values.reseiveMethod === "motor"}
                />
                <label
                  htmlFor="reseive-motor"
                  className=" h-5 w-5 border-2 border-gray-400 rounded-full peer-checked:bg-red-600 transition-all duration-300 flex justify-center items-center hover:border-red-600 peer-hover:border-red-600 peer-checked:border-red-600 mt-1"
                >
                  <FontAwesomeIcon
                    icon={solid("check")}
                    className="text-sm text-white"
                  />
                </label>
                <div>
                  <label
                    htmlFor="reseive-motor"
                    className="text-lg font-bold block"
                  >
                    ارسال توسط پیک
                  </label>
                  <label htmlFor="reseive-motor" className="text-[12px]">
                    توسط یک پیک ارسال شود
                  </label>
                </div>
              </div>
              <label htmlFor="reseive-motor" className="text-3xl ">
                <FontAwesomeIcon icon={solid("motorcycle")} />
              </label>
            </div>

            <div className="mt-4">
              <div className="flex justify-between w-1/2">
                <div className="flex items-start gap-x-6">
                  <input
                    type="radio"
                    value="inPerson"
                    name="reseiveMethod"
                    id="reseive-person"
                    className="peer hidden"
                    onChange={formik.handleChange}
                    checked={formik.values.reseiveMethod === "inPerson"}
                  />
                  <label
                    htmlFor="reseive-person"
                    className=" h-5 w-5 border-2 border-gray-400 rounded-full peer-checked:bg-red-600 transition-all duration-300 flex justify-center items-center hover:border-red-600 peer-hover:border-red-600 peer-checked:border-red-600 mt-1"
                  >
                    <FontAwesomeIcon
                      icon={solid("check")}
                      className="text-sm text-white"
                    />
                  </label>
                  <div>
                    <label
                      htmlFor="reseive-person"
                      className="text-lg font-bold block"
                    >
                      تحویل حضوری
                    </label>
                    <label htmlFor="reseive-motor" className="text-[12px]">
                      خودم در محل رستوران تحویل میگیرم
                    </label>
                  </div>
                </div>
                <label htmlFor="reseive-person" className="text-3xl">
                  <FontAwesomeIcon icon={solid("box")} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-b-gray-300 p-4 flex justify-start">
          <div className="w-1/5">
            <h1 className="">ادرس محل سفارش</h1>
          </div>
          {formik.values.reseiveMethod === "motor" && (
            <div className="flex justify-between w-4/5">
              <h2 className="text-sm">ادرسی وجود ندارد</h2>
              <button className="border border-gray-500 text-gray-500 px-5 py-2 rounded hover:bg-gray-500 hover:text-white transition-all">
                +افزودن ادرس
              </button>
            </div>
          )}
        </div>
        <div className="border-b border-b-gray-300 p-4 flex ">
          <div className="w-1/5">
            <h1>روش پرداخت</h1>
          </div>
          <div className="h-full w-4/5 py-4 flex">
            <input
              type="radio"
              name="payMethod"
              id="pay-online"
              value="online"
              className="peer/online hidden"
              onChange={formik.handleChange}
              checked={formik.values.payMethod === "online"}
            />
            <input
              type="radio"
              name="payMethod"
              id="pay-cash"
              value="cash"
              className="peer/cash hidden"
              onChange={formik.handleChange}
              checked={formik.values.payMethod === "cash"}
            />
            <input
              type="radio"
              name="payMethod"
              id="pay-card"
              value="card"
              className="peer/card hidden"
              onChange={formik.handleChange}
              checked={formik.values.payMethod === "card"}
            />
            <label
              htmlFor="pay-online"
              className="w-24 h-20 text-center border peer-checked/online:bg-red-600 peer-checked/online:text-white transition rounded-r items-center flex justify-center"
            >
              <div>
                <FontAwesomeIcon icon={solid("computer")} />
                <h2>انلاین</h2>
              </div>
            </label>
            <label
              htmlFor="pay-cash"
              className="w-24 h-20 text-center border peer-checked/cash:bg-red-600 peer-checked/cash:text-white transition items-center flex justify-center"
            >
              <div>
                <FontAwesomeIcon icon={solid("wallet")} />
                <h2>نقدی</h2>
              </div>
            </label>
            <label
              htmlFor="pay-card"
              className="w-24 h-20 text-center border peer-checked/card:bg-red-600 peer-checked/card:text-white transition rounded-l items-center flex justify-center"
            >
              <div>
                <FontAwesomeIcon icon={solid("bank")} />
                <h1>کارتخان</h1>
              </div>
            </label>
          </div>
        </div>

        {formik.values.payMethod === "online" && (
          <div className="border-b border-b-gray-300 p-4 flex justify-start">
            <div className="w-1/5">
              <h1>درگاه پرداخت اینترنتی</h1>
            </div>
            <div className="w-1/2 py-4">
              <div className="flex justify-between items-center">
                <h1>پرداخت از طریق درگاه بانک سامان</h1>
                <img
                  src="https://www.delino.com/img/general/logo-bank-saman.png"
                  className="w-12 h-12"
                  alt=""
                />
              </div>
              <div className="bg-gray-200 rounded border border-gray-300 text-center text-gray-600 text-sm py-4 mt-6">
                <h2>پرداخت از طریق کلیه کارتهای عضو شتاب امکان پذیر است</h2>
                <h3 className="text-gray-500">
                  (قبل از پرداخت از غیر فعال بودن فیلتر شکن مطمئن شوید)
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="p-4">
          <h1 className="text-center text-lg font-bold mt-6">
            پرداختی شما:<span className="text-red-600">109,000 تومان</span>
          </h1>
          <button className="rounded px-6 py-3 bg-red-600 text-white block mx-auto mt-8">
            ارسال به درگاه بانک
          </button>
        </div>
      </form>
    </div>
  );
}
