import { FC, useRef, useState } from "react";
import styles from "./Feed.module.scss";

import { FeedProps, TextSize } from "./Feed.type";
import { formatDate, limitText } from "@/src/utils";
import { useArrayOfId } from "@/src/hooks";

import { IconEnum } from "@/src/components/Icon";
import { UIbutton } from "@/src/components";
import CommentsForm from "../CommentsForm/CommentsForm";
import SocialButton from "../SocialButton/SocialButton";
import { useAppSelector } from "@/src/redux/hooks";

const Feed: FC<FeedProps> = ({
  id,
  name,
  postCreatedAt,
  avatar,
  text,
  img,
  followersList,
  likesList,
  commentsList,
  sharesList,
}) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { current: screenSize } = useRef(window.innerWidth);
  const [isFollowing] = useArrayOfId(user.id + 1 + "", followersList);

  const [isFollow, setIsFollow] = useState(isFollowing);
  const [isReadMore, setIsReadMore] = useState(true);

  const formattedPostTime = formatDate(postCreatedAt);
  const { sentenceSize, wordSize } =
    screenSize < 769
      ? { sentenceSize: TextSize.MOB_SENTENCE, wordSize: TextSize.MOB_WORD }
      : { sentenceSize: TextSize.SENTENCE, wordSize: TextSize.WORD };
  const isMobDimension = screenSize < 769;

  return (
    <div className={styles["feed"]}>
      <div className={styles["avatar-desc"]}>
        <img src={avatar} alt="" width="78" />
      </div>
      <div className={styles["avatar-tab"]}>
        <img src={avatar} alt="" width="68" />
      </div>
      <div className={styles["content"]}>
        <div className={styles["content__title"]}>
          <div className={styles["avatar"]}>
            <img src={avatar} alt="" width="38" />
          </div>
          <div className={styles["content__title-text"]}>
            <h5>{name}</h5>
            <p>{formattedPostTime}</p>
          </div>
          <UIbutton
            variant={isFollow ? "outlined" : "contained"}
            dataAutomation="clickButton"
            onClick={() => setIsFollow(!isFollow)}
            className={`${styles["content__title-button"]} ${styles["btn"]}`}
          >
            {isFollow ? "Unfollow" : "Follow"}
          </UIbutton>
        </div>
        <div className={styles["content__text"]}>
          <p>
            {isReadMore && text.length > wordSize
              ? limitText(text, sentenceSize)
              : text}
          </p>
          {text.length > wordSize && isReadMore ? (
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
          <div>
            <img src={img} alt="" width="640" />
            <div className={styles["content__social"]}>
              <SocialButton
                size={isMobDimension ? 24 : 28}
                userId={user.id + 1 + ""}
                dataList={likesList}
                iconType={IconEnum.Likes}
                modalTitle="Likes"
              />
              <SocialButton
                size={isMobDimension ? 22 : 24}
                userId={user.id + 1 + ""}
                dataList={sharesList}
                iconType={IconEnum.Share}
                modalTitle="Shared"
              />
              <SocialButton
                size={isMobDimension ? 22 : 24}
                userId={user.id + 1 + ""}
                dataList={commentsList}
                iconType={IconEnum.Comments}
                modalTitle="Comments"
              />
            </div>
          </div>
        </div>

        <CommentsForm id={id} />
      </div>
    </div>
  );
};

export default Feed;
