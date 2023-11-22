import { FC } from "react";
import { Formik, Form } from "formik";

import { useAppSelector } from "@/src/redux";
import { validationSchema } from "./validationSchema";
import { CreatePostFormProps, PostCreateValues } from "./CreatePostForm.type";
import styles from "./CreatePostForm.module.scss";
import {
  ImageField,
  TextAreaField,
  TextField,
  UIbutton,
} from "@/src/components";

const CreatePostForm: FC<CreatePostFormProps> = ({
  setFormIsOpen,
  setImage,
  setTitle,
  setComment,
  title,
  comment,
  image,
}) => {
  const { id } = useAppSelector((state) => state.userSlice.user);
  const onSubmit = (values: PostCreateValues) => {
    setTitle(values.title);
    setComment(values.comment);
    setFormIsOpen(false);
  };
  const onHandleIconClick = () => {
    console.log("icon");
  };

  return (
    <Formik
      initialValues={{ title, comment }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, isValid, dirty }) => (
        <Form>
          <TextField
            id="title"
            name="title"
            dataAutomation="titleInput"
            label="Add a title"
            value={values.title}
            className={styles["form__title"]}
          />
          <ImageField
            id={id}
            btnVariant="icon"
            imageType="post"
            iconSize={48}
            setImage={setImage}
          />
          <div className={styles["form__image-wrapper"]}>
            {image ? <img src={image} alt="post image" /> : null}
          </div>
          <TextAreaField
            id="comments"
            dataAutomation="commentInput"
            name="comment"
            placeholder="Add a text"
            value={values.comment}
            onHandleIconClick={onHandleIconClick}
            classNames={styles["form__comment"]}
          />
          <div className={styles["form__button-wrapper"]}>
            <UIbutton
              type="submit"
              dataAutomation="submitButton"
              disabled={!isValid || !dirty}
              fullWidth
            >
              Confirm
            </UIbutton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePostForm;
