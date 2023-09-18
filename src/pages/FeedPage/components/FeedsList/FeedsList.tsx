import { FC } from "react";

import styles from "./FeedList.module.scss";

import Feed from "../Feed/Feed";

import userImage from "./assets/user.png";
import postImage from "./assets/image.jpg";
const testText =
  "Just finished diving into an amazing book and couldn't resist sharing my thoughts! 🤓📖 The narrative's compelling, the characters were wonderfully crafted, and the plot was so gripping that it made 'putting the book down' an impossible task. I can safely say that it gave my imagination a whole new world to explore! I won't spill any spoilers, but here's a hint: It's a tapestry of intriguing storylines that intertwine in the most unexpected ways. 😏 If anyone is looking for a brilliant book to get lost into, stay tuned. I'll be dropping a hint soon. Until then, keep reading and keep exploring! 🚀 #BookLovers #AmReading #BookWorld #ReadersLife #PageTurner #BookwormsUnite";

function randomDate() {
  const start = new Date("2020-01-01");
  const end = new Date("2023-12-31");

  const startTime = start.getTime();
  const endTime = end.getTime();
  const timeRange = endTime - startTime;

  const randomTime = Math.random() * timeRange + startTime;

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
    followList: ["1"],
    likesList: [
      { id: "2", name: "Alex Space", avatar: userImage, followList: ["1"] },
      {
        id: "3",
        name: "Alex Space",
        avatar: userImage,
        followList: ["1", "2"],
      },
      { id: "4", name: "Alex Space", avatar: userImage, followList: ["3"] },
      { id: "5", name: "Alex Space", avatar: userImage, followList: ["2"] },
      { id: "6", name: "Alex Space", avatar: userImage, followList: ["1"] },
      { id: "7", name: "Alex Space", avatar: userImage, followList: ["1"] },
      { id: "8", name: "Alex Space", avatar: userImage, followList: ["1"] },
      { id: "9", name: "Alex Space", avatar: userImage, followList: ["1"] },
      { id: "10", name: "Alex Space", avatar: userImage, followList: ["1"] },
      { id: "11", name: "Alex Space", avatar: userImage, followList: ["1"] },
      { id: "12", name: "Alex Space", avatar: userImage, followList: ["1"] },
      { id: "13", name: "Alex Space", avatar: userImage, followList: ["1"] },
      { id: "14", name: "Alex Space", avatar: userImage, followList: ["1"] },
    ],
    commentsList: [
      { id: "2", name: "Alex Space", avatar: userImage, followList: ["1"] },
      {
        id: "3",
        name: "Alex Space",
        avatar: userImage,
        followList: ["1", "2"],
      },
      { id: "4", name: "Alex Space", avatar: userImage, followList: ["3"] },
      { id: "5", name: "Alex Space", avatar: userImage, followList: ["2"] },
      { id: "6", name: "Alex Space", avatar: userImage, followList: ["1"] },
    ],
    repostsList: [
      { id: "2", name: "Alex Space", avatar: userImage, followList: ["1"] },
      {
        id: "3",
        name: "Alex Space",
        avatar: userImage,
        followList: ["1", "2"],
      },
      { id: "4", name: "Alex Space", avatar: userImage, followList: ["3"] },
      { id: "5", name: "Alex Space", avatar: userImage, followList: ["2"] },
      { id: "6", name: "Alex Space", avatar: userImage, followList: ["1"] },
    ],
  },
  {
    name: "Alex Terri",
    time: randomDate(),
    totalLikes: 231,
    totalReposts: 1233,
    totalComments: 12,
    id: "2",
    img: postImage,
    avatar: userImage,
    text: testText,
    followList: [],
    likesList: [
      { id: "2", name: "Alex Space", avatar: userImage, followList: ["1"] },
      {
        id: "3",
        name: "Alex Space",
        avatar: userImage,
        followList: ["1", "2"],
      },
      { id: "4", name: "Alex Space", avatar: userImage, followList: ["3"] },
    ],
    commentsList: [
      { id: "2", name: "Alex Space", avatar: userImage, followList: ["1"] },
      {
        id: "3",
        name: "Alex Space",
        avatar: userImage,
        followList: ["1", "2"],
      },
      { id: "4", name: "Alex Space", avatar: userImage, followList: ["3"] },
    ],
    repostsList: [
      { id: "2", name: "Alex Space", avatar: userImage, followList: ["1"] },
      {
        id: "3",
        name: "Alex Space",
        avatar: userImage,
        followList: ["1", "2"],
      },
      { id: "4", name: "Alex Space", avatar: userImage, followList: ["3"] },
    ],
  },
  {
    name: "Alex Merri",
    time: randomDate(),
    totalLikes: 231,
    totalReposts: 1233,
    totalComments: 12,
    id: "3",
    img: postImage,
    avatar: userImage,
    text: testText,
    followList: ["2", "1"],
    likesList: [],
    repostsList: [],
    commentsList: [],
  },
];

// __________________________________ //

const FeedsList: FC = () => {
  return (
    <ul className={`${styles["feed-list"]} hide-scroll`}>
      {data.map((i) => (
        <li key={i.id} className={styles["feed-item"]}>
          <Feed
            id={i.id}
            name={i.name}
            postCreatedAt={i.time}
            avatar={i.avatar}
            text={i.text}
            img={i.img}
            followersList={i.followList}
            likesList={i.likesList}
            commentsList={i.commentsList}
            sharesList={i.repostsList}
          />
        </li>
      ))}
    </ul>
  );
};

export default FeedsList;
