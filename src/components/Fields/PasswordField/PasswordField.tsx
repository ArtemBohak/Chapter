import { ChangeEvent, FC, InputHTMLAttributes } from "react";
import cn from "classnames";
import {
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
  FieldProps,
} from "formik";
import {
  usePasswordStrength,
  TypePasswordStrength,
} from "./usePasswordStrength";

import styles from "./PasswordField.module.css";

type Props = {
  id: string;
  label?: string;
  name: string;
  dataAutomation: string;
  strength?: boolean;
  className?: string;
} & Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "type">> &
  Partial<FieldProps>;

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
  const { setFieldValue } = useFormikContext();
  const { passwordStrength, passwordValue, LENGTH_STRENGTH, onHandleChange } =
    usePasswordStrength();

  const typePasswordStrengthClassname = cn({
    [TypePasswordStrength.WEAK]: passwordStrength === 1,
    [TypePasswordStrength.OKEY]: passwordStrength === 2,
    [TypePasswordStrength.STRONG]: passwordStrength === 3,
  });

  const validationClassname = cn({
    [styles["text-field--success"]]: meta.touched && !meta.error,
    [styles["text-field--has-error"]]: meta.touched && meta.error,
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
            type="password"
            value={value}
            defaultValue={defaultValue}
            className={styles["text-field__input"]}
            onChange={onHandleChangeField}
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

export default TextField;
