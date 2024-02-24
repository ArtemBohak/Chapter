import {
  Icon,
  IconEnum,
  ImageField,
  TextAreaField,
  TextField,
  UIbutton,
} from "@/src/components";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import styles from "../AddBookModal.module.scss";
import { validationSchema } from "./validationSchema";
import { addNewBook, fetchFavoriteBookStatus, useAppDispatch, useAppSelector } from "@/src/redux";
import { bookProps } from "./AddBookForm.type";
import { SelectField } from "@/src/components/Fields/SelectField";
import { useBooksPageContext } from "@/src/pages/BooksPage/context";
import { FilesService } from "@/src/services";
import { Path, apiUiMessage } from "@/src/types";
import { AxiosError } from "axios";
import { useErrorBoundary } from "@/src/hooks";

const AddBookForm: FC = () => {
  const { setIsAddBookModalOpen } = useBooksPageContext();
  const { id } = useAppSelector((state) => state.userSlice.user);
  const [bookImage, setbookImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setErrorBoundary = useErrorBoundary();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

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

  const onHandleRemoveClick = () => {
    setbookImage("");
    setFile(null);
  };

  const onHandleSubmit = async (values: bookProps) => {
    if (file) {
      try {
        setError(null);
        setIsLoading(true);
        const body: bookProps = {
          book_statusId: values.book_statusId,
          nameOfBook: values.nameOfBook,
          author: values.author,
          annotation: values.annotation,
          favorite_book_status: false,
          imagePath: "",
        };
        if (file) {
          const res = await new FilesService(
            id,
            file,
            undefined,
            setErrorBoundary
          ).upload({
            overwrite: false,
            path: Path.BOOKS,
          });
          if (res.code) {
            return setError(apiUiMessage.ERROR_MESSAGE);
          }
          body.imagePath = res.secure_url;
        }
        dispatch(addNewBook(body));
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorBoundary(error);
          setError(apiUiMessage.ERROR_MESSAGE);
        }
      } finally {
        setIsLoading(false);
        setIsAddBookModalOpen(false);
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          book_statusId: 1,
          nameOfBook: "",
          author: "",
          annotation: "",
          imagePath: bookImage,
          favorite_book_status: false,
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
                {file ? (
                  <div className={styles["form-conteiner__image-preview"]}>
                    <img src={bookImage} alt="book cover" />
                    <button
                      className={
                        styles["form-conteiner__image-preview-remove-button"]
                      }
                      onClick={onHandleRemoveClick}
                      data-automation="clickButton"
                    >
                      <Icon icon={IconEnum.Cross} size={20} />
                    </button>
                  </div>
                ) : (
                  <ImageField
                    classNames={styles["form-conteiner__add-book-image"]}
                    btnVariant={"book"}
                    setFile={setFile}
                    setImage={setbookImage}
                    isLoading={isLoading}
                  />
                )}
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
                  // onHandleIconClick={() => { }}
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
      {error && <div>{error}</div>}
    </>
  );
};

export default AddBookForm;
