import { FC, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import cn from "classnames";

import { Values, CommentsFormProps } from "./FeedCommentsForm.type";
import styles from "./FeedCommentsForm.module.scss";

import { UIbutton } from "@/src/components";

const initialValues = { comments: "" };

const FeedCommentsForm: FC<CommentsFormProps> = ({ postId }) => {
  const [isFocused, setIsFocused] = useState(false);

  const onHandleSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    console.log(values);
    console.log(postId);
    setSubmitting(false);
    resetForm();
  };

  const onHandleBlur = () => setIsFocused(false);
  const onHandleFocus = () => setIsFocused(true);

  const baseClassName = (dirty: boolean) =>
    cn(styles["comments__field"], {
      [styles["comments__field--focused"]]: dirty || isFocused,
      [styles["comments__field--unfocused"]]: !(dirty || isFocused),
    });

  return (
    <Formik initialValues={initialValues} onSubmit={onHandleSubmit}>
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
              onBlur={onHandleBlur}
              onFocus={onHandleFocus}
              className={baseClassName(dirty)}
            />
            <UIbutton
              type="submit"
              dataAutomation="submitButton"
              isLoading={isSubmitting}
              disabled={!dirty || isSubmitting}
              className={`${styles["comments__button"]} ${styles["btn"]}`}
            >
              Send
            </UIbutton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FeedCommentsForm;
