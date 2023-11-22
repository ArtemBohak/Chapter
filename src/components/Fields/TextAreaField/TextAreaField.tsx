import { FC } from "react";
import { ErrorMessage, Field, useField } from "formik";
import cn from "classnames";

import { TextAreaFieldProps } from "./TextAreaField.type";
import styles from "./TextAreaField.module.scss";
import { Icon, IconEnum } from "../..";

const TextAreaField: FC<TextAreaFieldProps> = ({
  dataAutomation,
  iconSize = 24,
  classNames,
  onHandleIconClick,
  name,
  ...props
}) => {
  const [, meta] = useField(name);

  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn(styles["text-area__field"], {
    [styles["error"]]: isErrorValidation,
  });
  return (
    <div className={`${styles["text-area__wrapper"]} ${classNames}`}>
      <Field
        {...props}
        name={name}
        component="textarea"
        data-automation={dataAutomation}
        className={validationClassname}
      />
      {isErrorValidation ? (
        <ErrorMessage
          name={name || "Field invalid"}
          component="p"
          className={styles["text-area-error-message"]}
        />
      ) : null}
      <button
        onClick={onHandleIconClick}
        type="button"
        className={styles["text-area__icon-button"]}
      >
        <Icon icon={IconEnum.Smile} size={iconSize} removeInlineStyle />
      </button>
    </div>
  );
};

export default TextAreaField;
