import { FC } from "react";
import { Formik, Form, Field, FieldArray } from "formik";

import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";

import { createObject, findKeys } from "@/src/pages/RegisterPage/helpers";

import styles from "./CustomForm.module.scss";

type Props = {
  fields: { label: string; type: string; [field: string]: string }[];
  formName: string;
};

const CustomForm: FC<Props> = ({ fields, formName }) => {
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
            <Form className="max-w-[327px]">
              {props.values[formName].map((item, index) => {
                const [keys] = findKeys(item);
                return (
                  <div key={index}>
                    <label htmlFor={keys} className={`${styles["label"]}`}>
                      {item.label}
                    </label>
                    <Field
                      id={keys}
                      type={item.type}
                      name={`${formName}[${index}].${keys}`}
                      value={item[keys]}
                      data-automation={`${keys}Input`}
                      onChange={props.handleChange}
                      className="w-[327px] h-[35px] mb-[15px] px-2 py-1 rounded-[5px] border border-gray-1030"
                    />
                  </div>
                );
              })}
              <UIbutton
                dataAutomation="submitButton"
                // type="submit"
                title="Create new account"
                className="bg-orange-1200 text-white w-[327px] h-11 rounded-[5px] mb-[10px]"
              />
            </Form>
          )}
        </FieldArray>
      )}
    </Formik>
  );
};

export default CustomForm;
