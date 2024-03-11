import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  text: Yup.string().max(500, "Too long!").trim(),
});
