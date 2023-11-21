import { FC } from "react";
import { Field } from "formik";

import { TextAreaFieldProps } from "./TextAreaField.type";
import styles from "./TextAreaField.module.scss";
import { Icon, IconEnum } from "../..";

const TextAreaField: FC<TextAreaFieldProps> = ({
  dataAutomation,
  iconSize,
  classNames,
  onHandleIconClick,
  ...props
}) => {
  return (
    <div className={styles["text-area__wrapper"]}>
      <Field
        {...props}
        component="textarea"
        data-automation={dataAutomation}
        className={`${styles["text-area__field"]} ${classNames}`}
      />
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
