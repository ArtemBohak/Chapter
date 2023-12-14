import { FC } from "react";
import { ChangePasswordValues, IPasswordChange } from "./PasswordChange.type";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useErrorBoundary } from "@/src/hooks";
import validationSchema from "./validationSchema";
import { PasswordField, UIbutton } from "@/src/components";
import PasswordChangeApi from "./PasswordChangeApi";

import { useNavigate, useParams } from "react-router-dom";
import { links, apiErrorStatus } from "@/src/types";

const PasswordChangeForm: FC = () => {
  const setError = useErrorBoundary();
  const { userId } = useParams();
  const navigate = useNavigate();

  const initialValues: IPasswordChange = {
    password: "",
    hash: "",
  };

  const handleChangePassword = async (
    { password }: ChangePasswordValues,
    { setFieldError }: FormikHelpers<ChangePasswordValues>
  ) => {
    const { status } = await PasswordChangeApi(
      { password, hash: userId },
      setError
    );

    if (
      status === apiErrorStatus.UNPROCESSABLE_ENTITY ||
      status === apiErrorStatus.NOTFOUND
    ) {
      setFieldError("password", "something went wrong");
    }

    if (status === 204) {
      navigate(links.LOG_IN);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
      >
        {({
          isSubmitting,
          isValid,
          dirty,
          values,
        }: FormikProps<IPasswordChange>) => {
          return (
            <Form>
              <PasswordField
                id="password"
                name="password"
                label="Change password"
                placeholder="Enter your password"
                value={values.password}
                strength
                dataAutomation="password-change"
              />
              <PasswordField
                id="confirm_password"
                name="confirm_password"
                label="Confirm password"
                placeholder="Re-enter your password"
                dataAutomation="confirm_password"
              />
              <UIbutton
                type="submit"
                fullWidth
                dataAutomation="submitButton"
                className="p-[12px] text-sm"
                disabled={!isValid || !dirty}
                isLoading={isSubmitting}
              >
                Restore password
              </UIbutton>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default PasswordChangeForm;
