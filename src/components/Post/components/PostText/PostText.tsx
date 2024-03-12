import { FC, useState } from "react";

import { PostTextProps, Words } from "./PostText.type";
import { useGetScreenSize } from "@/src/hooks";
import styles from "./PostText.module.scss";

const PostText: FC<PostTextProps> = ({ caption, isLimited = false }) => {
  const [screenSize] = useGetScreenSize();
  const [isShowingFullText, setIsShowingFullText] = useState(false);

  const textSize =
    screenSize < Words.ScreenSize ? Words.MobWords : Words.TabletWords;

  const onHandleClick = () => {
    setIsShowingFullText(!isShowingFullText);
  };

  const renderText =
    !isShowingFullText && isLimited && caption
      ? caption.limit(textSize)
      : caption;

  const renderButton =
    caption && caption.split(" ").length > textSize && isLimited ? (
      <button data-automation="clickButton" onClick={onHandleClick}>
        {isShowingFullText ? "Read less" : "Read more"}
      </button>
    ) : null;

  return (
    <div className={styles["post-text"]}>
      <p>
        {renderText} {renderButton}
      </p>
    </div>
  );
};

export default PostText;
