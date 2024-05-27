import { FC } from "react";
import { Formik, Form } from "formik";

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
  setCaption,
  setFile,
  title,
  caption,
  imgUrl,
}) => {

  const initialValues = { title, caption };
  const onSubmit = (values: PostValues) => {
    setTitle(values.title || "");
    setCaption(values.caption || "");

    setFormIsOpen(false);
  };

  const onHandleRemoveClick = () => {
    setImage("");
    setFile(null);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount
      
    >
      {({ values, isValid }) => {
        return (
          <Form>
            <TextField
              id="title"
              name="title"
              dataAutomation="titleInput"
              label="Add a title"
              value={values.title || ""}
              className={styles["form__title"]}
              aria-label="Title input field"
              onChange={(e) => setTitle(e.target.value)}
            />
            <ImageField
              btnVariant="icon"
              iconSize={48}
              setImage={setImage}
              setFile={setFile}
            />
            <p className={styles["image__label"]}>.png, .jpg, .gif</p>
            {imgUrl ? (
              <div className={styles["form__image"]}>
                <button
                  onClick={onHandleRemoveClick}
                  data-automation="clickButton"
                  aria-label="Image delete button"
                >
                  <Icon icon={IconEnum.Cross} size={20} />
                </button>
                <img src={imgUrl} alt="post image" />
              </div>
            ) : null}
            <TextAreaField
              id="caption"
              dataAutomation="commentInput"
              name="caption"
              placeholder="Add a text"
              value={values.caption || ""}
              classNames={styles["form__comment"]}
              aria-label="Caption textarea field"
              changeCaption={setCaption}
            />
            <div className={styles["form__button"]}>
              <UIbutton
                type="submit"
                dataAutomation="submitButton"
                disabled={
                  (!imgUrl && !values.caption && !values.title) || !isValid
                }
                fullWidth
                aria-label="Form submit button"
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
