import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { AxiosError, AxiosResponse } from "axios";

import { useAppSelector } from "@/src/redux";
import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary, useGetScreenSize } from "@/src/hooks";
import { IPost } from "@/src/types";
import { feedsCB, tabScreen } from "@/src/utils";
import { FormValues, CommentsFormProps, BodyValues } from "./CommentsForm.type";
import { validationSchema } from "./validationSchema";
import styles from "./CommentsForm.module.scss";

import { TextAreaField } from "@/src/components";
import { PostButton } from "@/src/components/Post/components";

const initialValues = { text: "" };

const CommentsForm: FC<CommentsFormProps> = ({
  postId,
  commentId,
  nickName,
  replyToUserId,
  setCommentId,
  setCommentsIsHide,
  setFeeds,
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
        let body: BodyValues = { ...values };
        if (nickName && replyToUserId) {
          body = { ...body, nickName, id: replyToUserId };
        }
        const { data }: AxiosResponse<IPost> = await api.post(
          EndpointsEnum.COMMENTS + commentId + "/to-comment",
          body
        );
        setFeeds && setFeeds(feedsCB(data));
        setSubmitting(false);

        return setCommentId(null);
      }
      const { data }: AxiosResponse<IPost> = await api.post(
        EndpointsEnum.COMMENTS + postId,
        values
      );

      setFeeds && setFeeds(feedsCB(data));
      setCommentsIsHide && setCommentsIsHide(false);
      setSubmitting(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    } finally {
      resetForm();
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
