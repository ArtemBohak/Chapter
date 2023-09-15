import { FC, useState } from "react";
import styles from "./Feed.module.scss";

import { FeedProps, TextSize } from "./Feed.type";
import { formatDate, limitText } from "@/src/utils";
import { useArrayOfId } from "@/src/hooks";

import { IconEnum } from "@/src/components/Icon";
import { UIbutton } from "@/src/components";
import CommentsForm from "../CommentsForm/CommentsForm";
import SocialButton from "../SocialButton/SocialButton";

const Feed: FC<FeedProps> = ({
  id,
  name,
  postCreatedAt,
  avatar,
  text,
  img,
  followIdList,
  totalLikes,
  totalComments,
  totalRepost,
  likesIdList,
  commentsIdList,
  repostIdList,
}) => {
  const [isFollowing] = useArrayOfId(id, followIdList);
  const [isFollow, setIsFollow] = useState(isFollowing);
  const [isReadMore, setIsReadMore] = useState(true);

  const formattedPostCreatedAt = formatDate(postCreatedAt);
  return (
    <div className={styles["feed"]}>
      <div>
        <img src={avatar} alt="" width="78" />
      </div>
      <div className={styles["content"]}>
        <div className={styles["content__title"]}>
          <div className={styles["content__title-text"]}>
            <h5>{name}</h5>
            <p>{formattedPostCreatedAt}</p>
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
          <p>
            {isReadMore && text.length > TextSize.WORD
              ? limitText(text, TextSize.SENTENCE)
              : text}
          </p>
          {text.length > TextSize.WORD && isReadMore ? (
            <UIbutton
              variant="text"
              onClick={() => setIsReadMore(!isReadMore)}
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
          <SocialButton
            id={id}
            value={totalLikes}
            clickedList={likesIdList}
            iconType={IconEnum.Likes}
          />
          <SocialButton
            id={id}
            value={totalRepost}
            clickedList={repostIdList}
            iconType={IconEnum.Share}
          />
          <SocialButton
            id={id}
            value={totalComments}
            clickedList={commentsIdList}
            iconType={IconEnum.Comments}
          />
        </div>
        <CommentsForm id={id} />
      </div>
    </div>
  );
};

export default Feed;
