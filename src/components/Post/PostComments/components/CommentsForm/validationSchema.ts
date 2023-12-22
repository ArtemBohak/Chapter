import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  comments: Yup.string().trim().max(500),
});
