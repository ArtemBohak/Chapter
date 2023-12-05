import { ImageInput, TextAreaField, TextField } from "@/src/components";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { FC } from "react";
import styles from "../AddBookModal.module.scss";
import { validationSchema } from "./validationSchema";

const AddBookForm: FC = () => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {}}
      validationSchema={validationSchema}
    >
      <Form className={styles["form-conteiner"]}>
        <ImageInput id={""} btnVariant={"button"} imageType={"post"} />
        <div className={styles["book-text"]}>
          <TextField
            id={"bookTitle"}
            name={"bookTitle"}
            placeholder="Book Title"
            dataAutomation={""}
          />
          <TextField
            id={"bookAuthor"}
            name={"bookAuthor"}
            placeholder="Book Author"
            dataAutomation={""}
          />
          <TextAreaField
            id={""}
            placeholder={""}
            name={""}
            value={""}
            dataAutomation={""}
            iconSize={0}
            onHandleIconClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default AddBookForm;
