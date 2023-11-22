import { FC } from "react";
import { Formik, Form } from "formik";

import { FormProps, PostCreateValues } from "./CreatePostForm.type";
import styles from "./CreatePostForm.module.scss";
import { ImageField, TextField } from "@/src/components";
import { useAppSelector } from "@/src/redux";

const initialValues: PostCreateValues = { title: "", comment: "" };

const CreatePostForm: FC<FormProps> = ({
  setIsForm,
  setImage,
  setTitle,
  setComment,
  image,
}) => {
  const { id } = useAppSelector((state) => state.userSlice.user);
  const onSubmit = (values: PostCreateValues) => {
    setTitle(values.title);
    setComment(values.comment);
    setIsForm(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
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
        </Form>
      )}
    </Formik>
  );
};

export default CreatePostForm;
