import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import { useAppSelector } from "@/src/redux";
import { useErrorBoundary, useGetScreenSize } from "@/src/hooks";
import { tabScreen } from "@/src/utils";
import { FormValues, CommentsFormProps } from "./CommentsForm.type";
import { validationSchema } from "./validationSchema";
import styles from "./CommentsForm.module.scss";

import { TextAreaField } from "@/src/components";
import { PostButton } from "@/src/components/Post/components";
import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";

const initialValues = { text: "" };

const CommentsForm: FC<CommentsFormProps> = ({
  postId,
  commentId,
  setCommentId,
  setCommentsIsHide,
  setNickName,
}) => {
  const setErrorBoundary = useErrorBoundary();
  const {
    user: { avatarUrl },
  } = useAppSelector((state) => state.userSlice);
  const [screenSize] = useGetScreenSize();

  const onHandleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      if (commentId) {
        await api.post(
          EndpointsEnum.COMMENTS + commentId + "/to-comment",
          values
        );
        setSubmitting(false);
        setCommentId(null);
        return resetForm();
      }
      await api.post(EndpointsEnum.COMMENTS + postId, values);

      setCommentsIsHide && setCommentsIsHide(false);
      setSubmitting(false);
      setNickName("");
      resetForm();
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    }
  };

  const iconSize = screenSize < tabScreen ? 20 : 24;
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
                  id="text"
                  placeholder="Add a comment ..."
                  name="text"
                  dataAutomation="textInput"
                  value={values.text}
                  iconSize={iconSize}
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
