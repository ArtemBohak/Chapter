import { FC } from "react";

import { CommentsButtonProps } from "./CommentsButton.type";
import { useFeedContext } from "@/src/pages/FeedPage/context";
import styles from "../../FeedActivity.module.scss";

import { Icon, IconEnum } from "@/src/components";

const CommentsButton: FC<CommentsButtonProps> = ({ totalComments, id }) => {
  const { fetchData } = useFeedContext();
  const onHandleClick = () => {
    fetchData(id);
  };

  return (
    <button
      onClick={onHandleClick}
      data-automation="clickButton"
      className={styles["icon-button"]}
    >
      <Icon
        icon={IconEnum.Comments}
        removeInlineStyle
        className={styles["icon-button__icon"]}
      />
      <span>
        {totalComments}{" "}
        <span className={styles["icon-button__text"]}>comments</span>
      </span>
    </button>
  );
};

export default CommentsButton;
