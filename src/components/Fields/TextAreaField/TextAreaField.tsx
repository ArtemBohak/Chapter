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
  emojiClassNames,
  labelValue,
  nickName,
  handleNickname,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (nickName) setFieldValue(field.name, nickName + ": ");
  }, [field.name, nickName, setFieldValue]);

  const onHandleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const [nick] = value.split(" ");

    if (nickName && nick.startsWith("@") && !nick.includes(nickName)) {
      setFieldValue(field.name, "");
      return handleNickname && handleNickname();
    }

    setFieldValue(field.name, value);
  };

  const onHandleIconClick = () => setShowPicker(!showPicker);

  const onHandleEmojiClick = (emoji: IEmoji) => {
    setFieldValue(field.name, field.value + emoji.native);
    setShowPicker(false);
  };

  const onHandleInputClick = () => setShowPicker(false);

  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn(styles["text-area__field"], {
    [styles["error"]]: isErrorValidation,
  });

  return (
    <div className={`${styles["text-area"]} ${classNames}`}>
      {labelValue ? <p>{labelValue}</p> : null}
      <Field
        component="textarea"
        data-automation={dataAutomation}
        className={validationClassname}
        onChange={onHandleChange}
        onClick={onHandleInputClick}
        {...props}
      />
      {isErrorValidation ? (
        <ErrorMessage
          name={props.name || "Field invalid"}
          component="p"
          className={styles["text-area__error"]}
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
