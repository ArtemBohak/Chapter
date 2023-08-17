import { FC } from "react";
import cn from "classnames";
import { Field, ErrorMessage, useField } from "formik";

import { Icon, IconEnum } from "@/src/components/Icon";

import { TextFieldProps } from "./TextField.type";

import styles from "./TextField.module.scss";

type Props = {
  id: string;
  className?: string;
  label?: string;
  name: string;
  showSuccessIcon?: boolean;
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
  showSuccessIcon = false,
  dataAutomation,
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
      {isErrorValidation ? (
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
