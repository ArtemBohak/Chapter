import { FC } from "react";

import styles from "./FeedList.module.scss";

import Feed from "../Feed/Feed";

import userImage from "./assets/user.png";
import postImage from "./assets/image.jpg";
const testText =
  "Just finished diving into an amazing book and couldn't resist sharing my thoughts! 🤓📖 The narrative's compelling, the characters were wonderfully crafted, and the plot was so gripping that it made 'putting the book down' an impossible task. I can safely say that it gave my imagination a whole new world to explore! I won't spill any spoilers, but here's a hint: It's a tapestry of intriguing storylines that intertwine in the most unexpected ways. 😏 If anyone is looking for a brilliant book to get lost into, stay tuned. I'll be dropping a hint soon. Until then, keep reading and keep exploring! 🚀 #BookLovers #AmReading #BookWorld #ReadersLife #PageTurner #BookwormsUnite";

const data = [
  {
    isFollowing: false,
    totalLikes: 231,
    totalReposts: 1233,
    totalComments: 12,
    id: "1",
    img: postImage,
    avatar: userImage,
    text: testText,
  },
  {
    isFollowing: true,
    totalLikes: 231,
    totalReposts: 1233,
    totalComments: 12,
    id: "2",
    img: postImage,
    avatar: userImage,
    text: testText,
  },
  {
    isFollowing: false,
    totalLikes: 231,
    totalReposts: 1233,
    totalComments: 12,
    id: "3",
    img: postImage,
    avatar: userImage,
    text: testText,
  },
];

const likesList = ["3"];
const commentsList = ["2", "3"];
const repostsList = ["1", "3"];

const FeedsList: FC = () => {
  return (
    <div className={styles["feed-container"]}>
      <ul className={styles["feed-list"]}>
        {data.map((i) => (
          <li key={i.id}>
            <Feed
              id={i.id}
              isFollowing={i.isFollowing}
              totalLikes={i.totalLikes}
              totalComments={i.totalComments}
              totalReposts={i.totalReposts}
              img={i.img}
              avatar={i.avatar}
              text={i.text}
              likesIdList={likesList}
              commentsIdList={commentsList}
              repostsIdList={repostsList}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedsList;
