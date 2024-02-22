import { ChangeEvent, FC, useState } from "react";
import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import { Link } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import cn from "classnames";

import { useAppSelector } from "@/src/redux";
import { useGetScreenSize } from "@/src/hooks";
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
  replyToUserId,
  nickName,
  placeholder,
  setNickName,
  setReplyToUserId,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const userId = useAppSelector((state) => state.userSlice.user.id);

  const [showPicker, setShowPicker] = useState(false);
  const [screenSize] = useGetScreenSize();

  const isMobScreen = screenSize < 768;

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

  const onHandleCrossClick = () => {
    setNickName && setNickName("");
    setReplyToUserId && setReplyToUserId(null);
  };

  const isErrorValidation = meta.touched && meta.error;

  const validationClassname = cn(
    styles["text-area__field"],

    {
      [styles["error"]]: isErrorValidation,
      [styles["nickname-short"]]: !!(
        nickName &&
        replyToUserId &&
        nickName.length <= 9
      ),
      [styles["nickname-long"]]: !!(
        nickName &&
        replyToUserId &&
        nickName.length > 9
      ),
    }
  );

  return (
    <div className={`${styles["text-area__wrapper"]} ${classNames}`}>
      {labelValue ? <span>{labelValue}</span> : null}
      {nickName && replyToUserId ? (
        <div className={styles["nickname__wrapper"]}>
          <button
            className={styles["nickname__btn"]}
            type="button"
            data-automation="clickButton"
            onClick={onHandleCrossClick}
          >
            <Icon icon={IconEnum.Cross} size={isMobScreen ? 11 : 17} />
          </button>
          <Link
            className={styles["nickname__link"]}
            to={replyToUserId !== userId ? "/" + replyToUserId : "#"}
          >
            {nickName.length > 9 ? nickName.slice(0, 9) + "..." : nickName}:
          </Link>
        </div>
      ) : null}
      <Field
        {...props}
        name={name}
        value={value}
        component="textarea"
        data-automation={dataAutomation}
        className={validationClassname}
        placeholder={nickName && replyToUserId ? "" : placeholder}
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
