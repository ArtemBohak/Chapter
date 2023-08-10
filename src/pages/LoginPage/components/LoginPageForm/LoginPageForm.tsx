import { FC } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import styles from "./LoginPageForm.module.scss";
import { Link } from "react-router-dom";
interface InputValues {
  email: string;
  password: string;
}
const LoginPageForm: FC = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(
        inputValues: InputValues,
        { setSubmitting }: FormikHelpers<InputValues>
      ) => {
        alert("hi");
      }}
    >
      <Form className="max-w-[327px]">
        <label className={`${styles["lable"]}  `} htmlFor="email">
          Your email
        </label>
        <Field
          className="w-[327px] h-[35px] mb-[15px] rounded-[5px] border border-gray-1030 "
          id="email"
          name="email"
          placeholder=""
        />
        <label className={`${styles["lable"]}`} htmlFor="password">
          Your password
        </label>
        <Field
          className="w-[327px] h-[35px] rounded-[5px] mb-[5px] border border-gray-1030 "
          id="password"
          name="password"
          placeholder=""
        />
        <div className=" flex justify-end">
          <Link
            className="mb-[25px] text-right  text-xs text-blue-1030"
            to={"#"}
          >
            Forgot password?
          </Link>
        </div>
        <button className=" bg-orange-1200 text-white w-[327px] h-11 rounded-[5px] mb-[10px]">
          Log in
        </button>
      </Form>
    </Formik>
  );
};

export default LoginPageForm;
