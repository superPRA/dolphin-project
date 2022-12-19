import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/app/hooks";
import { setFilterInput } from "./../redux/app/features/inputs/inputSlice";

type Props = {};
interface formValues {
  quickSearch: string;
  checkExist: boolean;
}

export default function FilterInput({}: Props) {
  const dispatch = useAppDispatch();
  const initVal: formValues = {
    quickSearch: "",
    checkExist: false,
  };
  const formik = useFormik({
    initialValues: initVal,
    validationSchema: Yup.object({
      quickSearch: Yup.string(),
    }),
    onSubmit: () => {},
  });
  useEffect(() => {
    dispatch(setFilterInput(formik.values));
  }, [formik.values]);

  return (
    <form className="flex justify-between items-center bk2:px-8 px-2 py-4 ">
      <div className="flex items-center" >
        <button className="border border-l-0 border-gray-500 rounded-r-sm h-9 w-9">
          <FontAwesomeIcon flip="horizontal" icon={solid("search")} />
        </button>
        <input
          id="search"
          type="text"
          className={`outline-none border border-gray-500 border-r-0 rounded-l-sm text-base h-9 peer `}
          {...formik.getFieldProps("quickSearch")}
        />
        <label
          htmlFor="search"
          className={` md:text-[12px] text-[11px]  relative  left-44 -top-1 text-gray-500 bg-white transition-all duration-300 peer-focus:-top-5 peer-focus:text-black peer-focus:text-[10px] ${
            formik.values.quickSearch.length > 0 ? "-top-5 text-[10px]" : null
          } `}
        >
          جست و جوی سریع
        </label>
      </div>
      <div className="flex items-center gap-x-2">
        <input
          id="exist"
          type="checkbox"
          className="absolute opacity-0 peer"
          {...formik.getFieldProps("checkExist")}
        />
        <div className=" h-5 w-5 border-2 border-gray-400 rounded-full peer-checked:bg-red-600 transition-all duration-300 flex justify-center items-center hover:border-red-600 peer-hover:border-red-600 peer-checked:border-red-600">
          <FontAwesomeIcon
            icon={solid("check")}
            className="text-sm text-white"
          />
        </div>
        <label htmlFor="exist" className="select-none">
          فقط موجود ها
        </label>
      </div>
    </form>
  );
}
