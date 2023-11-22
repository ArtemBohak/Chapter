import { FC } from "react";
import { Formik, Form } from "formik";

import { useAppSelector } from "@/src/redux";
import { validationSchema } from "./validationSchema";
import { CreatePostFormProps, PostValues } from "./CreatePostForm.type";
import styles from "./CreatePostForm.module.scss";
import {
  Icon,
  IconEnum,
  ImageField,
  TextAreaField,
  TextField,
  UIbutton,
} from "@/src/components";

const CreatePostForm: FC<CreatePostFormProps> = ({
  setFormIsOpen,
  setImage,
  setTitle,
  setText,
  title,
  text,
  image,
}) => {
  const { id } = useAppSelector((state) => state.userSlice.user);
  const onSubmit = (values: PostValues) => {
    setTitle(values.title);
    setText(values.text);
    setFormIsOpen(false);
  };
  const onHandleIconClick = () => {
    console.log("icon");
  };

  const onHandleRemoveClick = () => {
    setImage("");
  };
  return (
    <Formik
      initialValues={{ title, text }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, isValid, touched }) => {
        return (
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
            {image ? (
              <div className={styles["form__image-wrapper"]}>
                <button
                  onClick={onHandleRemoveClick}
                  data-automation="clickButton"
                >
                  <Icon icon={IconEnum.Cross} size={20} />
                </button>
                <img src={image} alt="post image" />
              </div>
            ) : null}
            <TextAreaField
              id="text"
              dataAutomation="commentInput"
              name="text"
              placeholder="Add a text"
              value={values.text}
              onHandleIconClick={onHandleIconClick}
              classNames={styles["form__comment"]}
            />
            <div className={styles["form__button-wrapper"]}>
              <UIbutton
                type="submit"
                dataAutomation="submitButton"
                disabled={!touched || !isValid}
                fullWidth
              >
                Confirm
              </UIbutton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreatePostForm;
