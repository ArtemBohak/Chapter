import { ChangeEvent, FC, useState } from "react";
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

  const [showPicker, setShowPicker] = useState(false);

  const onHandleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const [fieldNickname] = e.target.value.split(": ");
    if (fieldNickname && fieldNickname !== nickName) {
      resetNickname && resetNickname();
    }
    if (!e.target.value.startsWith(nickName || "")) {
      return setFieldValue(field.name, nickName + ": " + e.target.value);
    }

    return setFieldValue(field.name, e.target.value);
  };

  const onHandleIconClick = () => {
    setShowPicker(!showPicker);
  };

  const onHandleEmojiClick = (emoji: IEmoji) => {
    setFieldValue(field.name, field.value + emoji.native);
    setShowPicker(false);
  };

  // useEffect(() => {
  //   setFieldValue(field.name, nickName);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [nickName]);

  // useEffect(() => {
  //   if (fieldNickname && fieldNickname !== nickName) {
  //     nicknameHandler && nicknameHandler();
  //   }
  // }, [
  //   field.value,
  //   fieldNickname,
  //   name,
  //   nickName,
  //   nicknameHandler,
  //   setFieldValue,
  // ]);

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
