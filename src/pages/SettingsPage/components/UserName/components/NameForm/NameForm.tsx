import { FC } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";

import { INameForm, NameFormProps } from "./NameForm.type";
import validationSchema from "./validationSchema";
import { emojiRegex } from "@/src/utils";
import { useErrorBoundary } from "@/src/hooks";
import { TextField, UIbutton } from "@/src/components";
import { ProfileUpdateApi } from "@/src/pages/SettingsPage/utils/ProfileUpdateApi";
import styles from "./NameForm.module.scss";

const NameForm: FC<NameFormProps> = ({
  classNames,
  fullName,
  setIsEditing,
}) => {
  const setErrorBoundary = useErrorBoundary();

  const onSubmit = async (
    values: INameForm,
    helpers: FormikHelpers<INameForm>
  ) => {
    helpers;
    const [firstName, lastName] = values.fullName
      .trim()
      .split(" ")
      .filter((el) => el);

    if (firstName && lastName) {
      new ProfileUpdateApi(undefined, setErrorBoundary).userSave({
        firstName,
        lastName,
      });
    }

    setIsEditing(false);
  };
  return (
    <Formik
      initialValues={{ fullName }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        isValid,
        dirty,
        isSubmitting,
        values,
        handleChange,
      }: FormikProps<INameForm>) => (
        <Form className={`${styles["form"]} ${classNames}`}>
          <TextField
            id="fullName"
            name="fullName"
            value={values.fullName}
            placeholder="Full name"
            dataAutomation="fullNameField"
            className={styles["form__field"]}
            onChange={(e) => {
              e.target.value = e.target.value.replace(emojiRegex, "");
              handleChange(e);
            }}
          />
          <UIbutton
            type="submit"
            dataAutomation="submitButton"
            className={styles["form__button"]}
            disabled={!isValid || !dirty}
            isLoading={isSubmitting}
          >
            Apply
          </UIbutton>
        </Form>
      )}
    </Formik>
  );
};

export default NameForm;
