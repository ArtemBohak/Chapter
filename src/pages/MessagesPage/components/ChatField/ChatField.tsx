import { ChangeEvent, FC, useState } from "react";

import {
  AudioRecorder,
  Emoji,
  Icon,
  IconEnum,
  ImageField,
} from "@/src/components";
import { IEmoji } from "@/src/components/Emoji/Emoji.type";
import { ChatFieldType } from "./ChatField.type";
import styles from "./ChatField.module.scss";

const ChatField: FC<ChatFieldType> = ({ onChange }) => {
  const [value, setValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [, setImage] = useState<File | null>(null);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const onHandleEmojiClick = (emoji: IEmoji) => {
    setValue(value + emoji.native);
    setShowPicker(false);
  };

  const onHandleInputClick = () => setShowPicker(false);

  const mediaButtons = (
    <div className={styles["buttons"]}>
      <AudioRecorder />
      <ImageField btnVariant="icon" setFile={setImage} />
    </div>
  );

  return (
    <div className={styles["field"]}>
      <Emoji
        setShowEmojiPicker={setShowPicker}
        showEmojiPicker={showPicker}
        handleEmojiClick={onHandleEmojiClick}
        emojiClassNames={styles["emoji"]}
        buttonClassNames={styles["emoji-button"]}
        iconSize={20}
      />
      <input
        type="text"
        name="chat"
        value={value}
        onChange={onHandleChange}
        onClick={onHandleInputClick}
        placeholder="Write a message"
        className={styles["field__input"]}
      />
      {value.length ? (
        <button className={styles["submit-btn"]}>
          <Icon icon={IconEnum.NextSlide} size={20} />
        </button>
      ) : (
        mediaButtons
      )}
    </div>
  );
};

export default ChatField;
