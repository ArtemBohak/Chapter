import { ChangeEvent, FC, useState } from "react";

import styles from "./Field.module.scss";
import { FieldType } from "./Field.type";
import { Icon, IconEnum } from "@/src/components";
import { IEmoji } from "@/src/components/Fields/TextAreaField/TextAreaField.type";

const Field: FC<FieldType> = ({ onChange }) => {
  const [value, setValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const onHandleEmojiClick = (emoji: IEmoji) => {
    setValue(value + emoji.native);
    setShowPicker(false);
  };

  return (
    <div className={styles["field"]}>
      <input
        type="text"
        name="chat"
        value={value}
        onChange={onHandleChange}
        placeholder="Write a message"
        className={styles["field__input"]}
      />
      {value.length ? (
        <button className={styles["submit-btn"]}>
          <Icon icon={IconEnum.NextSlide} size={20} />
        </button>
      ) : null}
    </div>
  );
};

export default Field;
