import { FC, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Field, ErrorMessage, useField, useFormikContext } from "formik";
import cn from "classnames";

import { TextFieldProps } from "./TextField.type";
import "./TextField.scss";

import { Icon, IconEnum } from "@/src/components/Icon";

const TextField: FC<TextFieldProps> = ({
  id,
  className,
  label,
  name,
  type = "text",
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

  const isSuccessValidation = meta.touched && !meta.error;
  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn({
    "text-field--has-error": isErrorValidation,
  });

  const onHandleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, event.target.value);
    onChange && onChange(event);
  };

  return (
    <div className={cn("text-field", validationClassname, className)}>
      <label htmlFor={id} className="text-field__label">
        {label && <p className="text-field__label-text">{label}</p>}
        <div className="text-field__holder">
          <Field
            {...field}
            id={id}
            data-automation={dataAutomation}
            type={type}
            {...props}
            value={value}
            defaultValue={defaultValue}
            className={"text-field__input"}
            onChange={onHandleChangeField}
          />
          {showSuccessIcon && isSuccessValidation ? (
            <Icon icon={IconEnum.Ok} size={20} className="text-field__icon" />
          ) : null}
        </div>
      </label>
      <div className="text-field__helper-box">
        {isErrorValidation ? (
          <ErrorMessage
            name={name || "Field invalid"}
            component="p"
            className="text-field__error-message"
          />
        ) : null}
        {helperLink ? (
          <Link to={helperLink.href} className="text-field__helper-link">
            {helperLink.text}
          </Link>
        ) : null}
        {customErrorMessage ? (
          <p className="text-field__custom-error-message">
            {customErrorMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default TextField;
