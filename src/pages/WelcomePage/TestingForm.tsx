import FormWrapper from "@/src/components/Forms/FormWrapper";
import * as Yup from "yup";
import TextField from "@/src/components/Fields/TextField/TextField";

const TestingForm = () => {
  const validationSchema = Yup.object({
    fullname: Yup.string().required("Please enter a valid name."),
  });
  return (
    <FormWrapper
      initialValues={{
        fullname: "",
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
      <TextField
        id="fullname"
        name="fullname"
        label="Full Name"
        placeholder="Full Name"
        dataAutomation="fullname"
      />
    </FormWrapper>
  );
};

export default TestingForm;
