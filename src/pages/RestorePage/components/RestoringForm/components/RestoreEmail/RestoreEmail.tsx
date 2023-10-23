import { FC } from "react";
import { FormValues } from "./RestoreEmail.type";
import { Formik, FormikHelpers, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {
  apiErrorMessage,
  apiErrorStatus,
  apiUiMessage,
  deleteCookie,
  keyValue,
  links,
} from "@/src/utils";
import { EndpointsEnum, api } from "@/src/axios";
import { AxiosError } from "axios";
import { validationSchema } from "./validationSchema";
import { TextField, UIbutton } from "@/src/components";

const initialValues: FormValues = {
  hash: "",
};

const RestoreEmail: FC = () => {
  const navigate = useNavigate();
  const onHandleSubmit = async (
    { hash }: FormValues,
    { setFieldError, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await api.post(EndpointsEnum.CONFIRM_EMAIL_RESTORE, {
        hash,
      });

      deleteCookie(
        keyValue.DELETED_ACCOUNT_TIME_STAMP,
        keyValue.RESTORE_EMAIL,
        keyValue.RESTORE_TOKEN
      );

      return navigate(links.LOG_IN);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === apiErrorStatus.FORBIDDEN &&
          error.response?.data.error === apiErrorMessage.WRONG_HASH
        ) {
          setFieldError("hash", apiUiMessage.INVALID_RECOVERY_CODE);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onHandleSubmit}
    >
      {({ isSubmitting, isValid, dirty, values }) => (
        <Form>
          <TextField
            id="hash"
            name="hash"
            dataAutomation="hashInput"
            label="Confirmation code"
            value={values.hash}
          />
          <UIbutton
            // className={styles["register-form__button"]}
            dataAutomation="submitButton"
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
          >
            Confirm
          </UIbutton>
        </Form>
      )}
    </Formik>
  );
};

export default RestoreEmail;
