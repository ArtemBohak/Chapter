import {
  Icon,
  IconEnum,
  ImageField,
  TextAreaField,
  TextField,
  UIbutton,
} from "@/src/components";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import styles from "../EditBookModal.module.scss";
import { validationSchema } from "./validationSchema";
import { editBook, useAppDispatch, useAppSelector } from "@/src/redux";
import { EditBookFormProps, editBookProps } from "./EditBookForm.type";
import { SelectField } from "@/src/components/Fields/SelectField";
import { FilesService } from "@/src/services";
import { Path, apiUiMessage } from "@/src/types";
import { AxiosError } from "axios";
import { useErrorBoundary } from "@/src/hooks";

const EditBookForm: FC<EditBookFormProps> = ({
  bookId,
  setIsOpen,
  prevBookImagePath,
  currentBook,
}) => {
  const { id } = useAppSelector((state) => state.userSlice.user);
  const [bookImage, setbookImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setErrorBoundary = useErrorBoundary();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setbookImage(currentBook?.imagePath || "");
  }, [currentBook]);

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

  const onHandleSubmit = async (values: editBookProps) => {
    if (file || currentBook) {
      try {
        setError(null);
        setIsLoading(true);
        const body: editBookProps = {
          bookId: bookId,
          book_statusId: values.book_statusId,
          nameOfBook: values.nameOfBook,
          author: values.author,
          annotation: values.annotation,
          favorite_book_status: false,
          imagePath: bookImage,
        };
        if (file) {
          const files = new FilesService(id, setErrorBoundary);
          const res = await files.upload(file, {
            overwrite: false,
            path: Path.BOOKS,
          });
          if (res.code) return setError(apiUiMessage.ERROR_MESSAGE);

          body.imagePath = res.secure_url;

          prevBookImagePath && files.delete(prevBookImagePath);
        }

        dispatch(editBook(body));
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorBoundary(error);
          setError(apiUiMessage.ERROR_MESSAGE);
        }
      } finally {
        setIsLoading(false);
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {currentBook && (
        <Formik
          initialValues={{
            bookId: bookId,
            book_statusId: currentBook?.book_statusId,
            nameOfBook: currentBook?.nameOfBook,
            author: currentBook?.author,
            annotation: currentBook?.annotation,
            imagePath: currentBook?.imagePath,
            favorite_book_status: currentBook?.favorite_book_status,
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
                  {bookImage !== "" ? (
                    <div className={styles["form-conteiner__image-preview"]}>
                      <img
                        src={!file ? currentBook?.imagePath : bookImage}
                        alt="book cover"
                      />
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
                      classNames={styles["annotation-field"]}
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
                    onClick={() => setIsOpen(false)}
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
      )}
      {error && <div>{error}</div>}
    </>
  );
};

export default EditBookForm;
