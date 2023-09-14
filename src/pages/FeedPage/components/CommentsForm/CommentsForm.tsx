import { FC, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import cn from "classnames";

import { Values, CommentsFormProps } from "./CommentsForm.type";
import styles from "./CommentForm.module.scss";

import { UIbutton } from "@/src/components";

const CommentsForm: FC<CommentsFormProps> = ({ id }) => {
  const [isFocused, setIsFocused] = useState(false);

  const onHandleSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    console.log(values);
    console.log(id);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik initialValues={{ comments: "" }} onSubmit={onHandleSubmit}>
      {({ isSubmitting, values, dirty }) => {
        return (
          <Form className={styles["comments"]}>
            <Field
              id="comments"
              placeholder="Add a comment"
              name="comments"
              component="textarea"
              data-automation="commentsInput"
              value={values.comments}
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
              className={cn(
                styles["comments__field"],
                dirty || isFocused
                  ? styles["comments__field--focused"]
                  : styles["comments__field--unfocused"]
              )}
            />
            <UIbutton
              type="submit"
              dataAutomation="submitButton"
              isLoading={isSubmitting}
              disabled={!dirty || isSubmitting}
              className={styles["comments__button"]}
            >
              Send
            </UIbutton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CommentsForm;
