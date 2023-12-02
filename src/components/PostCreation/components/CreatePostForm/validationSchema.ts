import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").trim(),
  comment: Yup.string().trim(),
});
