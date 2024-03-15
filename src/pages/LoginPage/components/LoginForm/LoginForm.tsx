import { FC } from "react";
import { Form, Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";

import {
  apiErrorMessage,
  apiErrorStatus,
  links,
  keysValue,
  apiUiMessage,
} from "@/src/types";
import { useAppDispatch, updateUser } from "@/src/redux";
import {
  setCookies,
  setDate,
  accountDeletionTerm,
  setDataToLS,
  deleteCookie,
  getCookies,
} from "@/src/utils";

import validationSchema from "./validationSchema";
import LoginApi from "./LoginApi";
import { ILoginPage, setErrors } from "./LoginForm.type";
import { useDebouncedNav, useErrorBoundary } from "@/src/hooks";
import styles from "./LoginForm.module.scss";

import { PasswordField, TextField, UIbutton } from "@/src/components";

const LoginPageForm: FC = () => {
  const setError = useErrorBoundary();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const debouncedNav = useDebouncedNav(1000 * 2);

  const onHandleSubmit = async (values: ILoginPage, setErrors: setErrors) => {
    const [id, email] = getCookies(keysValue.USER_ID, keysValue.EMAIL);
    const response = await LoginApi(values, setError);
    const { status, data } = response;

    if (
      response.status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
      response.errors.email === apiErrorMessage.EMAIL_NOT_EXISTS
    ) {
      debouncedNav(links.SIGN_UP);
      return setErrors({
        ["email"]: " ",
        ["password"]: apiUiMessage.NOT_REGISTERED,
      });
    }

    if (
      response.statusCode === apiErrorStatus.UNPROCESSABLE_ENTITY &&
      response.message === apiErrorMessage.UNCONFIRMED_EMAIL
    ) {
      debouncedNav(links.SIGN_UP, values.email);
      return setErrors({
        ["email"]: " ",
        ["password"]: apiUiMessage.EMAIL_UNCONFIRMED,
      });
    }

    if (
      response.statusCode === apiErrorStatus.UNPROCESSABLE_ENTITY &&
      response.message === apiErrorMessage.UNCOMPLETED_REGISTRATION
    ) {
      if (id && email) debouncedNav(links.ACCOUNT_CREATION + "/" + id);
      else debouncedNav(links.SIGN_UP);
      return setErrors({
        ["email"]: " ",
        ["password"]: apiUiMessage.REGISTRATION_UNCOMPLETED,
      });
    }
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
        deletedUserDate: String(expiresValue),
        restoringEmail: values.email,
      };
      setCookies(cValue, expiresValue, undefined, true);

      return navigate(links.RESTORE);
    }
    if (status === apiErrorStatus.UNPROCESSABLE_ENTITY) {
      return setErrors({
        ["email"]: " ",
        ["password"]: "Wrong email or password",
      });
    }
    deleteCookie(
      keysValue.DELETED_ACCOUNT_TIME_STAMP,
      keysValue.RESTORE_EMAIL,
      keysValue.RESTORE_TOKEN,
      keysValue.EMAIL,
      keysValue.USER_ID
    );
    setDataToLS({ token: data.token });
    dispatch(updateUser(data.user));
  };
  return (
    <div>
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
              aria-label="Email field input"
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
              aria-label="Password field input"
            />
            <UIbutton
              type="submit"
              fullWidth
              dataAutomation="submitButton"
              className={styles["button"]}
              disabled={!isValid || !dirty}
              isLoading={isSubmitting}
              aria-label="Submit form button"
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
