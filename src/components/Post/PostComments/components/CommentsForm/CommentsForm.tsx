import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { AxiosError, AxiosResponse } from "axios";

import { useAppSelector } from "@/src/redux";
import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary, useGetScreenSize } from "@/src/hooks";
import { IPost } from "@/src/types";
import { tabScreen } from "@/src/utils";
import { FormValues, CommentsFormProps } from "./CommentsForm.type";
import { validationSchema } from "./validationSchema";
import styles from "./CommentsForm.module.scss";

import { TextAreaField } from "@/src/components";
import { PostButton } from "@/src/components/Post/components";

const initialValues = { text: "" };

const feedsCb = (feed: IPost) => (feeds: Array<IPost>) => {
  const feedsC = [...feeds];
  const existingObj = feedsC.findIndex((el) => el.postId === feed.postId);
  if (existingObj !== -1) {
    feedsC[existingObj] = { ...feedsC[existingObj], ...feed };
  }

  return feedsC;
};

const CommentsForm: FC<CommentsFormProps> = ({
  postId,
  commentId,
  setCommentId,
  setCommentsIsHide,
  setNickName,
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
        const { data }: AxiosResponse<IPost> = await api.post(
          EndpointsEnum.COMMENTS + commentId + "/to-comment",
          values
        );
        setFeeds && setFeeds(feedsCb(data));
        setSubmitting(false);
        setCommentId(null);
        setNickName("");
        return resetForm();
      }
      const { data }: AxiosResponse<IPost> = await api.post(
        EndpointsEnum.COMMENTS + postId,
        values
      );

      setFeeds && setFeeds(feedsCb(data));
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
