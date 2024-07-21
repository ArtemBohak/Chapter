import { FC } from "react";
import { Formik, Form } from "formik";

import { validationSchema } from "./validationSchema";
import { EditPostFormProps, PostValues } from "./EditPostForm.type";
import styles from "./EditPostForm.module.scss";
import {
    Icon,
    IconEnum,
    ImageField,
    TextAreaField,
    TextField,
    UIbutton,
} from "@/src/components";

const EditePostForm: FC<EditPostFormProps> = ({
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
        if (values.title && values.title?.length < 0) {

        }
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
                            label="Edit title"
                            value={values.title || ""}
                            className={styles["form__title"]}
                        />
                        <ImageField
                            btnVariant="icon"
                            iconSize={48}
                            setImage={setImage}
                            setFile={setFile}
                        />
                        <p className={styles["image-label"]}>.png, .jpg, .gif</p>
                        {imgUrl ? (
                            <div className={styles["form__image-wrapper"]}>
                                <button
                                    type="button"
                                    onClick={onHandleRemoveClick}
                                    data-automation="clickButton"
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
                        />
                        <div className={styles["form__button-wrapper"]}>
                            <UIbutton
                                type="submit"
                                dataAutomation="submitButton"
                                disabled={
                                    (!imgUrl && !values.caption && !values.title) || !isValid
                                }
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

export default EditePostForm;
