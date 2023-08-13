import { Field } from "formik";
import styles from "./RegisterPage.module.scss";
import { ChangeEvent } from "react";

const TextInput = ({
  id,
  labelText,
  labelClassName,
  name,
  setFieldValue,
  dataAutomation,
  fieldClassName,
  ...otherProps
}: {
  id: string;
  labelText: string;
  labelClassName: string;
  name: string;
  setFieldValue: (arg1: string, arg2: string) => string;
  dataAutomation: string;
  fieldClassName: string;
}) => (
  <>
    <label htmlFor={id} className={`${styles[labelClassName]}`}>
      {labelText}
    </label>
    <Field
      id={id}
      name={name}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setFieldValue(name, event.target.value)
      }
      data-automation={dataAutomation}
      className={fieldClassName}
      {...otherProps}
    />
  </>
);

export default TextInput;
