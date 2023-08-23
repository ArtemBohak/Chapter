import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { Field, ErrorMessage, useField } from "formik";

import { Icon, IconEnum } from "@/src/components/Icon";

import { TextFieldProps } from "./TextField.type";

import styles from "./TextField.module.scss";

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
  ...props
}) => {
  const [field, meta] = useField(name);

  const isSuccessValidation = meta.touched && !meta.error;
  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn({
    [styles["text-field--has-error"]]: isErrorValidation,
  });

  return (
    <div className={cn(styles["text-field"], validationClassname, className)}>
      <label htmlFor={id} className={styles["text-field__label"]}>
        {label && <p className={styles["text-field__label-text"]}>{label}</p>}
        <div className={styles["text-field__holder"]}>
          <Field
            {...field}
            id={id}
            data-automation={dataAutomation}
            type={type}
            {...props}
            value={value}
            defaultValue={defaultValue}
            className={styles["text-field__input"]}
          />
          {showSuccessIcon && isSuccessValidation ? (
            <Icon
              icon={IconEnum.Ok}
              size={20}
              className={styles["text-field__icon"]}
            />
          ) : null}
        </div>
      </label>
      <div className={styles["text-field__helper-box"]}>
        {isErrorValidation ? (
          <ErrorMessage
            name={name || "Field invalid"}
            component="p"
            className={styles["text-field__error-message"]}
          />
        ) : null}
        {helperLink ? (
          <Link
            to={helperLink.href}
            className={styles["text-field__helper-link"]}
          >
            {helperLink.text}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default TextField;
