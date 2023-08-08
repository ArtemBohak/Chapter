import { FC, InputHTMLAttributes } from "react";
import cn from "classnames";
import { Field, ErrorMessage, useField } from "formik";

import styles from "./PasswordField.module.css";

type Props = {
  id: string;
  className?: string;
  label?: string;
  name: string;
  dataAutomation: string;
} & Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "type">>;

const TextField: FC<Props> = ({
  id,
  className,
  label,
  name,
  value,
  defaultValue,
  dataAutomation,
  ...props
}) => {
  const [field, meta] = useField(name);

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
    </div>
  );
};

export default TextField;
