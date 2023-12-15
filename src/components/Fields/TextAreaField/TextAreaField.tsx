import { ChangeEvent, FC, useEffect, useState } from "react";
import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import cn from "classnames";

import { TextAreaFieldProps } from "./TextAreaField.type";
import styles from "./TextAreaField.module.scss";
import { Icon, IconEnum } from "../..";

const TextAreaField: FC<TextAreaFieldProps> = ({
  dataAutomation,
  iconSize = 24,
  classNames,
  name,
  value,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [tValue, setTValue] = useState(value);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setFieldValue(field.name, tValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.name, tValue]);

  const onHandleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTValue(e.target.value);

  const onHandleIconClick = () => {
    setShowPicker(!showPicker);
  };

  const onHandleEmojiClick = (emojiObject: EmojiClickData) => {
    setTValue((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn(styles["text-area__field"], {
    [styles["error"]]: isErrorValidation,
  });
  return (
    <div className={`${styles["text-area__wrapper"]} ${classNames}`}>
      <Field
        {...props}
        name={name}
        value={value}
        component="textarea"
        data-automation={dataAutomation}
        className={validationClassname}
        onChange={onHandleChange}
        onClick={() => setShowPicker(false)}
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
      {showPicker ? (
        <div className={styles["text-area__emoji"]}>
          <EmojiPicker
            height={400}
            onEmojiClick={onHandleEmojiClick}
            skinTonesDisabled
          />
        </div>
      ) : null}
    </div>
  );
};

export default TextAreaField;
