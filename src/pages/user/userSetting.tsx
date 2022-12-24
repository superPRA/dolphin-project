import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { updateUser } from "../../redux/app/features/inputs/inputSlice";

type Props = {};
interface initVal {
  mainPassWord: string;
  passWord1: string;
  passWord2: string;
}

export default function UserSetting({}: Props) {
  const user = useAppSelector((state) => state.inp.users).find(
    (item) => item.isActive === true
  );
  const dispatch = useAppDispatch();
  const initialValues: initVal = {
    mainPassWord: "",
    passWord1: "",
    passWord2: "",
  };
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const error: initVal = {
        mainPassWord: "",
        passWord1: "",
        passWord2: "",
      };
      if (!values.mainPassWord) {
        error.mainPassWord = "رمز عبور خود را وارد کنید";
      }
      if (!values.passWord1) {
        error.passWord1 = "رمز عبور خود را وارد کنید";
      }
      if (!values.passWord2) {
        error.passWord2 = "رمز عبور خود را وارد کنید";
      } else if (values.passWord1 !== values.passWord2) {
        error.passWord2 = "رمز عبور ها یکی نیستند";
      }
      return error;
    },
    onSubmit: () => {},
  });
  const handleSubmit = () => {
    if (user?.pass === formik.values.mainPassWord) {
      dispatch(
        updateUser({
          birthday: user.birthDay,
          email: user.email,
          gender: user.gender,
          name: user.name,
          pass: formik.values.passWord1,
          phone: user.phone,
        })
      );
      alert("password changed");
      formik.values.mainPassWord = "";
      formik.values.passWord1 = "";
      formik.values.passWord2 = "";
    } else {
      alert("wrong password");
    }
  };
  return (
    <div>
      <h1 className="text-center pt-12">تغییر رمز عبور</h1>
      <form
        className="md:w-[32rem] mx-auto px-6 md:px-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative mt-12">
          <input
            className={`outline-none w-full border-b ${
              formik.errors.mainPassWord && formik.touched.mainPassWord
                ? "border-b-red-600"
                : "border-b-gray-600"
            }   p-1 peer text-lg`}
            type="password"
            id="mainPassword"
            {...formik.getFieldProps("mainPassWord")}
          />
          <label
            htmlFor="mainPassWord"
            className={`text-lg absolute right-0 ${
              formik.values.mainPassWord ? "-top-6" : "top-0"
            } ${
              formik.errors.mainPassWord && formik.touched.mainPassWord
                ? "peer-focus:text-red-600"
                : ""
            } text-gray-600 peer-focus:-top-8 transition-all peer-focus:text-black peer-focus:text-sm`}
          >
            رمز قبلی
          </label>
          <div className="text-sm mt-1 text-red-600 h-3 w-full">
            {formik.touched.mainPassWord && formik.errors.mainPassWord}
          </div>
        </div>
        <div className="relative mt-12">
          <input
            className={`outline-none w-full border-b ${
              formik.errors.passWord1 && formik.touched.passWord1
                ? "border-b-red-600"
                : "border-b-gray-600"
            }   p-1 peer text-lg`}
            type="password"
            id="password1"
            {...formik.getFieldProps("passWord1")}
          />
          <label
            htmlFor="passWord1"
            className={`text-lg absolute right-0 ${
              formik.values.passWord1 ? "-top-6" : "top-0"
            } ${
              formik.errors.passWord1 && formik.touched.passWord1
                ? "peer-focus:text-red-600"
                : ""
            } text-gray-600 peer-focus:-top-8 transition-all peer-focus:text-black peer-focus:text-sm`}
          >
            رمز جدید
          </label>
          <div className="text-sm mt-1 text-red-600 h-3 w-full">
            {formik.touched.passWord1 && formik.errors.passWord1}
          </div>
        </div>
        <div className="relative mt-12">
          <input
            className={`outline-none w-full border-b ${
              formik.errors.passWord2 && formik.touched.passWord2
                ? "border-b-red-600"
                : "border-b-gray-600"
            }   p-1 peer text-lg`}
            type="password"
            id="password2"
            {...formik.getFieldProps("passWord2")}
          />
          <label
            htmlFor="passWord2"
            className={`text-lg absolute right-0 ${
              formik.values.passWord2 ? "-top-6" : "top-0"
            } ${
              formik.errors.passWord2 && formik.touched.passWord2
                ? "peer-focus:text-red-600"
                : ""
            } text-gray-600 peer-focus:-top-8 transition-all peer-focus:text-black peer-focus:text-sm`}
          >
            رمز را تکرار کنید
          </label>
          <div className="text-sm mt-1 text-red-600 h-3 w-full">
            {formik.touched.passWord2 && formik.errors.passWord2}
          </div>
        </div>
        <button
          className="text-white rounded bg-red-600 px-8 py-2 block mx-auto mt-12"
          type="button"
          onClick={handleSubmit}
        >
          ثبت
        </button>
      </form>
    </div>
  );
}
