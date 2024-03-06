import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { AxiosError, AxiosResponse } from "axios";

import { useAppSelector } from "@/src/redux";
import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary, useGetScreenSize } from "@/src/hooks";
import { ElementsId, IPost } from "@/src/types";
import { postsCB, tabScreen } from "@/src/utils";
import { FormValues, CommentsFormProps, BodyValues } from "./CommentsForm.type";
import { FeedType } from "@/src/services/PostApi/PostApi.type";
import styles from "./CommentsForm.module.scss";

import { TextAreaField } from "@/src/components";
import { PostButton } from "@/src/components/Post/components";

const initialValues = { text: "" };
const CommentsForm: FC<CommentsFormProps> = ({
  postId,
  commentId,
  nickName,
  replyToUserId,
  setCommentsIsHide,
  setFeeds,
  handleNickname,
}) => {
  const {
    user: { avatarUrl },
  } = useAppSelector((state) => state.userSlice);
  const setErrorBoundary = useErrorBoundary();
  const [screenSize] = useGetScreenSize();

  const onHandleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      let body: BodyValues = { ...values };
      if (nickName && replyToUserId && values.text.includes(nickName)) {
        const [, text] = values.text.split(": ");
        body = {
          ...body,
          recipientNickName: nickName,
          recipientId: replyToUserId,
          text,
        };
      }

      if (commentId !== null) {
        const { data }: AxiosResponse<IPost> = await api.post(
          EndpointsEnum.COMMENTS + commentId + "/to-comment",
          body
        );
        return setFeeds && setFeeds(postsCB<FeedType>(data, "postId"));
      }
      const { data }: AxiosResponse<IPost> = await api.post(
        EndpointsEnum.COMMENTS + postId,
        values
      );
      setFeeds && setFeeds(postsCB<FeedType>(data, "postId"));
      setCommentsIsHide && setCommentsIsHide(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    } finally {
      setSubmitting(false);
      resetForm();
      handleNickname();
    }
  };

  const onValidate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (nickName && values.text.includes(nickName)) {
      const [, text] = values.text.split(": ");

      if (!text) errors.text = "";
      else if (text.length > 500) errors.text = "";
    } else {
      if (!values.text) errors.text = "";
      else if (values.text.length > 500) errors.text = "";
    }

    return errors;
  };

  const iconSize = screenSize < tabScreen ? 20 : 24;
  return (
    <div id={`${ElementsId.POST_FORM}${postId}`} className={styles["comments"]}>
      <div className={styles["comments__avatar"]}>
        <img src={avatarUrl} alt="user avatar" width={44} height={44} />
      </div>
      <div className={styles["comments__form"]}>
        <Formik
          initialValues={initialValues}
          onSubmit={onHandleSubmit}
          validate={onValidate}
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
                  classNames={styles["comments__field"]}
                  nickName={nickName}
                  handleNickname={handleNickname}
                />
                <PostButton
                  type="submit"
                  dataAutomation="submitButton"
                  isLoading={isSubmitting}
                  isDisabled={!isValid || !dirty || isSubmitting}
                  className={styles["comments__button"]}
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
