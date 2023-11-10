import { FC } from "react";
import { Form, Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";

import { apiErrorMessage, apiErrorStatus, links, keysValue } from "@/src/types";
import { useAppDispatch, updateUser } from "@/src/redux";
import {
  setCookies,
  setDate,
  accountDeletionTerm,
  setDataToLS,
  deleteCookie,
} from "@/src/utils";

import validationSchema from "./validationSchema";
import LoginApi from "./LoginApi";
import { ILoginPage, setErrors } from "./LoginForm.type";
import styles from "./LoginForm.module.scss";

import { PasswordField, TextField, UIbutton } from "@/src/components";

const LoginPageForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = async (values: ILoginPage, setErrors: setErrors) => {
    const response = await LoginApi(values);
    const { status, data } = response;

    if (
      response.status === apiErrorStatus.FORBIDDEN &&
      response.message === apiErrorMessage.ACCOUNT_DELETED
    ) {
      deleteCookie(keysValue.RESTORE_TOKEN);
      const expiresValue = setDate(
        response.deletedUserDate,
        accountDeletionTerm
      );
      const cValue = {
        deletedUserDate: expiresValue + "",
        restoringEmail: values.email,
      };
      setCookies(cValue, expiresValue, undefined, true);

      return navigate(links.RESTORE);
    }
    if (status === apiErrorStatus.UNPROCESSABLE_ENTITY) {
      setErrors({ ["email"]: " ", ["password"]: "wrong email or password" });
    } else {
      deleteCookie(
        keysValue.DELETED_ACCOUNT_TIME_STAMP,
        keysValue.RESTORE_EMAIL,
        keysValue.RESTORE_TOKEN
      );
      setDataToLS({ token: data.token });
      dispatch(updateUser(data.user));
    }
  };
  return (
    <div className={styles["login-form"]}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          await onHandleSubmit(values, setErrors);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty }: FormikProps<ILoginPage>) => (
          <Form>
            <TextField
              id="email"
              name="email"
              label="Your email"
              dataAutomation="emailInput"
            />
            <PasswordField
              id="password"
              name="password"
              label="Your password"
              dataAutomation="passwordInput"
              helperLink={{
                text: "Forgot password?",
                href: links.FORGOT_PASSWORD,
              }}
            />
            <UIbutton
              type="submit"
              fullWidth
              dataAutomation="submitButton"
              className={styles["login-form__button"]}
              disabled={!isValid || !dirty}
              isLoading={isSubmitting}
            >
              Log in
            </UIbutton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPageForm;
