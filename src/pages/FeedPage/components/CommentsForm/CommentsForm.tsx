import { FC, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import cn from "classnames";

import { Values } from "./CommentsForm.type";
import styles from "./CommentForm.module.scss";

import { UIbutton } from "@/src/components";

const CommentsForm: FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  const onHandleSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik initialValues={{ comments: "" }} onSubmit={onHandleSubmit}>
      {({ isSubmitting, values, dirty }) => {
        return (
          <Form>
            <Field
              id="comments"
              placeholder="Add a comment"
              name="comments"
              component="textarea"
              data-automation="commentsInput"
              value={values.comments}
              className={cn(
                styles["comments"],
                dirty || isFocused
                  ? styles["comments--focused"]
                  : styles["comments--unfocused"]
              )}
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
            />
            <UIbutton
              type="submit"
              dataAutomation="submitButton"
              isLoading={isSubmitting}
              disabled={!dirty || isSubmitting}
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
