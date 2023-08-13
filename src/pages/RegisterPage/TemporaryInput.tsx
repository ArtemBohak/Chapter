import { Field } from "formik";
import styles from "./RegisterPage.module.scss";

const TextInput = ({
  id,
  type,
  name,
  value,
  dataAutomation,
  onChange,
  labelClassName,
  fieldClassName,
  labelText,
}: {
  id: string;
  type: string;
  name: string;
  value: string;
  dataAutomation: string;
  className: string;
  labelText: string;
  labelClassName: string;
  fieldClassName: string;
  onChange: () => void;
}) => (
  <>
    <label htmlFor={id} className={`${styles[labelClassName]}`}>
      {labelText}
    </label>
    <Field
      id={id}
      type={type}
      name={name}
      value={value}
      data-automation={dataAutomation}
      onChange={onChange}
      className={fieldClassName}
    />
  </>
);

export default TextInput;
