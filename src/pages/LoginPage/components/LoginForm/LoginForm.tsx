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
import { isAxiosError } from "axios";

const LoginPageForm: FC = () => {
  const setError = useErrorBoundary();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const debouncedNav = useDebouncedNav(1000 * 2);

  const onHandleSubmit = async (values: ILoginPage, setErrors: setErrors) => {
    const [id, email] = getCookies(keysValue.USER_ID, keysValue.EMAIL);
    try {
      const response = await LoginApi(values);
      // needs refactoring
      deleteCookie(
        keysValue.DELETED_ACCOUNT_TIME_STAMP,
        keysValue.RESTORE_EMAIL,
        keysValue.RESTORE_TOKEN,
        keysValue.EMAIL,
        keysValue.USER_ID
      );
      setDataToLS({ token: response.data.token });
      dispatch(updateUser(response.data.user));
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error);

        if (
          error.response?.status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
          error.response.data?.errors?.email ===
            apiErrorMessage.EMAIL_NOT_EXISTS
        ) {
          debouncedNav(links.SIGN_UP);
          return setErrors({
            ["password"]: apiUiMessage.NOT_REGISTERED,
          });
        }

        if (
          error.response?.status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
          error.response.data.message === apiErrorMessage.UNCONFIRMED_EMAIL
        ) {
          debouncedNav(links.SIGN_UP, values.email);
          return setErrors({
            ["password"]: apiUiMessage.EMAIL_UNCONFIRMED,
          });
        }

        if (
          error.response?.status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
          error.response.data.message ===
            apiErrorMessage.UNCOMPLETED_REGISTRATION
        ) {
          if (id && email) debouncedNav(links.ACCOUNT_CREATION + "/" + id);
          else debouncedNav(links.SIGN_UP);
          return setErrors({
            ["password"]: apiUiMessage.REGISTRATION_UNCOMPLETED,
          });
        }

        if (
          error.response?.status === apiErrorStatus.FORBIDDEN &&
          error.response.data.message === apiErrorMessage.ACCOUNT_DELETED
        ) {
          deleteCookie(keysValue.RESTORE_TOKEN);
          const expires = setDate(
            error.response.data.deletedUserDate,
            accountDeletionTerm
          );
          const cValue = {
            deletedUserDate: String(expires),
            restoringEmail: values.email,
          };
          setCookies(cValue, { secure: true, expires });
          return navigate(links.RESTORE);
        }

        if (
          error.response?.status === apiErrorStatus.UNPROCESSABLE_ENTITY &&
          error.response.data?.errors?.password
        ) {
          return setErrors({
            ["password"]: "Wrong email or password",
          });
        }
      }
    }
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
