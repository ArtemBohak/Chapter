import { FC, useState } from "react";
import styles from "./Feed.module.scss";

import { IconEnum } from "@/src/components/Icon";

import { UIbutton } from "@/src/components";

import CommentsForm from "../CommentsForm/CommentsForm";
import ActionButton from "../ActionButton/ActionButton";

import userImage from "./assets/user.png";
import postImage from "./assets/image.jpg";
const testText =
  "Just finished diving into an amazing book and couldn't resist sharing my thoughts! 🤓📖 The narrative's compelling, the characters were wonderfully crafted, and the plot was so gripping that it made 'putting the book down' an impossible task. I can safely say that it gave my imagination a whole new world to explore! I won't spill any spoilers, but here's a hint: It's a tapestry of intriguing storylines that intertwine in the most unexpected ways. 😏 If anyone is looking for a brilliant book to get lost into, stay tuned. I'll be dropping a hint soon. Until then, keep reading and keep exploring! 🚀 #BookLovers #AmReading #BookWorld #ReadersLife #PageTurner #BookwormsUnite";

const Feed: FC = ({
  follow = false,
  totalLike = 235,
  totalReposts = 122,
  totalComments = 1212,
  likesList = [],
  commentsList = [],
  repostLst = [],
  id = "12",
  img = postImage,
  avatar = userImage,
  text = testText,
}) => {
  const [isFollow, setIsFollow] = useState(follow);
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
            value={totalLike}
            id="1"
            iconType={IconEnum.Likes}
            clickedList={likesList}
          />
          <ActionButton
            value={totalReposts}
            id={id}
            iconType={IconEnum.Share}
            clickedList={repostLst}
          />
          <ActionButton
            value={totalComments}
            id={id}
            iconType={IconEnum.Comments}
            clickedList={commentsList}
          />
        </div>
        <CommentsForm id={id} />
      </div>
    </div>
  );
};

export default Feed;
