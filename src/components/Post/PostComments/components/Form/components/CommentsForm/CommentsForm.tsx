import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { useGetScreenSize } from "@/src/hooks";
import { Values, CommentsFormProps } from "./CommentsForm.type";
import styles from "./CommentsForm.module.scss";

import { TextAreaField } from "@/src/components";
import { PostButton } from "@/src/components/Post/components";

const initialValues = { comments: "" };

const CommentsForm: FC<CommentsFormProps> = ({
  id = 0,
  fetchData,
  setCommentsIsHide,
}) => {
  const [screenSize] = useGetScreenSize();

  const onHandleSubmit = (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    fetchData && fetchData(id);
    console.log(values);
    setCommentsIsHide(false);
    setSubmitting(false);
    resetForm();
  };

  const onHandleIconClick = () => {
    console.log("smile click");
  };

  const iconSize = screenSize < 769 ? 20 : 24;

  return (
    <Formik initialValues={initialValues} onSubmit={onHandleSubmit}>
      {({ isSubmitting, values, dirty }) => {
        return (
          <Form className={styles["comments-form"]}>
            <TextAreaField
              id="comments"
              placeholder="Add a comment ..."
              name="comments"
              dataAutomation="commentsInput"
              value={values.comments}
              iconSize={iconSize}
              onHandleIconClick={onHandleIconClick}
              classNames={styles["comments-form__field"]}
            />
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
