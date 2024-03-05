import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  text: Yup.string().trim().max(500),
});
