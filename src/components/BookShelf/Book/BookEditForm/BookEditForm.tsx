import { Form, Formik } from "formik";
import { FC, forwardRef } from "react";
import styles from "./BookEditForm.module.scss";
import { TextField, UIbutton } from "@/src/components";
import TextAreaField from "@/src/components/Fields/TextAreaField/TextAreaField";

const BookEditForm: FC = () => {
  return (
    <Formik
      initialValues={{
        title: "title",
        author: "author",
        annotation: "annotation",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
      }}
    >
      {() => (
        <Form className={styles["book-form-wrapper"]}>
          <TextAreaField
            id="title"
            name="title"
            dataAutomation="titleArea"
            placeholder="Enter book name"
            className={styles["book-form-wrapper__textarea-title"]}
          />
          <TextAreaField
            id="author"
            name="author"
            dataAutomation="authorArea"
            placeholder="Enter author name"
            className={styles["book-form-wrapper__textarea-author"]}
          />
          <TextAreaField
            id="annotation"
            name="annotation"
            dataAutomation="annotationArea"
            placeholder="Enter annotation"
            className={styles["book-form-wrapper__textarea-annotation"]}
          />
          {/* <button className="text-black w-1 h-1" type="submit">
            S
          </button> */}
        </Form>
      )}
    </Formik>
  );
};

export default BookEditForm;
