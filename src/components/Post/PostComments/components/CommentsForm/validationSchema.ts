import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  comments: Yup.string().max(500).trim(),
});
