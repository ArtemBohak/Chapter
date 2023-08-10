import { ChangeEvent, FC, InputHTMLAttributes } from "react";
import cn from "classnames";
import { Field, ErrorMessage, useField } from "formik";
import {
  usePasswordStrength,
  TypePasswordStrength,
} from "./usePasswordStrength";

import styles from "./PasswordField.module.css";

type Props = {
  id: string;
  className?: string;
  label?: string;
  name: string;
  dataAutomation: string;
  strength?: boolean;
} & Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "type">>;

const TextField: FC<Props> = ({
  id,
  className,
  label,
  name,
  value,
  defaultValue,
  dataAutomation,
  strength,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { passwordStrength, passwordValue, LENGTH_STRENGTH, onHandleChange } =
    usePasswordStrength();

  const typePasswordStrengthClassname = cn({
    [TypePasswordStrength.WEAK]: passwordStrength === 1,
    [TypePasswordStrength.OKEY]: passwordStrength === 2,
    [TypePasswordStrength.STRONG]: passwordStrength === 3,
  });

  return (
    <div
      className={cn(
        styles["text-field"],
        { [styles["text-field--has-error"]]: meta.touched && meta.error },
        className
      )}
    >
      <label htmlFor={id} className={styles["text-field__label"]}>
        {label && <p className={styles["text-field__label-text"]}>{label}</p>}
        <div className={styles["text-field__holder"]}>
          <Field
            {...field}
            id={id}
            data-automation={dataAutomation}
            type="password"
            {...props}
            value={value}
            defaultValue={defaultValue}
            className={styles["text-field__input"]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log("e.currentTarget.valued", e.currentTarget.value);
              if (strength) onHandleChange(e.currentTarget.value);
            }}
          />
        </div>
      </label>
      {meta.touched && meta.error ? (
        <ErrorMessage
          name={name || "Field invalid"}
          component="p"
          className={styles["text-field__error-message"]}
        />
      ) : null}
      {strength && passwordValue && passwordStrength >= 0 ? (
        <div
          className={cn(
            "strength-progress",
            `strength-progress--${typePasswordStrengthClassname}`
          )}
        >
          {Array.from(Array(LENGTH_STRENGTH).keys()).map((item) => (
            <div
              key={item}
              className={cn("strength-progress__item", {
                "strength-progress__item--active": item < passwordStrength,
              })}
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TextField;
