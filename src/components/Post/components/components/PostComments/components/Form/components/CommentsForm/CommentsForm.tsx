import { FC } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";

import { useGetScreenSize } from "@/src/hooks";
import { Values, CommentsFormProps } from "./CommentsForm.type";
import styles from "./CommentsForm.module.scss";

import { Icon, IconEnum } from "@/src/components";
import { PostButton } from "../../../../..";

const initialValues = { comments: "" };

const CommentsForm: FC<CommentsFormProps> = ({ id, fetchData }) => {
  const [screenSize] = useGetScreenSize();

  const onHandleSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    fetchData && fetchData(id);
    console.log(values);
    setSubmitting(false);
    resetForm();
  };

  const onHandleIconClick = () => {};

  const iconSize = screenSize < 769 ? 20 : 24;

  return (
    <Formik initialValues={initialValues} onSubmit={onHandleSubmit}>
      {({ isSubmitting, values, dirty }) => {
        return (
          <Form className={styles["comments-form"]}>
            <div className={styles["comments-form__wrapper"]}>
              <Field
                id="comments"
                placeholder="Add a comment ..."
                name="comments"
                component="textarea"
                data-automation="commentsInput"
                value={values.comments}
                className={styles["comments-form__field"]}
              />
              <button
                onClick={onHandleIconClick}
                className={styles["comments-form__icon-button"]}
              >
                <Icon icon={IconEnum.Smile} size={iconSize} removeInlineStyle />
              </button>
            </div>
            <PostButton
              type="submit"
              dataAutomation="submitButton"
              isLoading={isSubmitting}
              isDisabled={!dirty || isSubmitting}
              className={styles["comments-form__button"]}
            >
              Send
            </PostButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CommentsForm;
