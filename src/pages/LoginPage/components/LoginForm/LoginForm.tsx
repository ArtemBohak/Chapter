import { FC } from "react";
import { Form, Formik, FormikProps } from "formik";
import styles from "./LoginForm.module.scss";
import { PasswordField, TextField } from "@/src/components/Fields";
import { UIbutton } from "@/src/components/Buttons";
import { ILoginPage, setErrors } from "./LoginForm.type";

import validationSchema from "./validationSchema";
import LoginApi from "./LoginApi";
import { links } from "@/src/utils/links/links.types";

import { apiErrorMsg, apiErrorStatus, removeDataFromLS } from "@/src/utils";
import { useAppDispatch } from "@/src/redux/hooks";
import { userFulfilled } from "@/src/redux/slices";
import { setDataToLS } from "@/src/utils";
import { useNavigate } from "react-router-dom";

const LoginPageForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = async (values: ILoginPage, setErrors: setErrors) => {
    const response = await LoginApi(values);
    const { status, data } = response;

    if (
      response.status === apiErrorStatus.FORBIDDEN &&
      response.message === apiErrorMsg.ACCOUNT_DELETED
    ) {
      setDataToLS({
        provider: "email",
        deletedUserDate: response.deletedUserDate,
      });

      return navigate(links.RESTORE);
    }
    if (status === apiErrorStatus.UNPROCESSABLE_ENTITY) {
      setErrors({ ["email"]: " ", ["password"]: "wrong email or password" });
    } else {
      removeDataFromLS("deletedUserDate", "provider");
      setDataToLS({ token: data.token });
      dispatch(userFulfilled(data.user));
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
