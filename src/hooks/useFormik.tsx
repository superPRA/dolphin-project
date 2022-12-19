import { useFormik } from "formik";
import * as yup from "yup"
import React, { createContext } from "react";

const FormikContext = createContext({});
type args = {
  children: any;
  initialValue: { [index: string]: string | boolean };
  onSubmitFunction: ()=>void,

};

export const Formik = ({ children, initialValue, onSubmitFunction }: args) => {
  const formikStateAndHelpers = useFormik({
    initialValues: initialValue,
    onSubmit: onSubmitFunction,
    validationSchema: yup.object({

    })
  });
  return (
    <FormikContext.Provider value={formikStateAndHelpers}>
      {typeof children === "function"
        ? children(formikStateAndHelpers)
        : children}
    </FormikContext.Provider>
  );
};
