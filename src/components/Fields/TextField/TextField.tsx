import { FC, InputHTMLAttributes } from "react";
import cn from "classnames";
import { Field, ErrorMessage, useField } from "formik";

import styles from "./TextField.module.css";

type Props = {
  id: string;
  className?: string;
  label?: string;
  name: string;
  dataAutomation: string;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;

const TextField: FC<Props> = ({
  id,
  className,
  label,
  name,
  type = "text",
  value,
  defaultValue,
  dataAutomation,
  ...props
}) => {
  const [field, meta] = useField(name);

  const validationClassname = cn({
    [styles["text-field--success"]]: meta.touched && !meta.error,
    [styles["text-field--has-error"]]: meta.touched && meta.error,
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
