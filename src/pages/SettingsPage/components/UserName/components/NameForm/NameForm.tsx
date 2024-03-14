import { FC } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";

import { INameForm, NameFormProps } from "./NameForm.type";
import validationSchema from "./validationSchema";
import { emojiRegex } from "@/src/utils";
import styles from "./NameForm.module.scss";

import { TextField, UIbutton } from "@/src/components";

const initialValues: INameForm = {
  fullName: "",
};

const NameForm: FC<NameFormProps> = ({ classNames }) => {
  const onSubmit = (values: INameForm, helpers: FormikHelpers<INameForm>) => {
    values;
    helpers;
  };
  return (
    <Formik
      initialValues={initialValues}
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
