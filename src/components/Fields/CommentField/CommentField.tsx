import { ChangeEvent, FC, useState } from "react";
import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import cn from "classnames";

import styles from "./CommentField.module.scss";
import { CommentFieldProps, IEmoji } from "./CommentField.type";
import { Icon, IconEnum } from "../..";

const CommentField: FC<CommentFieldProps> = ({
  classNames,
  name,
  iconSize = 24,
  labelValue,
  emojiClassNames,
  ...props
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const isErrorValidation = meta.touched && meta.error;

  const onHandleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue(field.name, e.target.value);
  };

  const onHandleIconClick = () => {
    setShowPicker(!showPicker);
  };

  const onHandleEmojiClick = (emoji: IEmoji) => {
    setFieldValue(field.name, field.value + emoji.native);
    setShowPicker(false);
  };

  const fieldCN = cn(styles["caption"], classNames);

  //   const inputClassname = cn(
  //     styles["text-area__field"],

  //     {
  //       [styles["error"]]: isErrorValidation,
  //     }
  //   );

  return (
    <div className={fieldCN}>
      {labelValue ? <span>{labelValue}</span> : null}
      <div className={styles["caption__wrapper"]}>
        <Field
          name={name}
          data-automation="textInput"
          className={styles["caption__field"]}
          component="textarea"
          onChange={onHandleChange}
          {...props}
        />
        <p className={styles["caption__text"]}>
          <span></span>
          <span>{field.value}</span>
        </p>
      </div>
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

export default CommentField;
