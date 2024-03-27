import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  book_statusId: Yup.number(),
  nameOfBook: Yup.string().required("Title is required").trim().matches(/^.{1,100}$/, 'Book name should have a maximum of 100 characters.'),
  author: Yup.string().required("author is required").trim().matches(/^.{1,50}$/, 'Author name should have a maximum of 50 characters.'),
  annotation: Yup.string().required("annotation is required").trim(),
  imagePath: Yup.string().trim(),
});