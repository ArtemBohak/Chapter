import { FC } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";
import { createObject, findKeys } from "@/src/pages/RegisterPage/helpers";

type Props = {
  fields: { label: string; type: string; [field: string]: string }[];
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
              {props.values[formName].map((item, index) => {
                const [keys] = findKeys(item);
                return (
                  <div key={index}>
                    <label htmlFor={keys}>{item.label}</label>
                    <Field
                      id={keys}
                      type={item.type}
                      name={`${formName}[${index}].${keys}`}
                      value={item[keys]}
                      data-automation={`${keys}Input`}
                      onChange={props.handleChange}
                    />
                  </div>
                );
              })}
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
