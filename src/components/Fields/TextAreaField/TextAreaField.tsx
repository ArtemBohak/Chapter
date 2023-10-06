import { Field, useField, useFormikContext } from "formik";
import { ChangeEvent, FC } from "react";
import styles from "./TextAreaField.module.scss";
import { TextAreaFieldProps } from "./TextField.type";
const TextAreaField: FC<TextAreaFieldProps> = ({
  id,
  className,
  name,
  type = "text",
  value,
  defaultValue,
  dataAutomation,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const onHandleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, event.target.value);
    onChange && onChange(event);
  };
  return (
    <Field
      as="textarea"
      {...field}
      id={id}
      data-automation={dataAutomation}
      type={type}
      {...props}
      value={value}
      defaultValue={defaultValue}
      className={className}
      onChange={onHandleChangeField}
    />
  );
};

export default TextAreaField;
