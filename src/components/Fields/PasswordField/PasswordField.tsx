import { ChangeEvent, FC, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { Field, ErrorMessage, useField, useFormikContext } from "formik";

import { PasswordFieldProps } from "./PasswordField.type";

import { Icon, IconEnum } from "@/src/components/Icon";

import {
  usePasswordStrength,
  TypePasswordStrength,
} from "./usePasswordStrength";

import styles from "./PasswordField.module.scss";

const PasswordField: FC<PasswordFieldProps> = ({
  id,
  className,
  label,
  name,
  value,
  defaultValue,
  dataAutomation,
  strength,
  helperLink,
  ...props
}) => {
  const [field, meta] = useField(name);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext();
  const { passwordStrength, passwordValue, LENGTH_STRENGTH, onHandleChange } =
    usePasswordStrength();

  const typePasswordStrengthClassname = cn({
    [TypePasswordStrength.WEAK]: passwordStrength === 1,
    [TypePasswordStrength.OKEY]: passwordStrength === 2,
    [TypePasswordStrength.STRONG]: passwordStrength === 3,
  });

  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn({
    [styles["text-field--success"]]: meta.touched && !meta.error,
    [styles["text-field--has-error"]]: isErrorValidation,
  });

  const onHandleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    onHandleChange(event.target.value);
    setFieldValue(field.name, event.target.value);
  };

  return (
    <div className={cn(styles["text-field"], validationClassname, className)}>
      <label htmlFor={id} className={styles["text-field__label"]}>
        {label && <p className={styles["text-field__label-text"]}>{label}</p>}
        <div className={styles["text-field__holder"]}>
          <Field
            {...field}
            {...props}
            id={id}
            name={name}
            data-automation={dataAutomation}
            type={isVisiblePassword ? "text" : "password"}
            value={value}
            defaultValue={defaultValue}
            className={styles["text-field__input"]}
            onChange={onHandleChangeField}
          />
          <Icon
            icon={isVisiblePassword ? IconEnum.Eye : IconEnum.Eye_Off}
            size={18}
            color="#8E8E93"
            onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            className={styles["text-field__icon"]}
          />
        </div>
      </label>
      {strength && meta.value && !meta.touched && (
        <p className={styles["text-field__requirements"]}>
          Password must be at least 8 characters long, including uppercase
          letters and special characters
        </p>
      )}
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
      {strength && passwordValue && passwordStrength >= 0 ? (
        <div
          className={cn(
            styles["strength-progress"],
            styles[`strength-progress--${typePasswordStrengthClassname}`]
          )}
        >
          {Array.from(Array(LENGTH_STRENGTH).keys()).map((item) => (
            <div
              key={item}
              className={cn(styles["strength-progress__item"], {
                [styles["strength-progress__item--active"]]:
                  item < passwordStrength,
              })}
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PasswordField;
