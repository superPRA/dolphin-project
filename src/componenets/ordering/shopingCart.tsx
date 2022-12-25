import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import ShopingCartBox from "./shopingCartBox";
import { deleteCart } from "../../redux/app/features/shopingCart/cartSlice";
import { useFormik } from "formik";
import {
  removePriceReduction,
  setSaleCode,
} from "../../redux/app/features/inputs/inputSlice";
import { setCartStatus } from "../../redux/app/features/shopingCart/cartSlice";
import { privateDecrypt } from "crypto";
import { useNavigate } from "react-router-dom";

type Props = {};
type allOrdersType = {
  img: string;
  ingridient: string;
  price: number;
  type: string;
  title: string;
  exist: boolean;
  count: number;
}[];
interface formValues {
  saleCode: string;
}
export default function ShopingCart({}: Props) {
  const currency = new Intl.NumberFormat("en-us",{
    currency: "USD"
  })
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const priceReduction =
    1 - useAppSelector((state) => state.inp.priceReduction);
  const [saleCodePage, setSaleCodePage] = useState(false);
  const allOrders: allOrdersType = useAppSelector((state) => state.cart.orders);
  const totalPrice = allOrders.reduce((total, value) => {
    return total + value.count * value.price;
  }, 0);
  const numberOfOrders = allOrders.reduce((total, value) => {
    return total + value.count;
  }, 0);
  const cartOpen: boolean = useAppSelector((state) => state.cart.cartOpen);
  const saleReduction = 100 - priceReduction * 100;
  const totalPriceAfterReduction = totalPrice * priceReduction;
  const priceAfterReduction = totalPrice - totalPriceAfterReduction;
  const [saleCodeErr, setSaleCodeErr] = useState("");
  const saleCodeList = useAppSelector((state) => state.inp.saleCodes);
  useEffect(() => {
    if (numberOfOrders === 0) {
      dispatch(setCartStatus(false));
      setSaleCodePage(false);
      dispatch(removePriceReduction());
    }
  }, [numberOfOrders]);
  const ShopingCartBoxElement = allOrders.map((item) => {
    const { count, title, price } = item;
    return count > 0 ? (
      <ShopingCartBox
        count={count}
        title={title}
        price={price}
        key={title}
      />
    ) : null;
  });
  const initialValues: formValues = {
    saleCode: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(setSaleCode(values.saleCode));
      if (!saleCodeList.find((item) => item.code === values.saleCode)) {
        setSaleCodeErr("کد تخفیف وجود ندارد");
      } else {
        setSaleCodePage(false);
        values.saleCode = "";
        setSaleCodeErr("");
      }
    },
  });
  return (
    <div
      className={`lg:sticky fixed lg:top-5 bottom-0 transition-all duration-500 bg-black z-20 w-full lg:w-auto ${
        cartOpen ? "top-0 bg-opacity-70" : "bg-opacity-0"
      }`}
      onClick={() => {
        dispatch(setCartStatus(false));
      }}
    >
      <div
        className={` border border-gray-300 bg-white h-screen w-80 lg:w-auto lg:h-auto lg:static fixed transition-all duration-300 bottom-0 ${
          cartOpen ? " left-0 z-50" : " -left-80 "
        }`}
        onClick={(e) => {
          dispatch(setCartStatus(true));
          e.stopPropagation();
        }}
      >
        <div className="border-b border-b-gray-300 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl">سبد خرید</h2>
            {numberOfOrders > 0 && (
              <h2 className="text-xl font-semibold">({numberOfOrders})</h2>
            )}
          </div>
          {numberOfOrders > 0 && (
            <div className="flex gap-x-4 lg:block">
              <button onClick={() => dispatch(deleteCart())}>
                <FontAwesomeIcon
                  icon={solid("trash-alt")}
                  className="text-xl hover:text-red-600"
                />
              </button>
              <button
                className="lg:hidden"
                onClick={(e) => {
                  dispatch(setCartStatus(false));
                  e.stopPropagation();
                }}
              >
                <FontAwesomeIcon
                  icon={solid("x")}
                  className="text-xl hover:text-red-600"
                />
              </button>
            </div>
          )}
        </div>

        {ShopingCartBoxElement}
        {totalPrice > 0 || (
          <h2 className="text-center text-gray-300 text-2xl py-20">
            سبد خرید خالی است
          </h2>
        )}
        {totalPrice > 0 && (
          <div>
            <div className="flex justify-between items-center px-2 mt-4 mb-8">
              <h2 className="font-semibold">هزینه کل</h2>
              <h2 className="font-semibold">
                {currency.format(totalPriceAfterReduction)} تومان
              </h2>
            </div>
            {priceReduction < 1 && (
              <div className="mx-2 px-4 py-2 rounded-xl text-lg  bg-slate-200 ltr">
                <button
                  className="text-red-600"
                  onClick={() => {
                    dispatch(removePriceReduction());
                  }}
                >
                  <FontAwesomeIcon icon={solid("x")} />
                </button>
                <div className="flex justify-between mx-4 mt-4 items-center rtl">
                  <h3>درصد تخفیف فعال</h3>
                  <h4>{saleReduction}%</h4>
                </div>
                <div className="flex justify-between mx-4 mt-4 items-center rtl">
                  <h3>سود شما از این تخفیف</h3>
                  <h4>{currency.format(priceAfterReduction)}</h4>
                </div>
              </div>
            )}
            {saleCodePage || (
              <div className="p-4">
                {priceReduction === 1 && (
                  <button
                    className="font-semibold text-xl text-red-600 text-center mx-auto block mt-8"
                    onClick={() => setSaleCodePage(true)}
                  >
                    کد تخفیف دارید؟
                  </button>
                )}
                {window.location.pathname.includes("checkout") || (
                  <button
                    className="text-white w-full bg-red-600 py-3 mt-6 rounded-md"
                    onClick={() => navigate("/order/checkout")}
                  >
                    نهایی کردن سفارش
                  </button>
                )}
                {window.location.pathname.includes("checkout") && (
                  <button className="py-3 px-6 rounded-md w-full border border-neutral-800 mt-6 hover:bg-neutral-800 hover:text-white transition"
                    onClick={()=>navigate("/order")}
                  >
                    بازگشت به منو
                  </button>
                )}
              </div>
            )}
            {saleCodePage && (
              <form
                className="px-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                <div className="relative">
                  <input
                    className={`w-full outline-none border  rounded-md text-lg p-2 peer ${
                      saleCodeErr
                        ? "border-red-600 text-red-600"
                        : "border-gray-300"
                    }`}
                    type="text"
                    id="saleCode"
                    {...formik.getFieldProps("saleCode")}
                  />
                  {saleCodeErr && (
                    <h6 className="text-red-600">{saleCodeErr}</h6>
                  )}
                  <label
                    className={`absolute right-2 top-2 peer-focus:-top-3  peer-focus:text-sm transition-all duration-300 bg-white ${
                      formik.values.saleCode !== "" ? "-top-3 text-sm" : null
                    } ${
                      saleCodeErr
                        ? "text-red-600"
                        : "peer-focus:text-black text-gray-400"
                    }`}
                    htmlFor="saleCode"
                  >
                    کد تخفیف
                  </label>
                </div>

                <div className="grid grid-cols-5 gap-x-2 my-4">
                  <button
                    className="col-span-4 bg-gray-800 text-white rounded-md py-2"
                    type="submit"
                  >
                    ثبت کد
                  </button>
                  <button
                    className="col-span-1 text-gray-400"
                    type="button"
                    onClick={() => setSaleCodePage(false)}
                  >
                    انصراف
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
