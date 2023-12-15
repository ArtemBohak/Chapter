import {
  ImageField,
  TextAreaField,
  TextField,
  UIbutton,
} from "@/src/components";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import styles from "../AddBookModal.module.scss";
import { validationSchema } from "./validationSchema";
import { ProfileUpdateApi } from "@/src/pages/SettingsPage/utils/ProfileUpdateApi";
import { useAppSelector } from "@/src/redux";
import AddBookApi from "./AddBookApi";
import { bookProps } from "./AddBookForm.type";
import { SelectField } from "@/src/components/Fields/SelectField";
import { useBooksPageContext } from "@/src/pages/BooksPage/context";

const AddBookForm: FC = () => {
  const { setIsAddBookModalOpen } = useBooksPageContext();
  const { user } = useAppSelector((state) => state.userSlice);
  const { userBooks } = user;
  const [bookImageUrl, setbookImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    {
      value: "1",
      text: "Goin to read 📚",
    },
    {
      value: "2",
      text: "Reading 📖",
    },
    {
      value: "3",
      text: "Finished book 📗",
    },
  ];

  useEffect(() => {
    setbookImageUrl("");
  }, [userBooks]);

  useEffect(() => {
    file &&
      new ProfileUpdateApi(setIsLoading, setError).imageSave(user.id, file);
  }, [file, user.id]);

  const onHandleSubmit = async (values: bookProps) => {
    const response = await AddBookApi(values);
    console.log(response);
    setIsAddBookModalOpen(false);
  };

  return (
    <Formik
      initialValues={{
        book_statusId: 1,
        nameOfBook: "",
        author: "",
        annotation: "",
        imagePath: bookImageUrl,
      }}
      onSubmit={async (values) => {
        await onHandleSubmit(values);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, values, isValid }) => {
        return (
          <Form className={styles["form-conteiner"]}>
            <div className={styles["form-conteiner__wrapper"]}>
              <ImageField
                classNames={styles["form-conteiner__add-book-image"]}
                btnVariant={"book"}
                setFile={setFile}
                isLoading={isLoading}
                error={error}
              />
              <div className={styles["form-conteiner__book-text"]}>
                <SelectField
                  id={"book_statusId"}
                  name={"book_statusId"}
                  dataAutomation={"book_statusId-select"}
                  options={options}
                />
                <TextField
                  id={"nameOfBook"}
                  name={"nameOfBook"}
                  value={values.nameOfBook}
                  placeholder="Book Title"
                  dataAutomation={"bookTitle-field"}
                />
                <TextField
                  id={"author"}
                  name={"author"}
                  value={values.author}
                  placeholder="Book Author"
                  dataAutomation={"bookAuthor-field"}
                />
                <TextAreaField
                  id={"annotation"}
                  placeholder={"annotation"}
                  name={"annotation"}
                  value={values.annotation}
                  dataAutomation={"bookAnnotation-field"}
                  iconSize={0}
                  onHandleIconClick={() => {}}
                />
              </div>
            </div>
            <div className={styles["form-conteiner__buttons"]}>
              <UIbutton
                onClick={() => setIsAddBookModalOpen(false)}
                type="reset"
                fullWidth
                variant="outlined"
                color="primary"
                dataAutomation="submitButton"
              >
                Cancel
              </UIbutton>
              <UIbutton
                isLoading={isSubmitting}
                disabled={!isValid}
                type="submit"
                fullWidth
                dataAutomation="submitButton"
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

export default AddBookForm;
