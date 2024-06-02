import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  book_statusId: Yup.number(),
  nameOfBook: Yup.string().required("Title is required").trim().matches(/^.{1,80}$/, 'Book name should have a maximum of 30 characters.'),
  author: Yup.string().required("author is required").trim().matches(/^.{1,30}$/, 'Author name should have a maximum of 30 characters.'),
  annotation: Yup.string().required("annotation is required").trim(),
  imagePath: Yup.string().trim(),
});