import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { useAppSelector } from "@/src/redux";
import { useGetScreenSize } from "@/src/hooks";
import { FormValues, CommentsFormProps } from "./CommentsForm.type";
import { validationSchema } from "./validationSchema";
import styles from "./CommentsForm.module.scss";

import { TextAreaField } from "@/src/components";
import { PostButton } from "@/src/components/Post/components";

const initialValues = { comments: "" };

const CommentsForm: FC<CommentsFormProps> = ({
  id,
  fetchData,
  setCommentsIsHide,
}) => {
  const {
    user: { avatarUrl },
  } = useAppSelector((state) => state.userSlice);
  const [screenSize] = useGetScreenSize();

  const onHandleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
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
    <div className={styles["form__content-wrapper"]}>
      <div className={styles["form__image"]}>
        <img src={avatarUrl} alt="user avatar" width={44} height={44} />
      </div>
      <div className={styles["form__comments-form-wrapper"]}>
        <Formik
          initialValues={initialValues}
          onSubmit={onHandleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, values, dirty, isValid }) => {
            return (
              <Form>
                <TextAreaField
                  id="comments"
                  placeholder="Add a comment ..."
                  name="comments"
                  dataAutomation="commentsInput"
                  value={values.comments}
                  iconSize={iconSize}
                  onHandleIconClick={onHandleIconClick}
                  classNames={styles["form__field"]}
                />
                <PostButton
                  type="submit"
                  dataAutomation="submitButton"
                  isLoading={isSubmitting}
                  isDisabled={!isValid || !dirty || isSubmitting}
                  className={styles["form__button"]}
                >
                  Send
                </PostButton>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CommentsForm;
