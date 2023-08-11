import FormWrapper from "@/src/components/Forms/FormWrapper/FormWrapper";
import * as Yup from "yup";
// import TextField from "@/src/components/Fields/TextField/TextField";
// import PasswordField from "@/src/components/Fields/PasswordField/PasswordField";
import { baseValidation } from "@/src/utils/regex/password-regex";

const TestingForm = () => {
  const validationSchema = Yup.object({
    fullname: Yup.string().required("This field can't be empty"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        baseValidation,
        "Password must be at least 8 characters long, including uppercase letters and special characters"
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <FormWrapper
      initialValues={{
        fullname: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // temp
        setTimeout(() => {
          console.log("values", values);
          setSubmitting(false);
        }, 1000);
      }}
    >
    </FormWrapper>
  );
};

export default TestingForm;
