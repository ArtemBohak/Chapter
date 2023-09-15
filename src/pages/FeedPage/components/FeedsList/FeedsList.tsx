import { FC } from "react";

import styles from "./FeedList.module.scss";

import Feed from "../Feed/Feed";

import userImage from "./assets/user.png";
import postImage from "./assets/image.jpg";
const testText =
  "Just finished diving into an amazing book and couldn't resist sharing my thoughts! 🤓📖 The narrative's compelling, the characters were wonderfully crafted, and the plot was so gripping that it made 'putting the book down' an impossible task. I can safely say that it gave my imagination a whole new world to explore! I won't spill any spoilers, but here's a hint: It's a tapestry of intriguing storylines that intertwine in the most unexpected ways. 😏 If anyone is looking for a brilliant book to get lost into, stay tuned. I'll be dropping a hint soon. Until then, keep reading and keep exploring! 🚀 #BookLovers #AmReading #BookWorld #ReadersLife #PageTurner #BookwormsUnite";

function randomDate() {
  const start = new Date("2020-01-01"); // Replace with your desired start date
  const end = new Date("2023-12-31");
  // Calculate the time range in milliseconds
  const startTime = start.getTime();
  const endTime = end.getTime();
  const timeRange = endTime - startTime;

  // Generate a random time within the range
  const randomTime = Math.random() * timeRange + startTime;

  // Create a new Date object with the random time
  const randomDate = new Date(randomTime);

  return randomDate;
}

const data = [
  {
    name: "Alex Space",
    time: randomDate(),
    totalLikes: 231,
    totalReposts: 1233,
    totalComments: 12,
    id: "1",
    img: postImage,
    avatar: userImage,
    text: testText,
  },
  {
    name: "Alex Space",
    time: randomDate(),
    totalLikes: 231,
    totalReposts: 1233,
    totalComments: 12,
    id: "2",
    img: postImage,
    avatar: userImage,
    text: testText,
  },
  {
    name: "Alex Space",
    time: randomDate(),
    totalLikes: 231,
    totalReposts: 1233,
    totalComments: 12,
    id: "3",
    img: postImage,
    avatar: userImage,
    text: testText,
  },
];
const followList = ["1", "2"];
const likesList = ["3"];
const commentsList = ["2", "3"];
const repostsList = ["1", "3"];

// __________________________________ //

const FeedsList: FC = () => {
  return (
    <ul className={styles["feed-list"]}>
      {data.map((i) => (
        <li key={i.id} className={styles["feed-item"]}>
          <Feed
            id={i.id}
            name={i.name}
            postCreatedAt={i.time}
            avatar={i.avatar}
            text={i.text}
            img={i.img}
            followIdList={followList}
            totalLikes={i.totalLikes}
            totalComments={i.totalComments}
            totalRepost={i.totalReposts}
            likesIdList={likesList}
            commentsIdList={commentsList}
            repostIdList={repostsList}
          />
        </li>
      ))}
    </ul>
  );
};

export default FeedsList;
