import { UIbutton } from "@/src/components/Buttons";
import { PasswordField, TextField } from "@/src/components/Fields";
import { useFormikContext } from "formik";

const InterestingForm = () => {
  const formikContext = useFormikContext<{
    fullname: string;
    password: string;
    confirmPassword: string;
  }>();
  console.log(formikContext);

  return (
    <>
      <TextField
        id="fullname"
        name="fullname"
        label="Full Name"
        placeholder="Full Name"
        dataAutomation="fullname"
      />
      <PasswordField
        id="password"
        name="password"
        label="Create password"
        placeholder="Enter your password"
        strength
        dataAutomation="password"
      />
      <PasswordField
        id="confirm_password"
        name="confirm_password"
        label="Confirm password"
        placeholder="Re-enter your password"
        dataAutomation="confirm_password"
      />
      <UIbutton
        dataAutomation="submitButton"
        disabled={!formikContext.dirty && formikContext.isValid}
        isLoading={formikContext.isSubmitting}
      >
        Submit
      </UIbutton>
    </>
  );
};

export default InterestingForm;
