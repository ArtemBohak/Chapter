import { FC, useState } from "react";

import "@/src/extensions/string.extensions";
import { FeedTextProps, Words } from "./FeedText.type";
import { useGetScreenSize } from "@/src/hooks";
import styles from "./FeedText.module.scss";

const FeedText: FC<FeedTextProps> = ({ title, text }) => {
  const [screenSize] = useGetScreenSize();
  const [isShowingFullText, setIsShowingFullText] = useState(false);

  const textSize =
    screenSize < Words.ScreenSize ? Words.MobWords : Words.TabletWords;

  const onHandleClick = () => {
    setIsShowingFullText(!isShowingFullText);
  };

  const renderText = isShowingFullText ? text : text.limit(textSize);

  const renderButton =
    text.split(" ").length > textSize ? (
      <button data-automation="clickButton" onClick={onHandleClick}>
        {isShowingFullText ? "Read less" : "Read more"}
      </button>
    ) : null;

  return (
    <div className={styles["feed-text"]}>
      <h4>{title}</h4>
      <p>
        {renderText} {renderButton}
      </p>
    </div>
  );
};

export default FeedText;
