import { FC } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";
import { createObject } from "@/src/pages/RegisterPage/helpers/createObject";

type Props = {
  fields: { value: string; label: string; type: string; name: string }[];
  formName: string;
};

const RegisterForm: FC<Props> = ({ fields, formName }) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ [formName]: [...fields] }}
      onSubmit={(values): void => {
        const value = createObject(values[formName]);
        console.log(value);
      }}
    >
      {(props) => (
        <FieldArray name={formName}>
          {() => (
            <Form>
              {props.values[formName].map((item, index) => (
                <div key={index}>
                  <label htmlFor={item.name}>{item.label}</label>
                  <Field
                    id={item.name}
                    type={item.type}
                    name={`${formName}[${index}].value`}
                    value={item.value}
                    data-automation={`${item.name}Input`}
                    onChange={props.handleChange}
                  />
                </div>
              ))}
              <UIbutton
                dataAutomation="submitButton"
                // type="submit"
                title="Create new account "
              />
            </Form>
          )}
        </FieldArray>
      )}
    </Formik>
  );
};

export default RegisterForm;
