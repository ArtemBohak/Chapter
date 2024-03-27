import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().max(100, "Too long!").trim(),
  caption: Yup.string().max(500, "Too long!").trim(),
});
