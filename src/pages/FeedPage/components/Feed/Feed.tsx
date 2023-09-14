import { FC, useState } from "react";
import styles from "./Feed.module.scss";

import { IconEnum } from "@/src/components/Icon";
import { FeedProps } from "./Feed.type";

import { UIbutton } from "@/src/components";
import CommentsForm from "../CommentsForm/CommentsForm";
import ActionButton from "../ActionButton/ActionButton";

const Feed: FC<FeedProps> = ({
  isFollowing,
  totalLikes,
  totalReposts,
  totalComments,
  id,
  likesIdList,
  commentsIdList,
  repostsIdList,
  img,
  avatar,
  text,
}) => {
  const [isFollow, setIsFollow] = useState(isFollowing);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  return (
    <div className={styles["feed"]}>
      <div>
        <img src={avatar} alt="" width="78" />
      </div>
      <div className={styles["content"]}>
        <div className={styles["content__title"]}>
          <div className={styles["content__title-text"]}>
            <h5>Alex Space</h5>
            <p>11 min</p>
          </div>
          <UIbutton
            variant={isFollow ? "outlined" : "contained"}
            dataAutomation="clickButton"
            onClick={() => setIsFollow(!isFollow)}
            className={styles["content__title-button"]}
          >
            {isFollow ? "Unfollow" : "Follow"}
          </UIbutton>
        </div>
        <div className={styles["text"]}>
          <p>{isReadMore ? text.slice(0, 320) + "..." : text}</p>
          {text.length > 320 && isReadMore ? (
            <UIbutton
              variant="text"
              onClick={toggleReadMore}
              dataAutomation="clickButton"
              className={`${styles["content__text-button"]} ${styles["feed-btn"]} ${styles["btn"]}`}
            >
              Read more...
            </UIbutton>
          ) : null}
        </div>
        <div className={styles["content__image"]}>
          <img src={img} alt="" width="640" />
        </div>
        <div className={styles["content__action"]}>
          <ActionButton
            value={totalLikes}
            id={id}
            iconType={IconEnum.Likes}
            clickedList={likesIdList}
          />
          <ActionButton
            value={totalReposts}
            id={id}
            iconType={IconEnum.Share}
            clickedList={repostsIdList}
          />
          <ActionButton
            value={totalComments}
            id={id}
            iconType={IconEnum.Comments}
            clickedList={commentsIdList}
          />
        </div>
        <CommentsForm id={id} />
      </div>
    </div>
  );
};

export default Feed;
