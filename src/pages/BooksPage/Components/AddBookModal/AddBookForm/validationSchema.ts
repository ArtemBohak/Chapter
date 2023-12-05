import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  bookTitle: Yup.string().required("Title is required").trim(),
  bookAuthor: Yup.string().required('Author is required').trim(),
  annotation: Yup.string().trim(),
});