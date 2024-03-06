import { ChangeEvent, FC, useEffect, useState } from "react";
import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import cn from "classnames";

import { IEmoji, TextAreaFieldProps } from "./TextAreaField.type";
import styles from "./TextAreaField.module.scss";
import { Icon, IconEnum } from "../..";

const TextAreaField: FC<TextAreaFieldProps> = ({
  dataAutomation,
  iconSize = 24,
  classNames,
  name,
  value,
  emojiClassNames,
  labelValue,
  nickName,
  placeholder,
  resetNickname,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [nickNameValue, setNickNameValue] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (nickName) setNickNameValue(nickName + ": ");
    if (nickNameValue) setFieldValue(field.name, nickNameValue);
  }, [field.name, nickName, nickNameValue, setFieldValue]);

  useEffect(() => {
    if (
      field.value.includes(nickName) &&
      !field.value.startsWith(nickNameValue)
    ) {
      setFieldValue(field.name, field.value.replace(nickName, ""));
      setNickNameValue("");
      resetNickname && resetNickname();
    }
  }, [
    field.name,
    field.value,
    nickName,
    nickNameValue,
    resetNickname,
    setFieldValue,
  ]);

  const onHandleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setFieldValue(field.name, e.target.value);

  const onHandleIconClick = () => setShowPicker(!showPicker);

  const onHandleEmojiClick = (emoji: IEmoji) => {
    setFieldValue(field.name, field.value + emoji.native);
    setShowPicker(false);
  };

  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn(styles["text-area__field"], {
    [styles["error"]]: isErrorValidation,
  });

  return (
    <div className={`${styles["text-area__wrapper"]} ${classNames}`}>
      {labelValue ? <span>{labelValue}</span> : null}

      <Field
        {...props}
        name={name}
        value={value}
        component="textarea"
        data-automation={dataAutomation}
        className={validationClassname}
        placeholder={placeholder}
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
        <div className={`${styles["text-area__emoji"]} ${emojiClassNames}`}>
          <Picker
            data={data}
            onEmojiSelect={onHandleEmojiClick}
            previewPosition="none"
            theme="light"
            maxFrequentRows={1}
            perLine={6}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TextAreaField;
