import { FC } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { Icon, IconEnum } from "../Icon";
import { EmojiProps } from "./Emoji.type";
import styles from "./Emoji.module.scss";

const Emoji: FC<EmojiProps> = ({
  showEmojiPicker,
  iconSize = 24,
  emojiClassNames,
  buttonClassNames,
  handleEmojiClick,
  setShowEmojiPicker,
}) => {
  const onHandleIconClick = () => setShowEmojiPicker(!showEmojiPicker);

  return (
    <>
      <button
        onClick={onHandleIconClick}
        type="button"
        className={`${styles["button"]} ${buttonClassNames}`}
        aria-label="Emoji select button"
      >
        <Icon icon={IconEnum.Smile} size={iconSize} />
      </button>
      {showEmojiPicker ? (
        <div className={`${styles["emoji"]} ${emojiClassNames}`}>
          <Picker
            data={data}
            onEmojiSelect={handleEmojiClick}
            previewPosition="none"
            theme="light"
            maxFrequentRows={1}
            perLine={6}
          />
        </div>
      ) : null}
    </>
  );
};

export default Emoji;
