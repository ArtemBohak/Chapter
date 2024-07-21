import { FC, ChangeEvent } from "react";
import { useField, useFormikContext } from "formik";
import cn from "classnames";
import styles from "./SelectField.module.scss";

import { SelectFieldProps } from "./SelectField.type";

const SelectField: FC<SelectFieldProps> = ({
  id,
  className,
  label,
  name,
  options,
  type = "select",
  value,
  defaultValue,
  showSuccessIcon = false,
  dataAutomation,
  helperLink,
  customErrorMessage,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn({
    "text-field--has-error": isErrorValidation,
  });

  const onHandleChangeField = (event: ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(field.name, parseInt(event.target.value, 4));
    onChange && onChange(event);
  };

  return (
    <div className={cn("text-field", validationClassname, className)}>
      <label htmlFor={id} className="text-field__label">
        {label && <p className="text-field__label-text">{label}</p>}
        <div className="text-field__holder">
          <select
            {...field}
            id={id}
            data-automation={dataAutomation}
            {...props}
            value={value}
            defaultValue={defaultValue}
            className={"text-field__input"}
            onChange={onHandleChangeField}
          >
            {options.map((option, i) => (
              <option
                className={styles[`select-field__option-${option.value}`]}
                key={i}
                value={option.value}
              >
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </label>
    </div>
  );
};

export default SelectField;
