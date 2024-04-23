import { ChangeEvent, FC, useEffect, useState } from "react";
import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import cn from "classnames";

import { IEmoji } from "../../Emoji/Emoji.type";
import { TextAreaFieldProps } from "./TextAreaField.type";
import styles from "./TextAreaField.module.scss";
import Emoji from "../../Emoji/Emoji";

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

    if (nickName && !nick.includes(nickName + ":")) {
      setFieldValue(field.name, "");
      return handleNickname && handleNickname();
    }

    setFieldValue(field.name, value);
  };

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
      <Emoji
        showEmojiPicker={showPicker}
        iconSize={iconSize}
        buttonClassNames={styles["text-area__icon-button"]}
        emojiClassNames={`${styles["text-area__emoji"]} ${emojiClassNames}`}
        handleEmojiClick={onHandleEmojiClick}
        setShowEmojiPicker={setShowPicker}
      />
    </div>
  );
};

export default TextAreaField;
