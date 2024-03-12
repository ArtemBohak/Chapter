import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { AxiosError, AxiosResponse } from "axios";

import { useAppSelector } from "@/src/redux";
import { validationSchema } from "./validationSchema";
import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary, useGetScreenSize } from "@/src/hooks";
import { ElementsId, PostType } from "@/src/types";
import { postsCB, tabScreen } from "@/src/utils";
import { FormValues, CommentsFormProps, BodyValues } from "./CommentsForm.type";

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
  setPosts,
  setPost,
  handleNickname,
}) => {
  const {
    user: { avatarUrl },
  } = useAppSelector((state) => state.userSlice);
  const setErrorBoundary = useErrorBoundary();
  const [screenSize] = useGetScreenSize();

  const onHandleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
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
    try {
      if (commentId !== null) {
        const { data }: AxiosResponse<PostType> = await api.post(
          EndpointsEnum.COMMENTS + commentId + "/to-comment",
          body
        );
        setPosts && setPosts(postsCB<PostType>(data, "postId"));

        setPost && setPost(data);
        return resetForm();
      }

      const { data }: AxiosResponse<PostType> = await api.post(
        EndpointsEnum.COMMENTS + postId,
        values
      );
      setPosts && setPosts(postsCB<PostType>(data, "postId"));
      setPost && setPost(data);
      setCommentsIsHide(false);
      resetForm();
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
        setFieldError("text", e.response?.data.errors.text);
      }
    } finally {
      setSubmitting(false);
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
