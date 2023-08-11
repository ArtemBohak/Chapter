import { FC } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";

type Props = {
  fieldArray: { name: string; label: string }[];
  formName: string;
};

const RegisterForm: FC<Props> = ({ fieldArray, formName }) => {
  return (
    <Formik
      initialValues={{ [formName]: fieldArray }}
      onSubmit={(values): void => {
        console.log(values);
      }}
    >
      {(formikProps) => (
        <Form>
          <FieldArray
            name={formName}
            render={() =>
              formikProps.values[formName].map((item, index) => (
                <div key={index}>
                  <label htmlFor={item.name}>{item.label}</label>
                  <Field
                    id={item.name}
                    type={item.name}
                    name={item.name}
                    data-automation={`${item.name}Input`}
                  />
                </div>
              ))
            }
          />
          <UIbutton
            dataAutomation="submitButton"
            // type="submit"
            title="Create new account "
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
