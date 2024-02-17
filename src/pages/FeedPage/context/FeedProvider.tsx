import { FC, useEffect, useState } from "react";

import { FeedContext } from "./hooks/useFeedContext";
import { Feeds, IFeedProviderProps } from "./FeedProvider.type";

import temp from "../assets/feed-image.png";
const list = [1, 2, 3, 168];
const feedsList = [
  {
    updatedAt: "",
    id: 1,
    avatar: null,
    nickName: "@Jgreen",
    followList: list,
    imgUrl: temp,
    isSubscribed: false,
    likesList: list,
    totalLikes: 101,
    totalComments: 101,
    date: Date.now(),
    firstName: "Jennifer",
    lastName: "Green",
    title: "Harry Potter and the Philosopher's Stone my thoughts",
    caption:
      "Ten years pass and Harry, along with his cousin Dudley, are about to turn eleven. While on Dudley’s birthday trip to the zoo Harry somehow communicates with a snake. Dudley is astonished by how the snake is acting and starts prodding the glass to the enclosure, Harry notes that odd things happen around him all the time and that’s why Dudley and he don’t get along, besides the fact that Harry’s Aunt and Uncle treat him terribly. Harry gets blamed for Dudley falling into the enclosure after the glass surrounding it disappears. When they all get back home Vernon Dursley shoves Harry into his “room” which is a cupboard under their stairs. One day in July Harry gets the mail and notices that there is a letter for him. It’s addressed to Mr. H. Potter, the Cupboard under the Stairs 4 Privet Drive, Little Whining, Surrey. Vernon decides to take the family on a trip to get away from it all.",
  },
  {
    updatedAt: "",
    id: 2,
    avatar: null,
    isSubscribed: false,
    nickName: "@Jgreen",
    followList: list,
    imgUrl: temp,
    likesList: list,
    totalLikes: 101,
    totalComments: 101,
    date: Date.now(),
    firstName: "Jennifer",
    lastName: "Green",
    title: "Harry Potter and the Philosopher's Stone my thoughts ",
    caption:
      "Ten years pass and Harry, along with his cousin Dudley, are about to turn eleven. While on Dudley’s birthday trip to the zoo Harry somehow communicates with a snake. Dudley is astonished by how the snake is acting and starts prodding the glass to the enclosure, Harry notes that odd things happen around him all the time and that’s why Dudley and he don’t get along, besides the fact that Harry’s Aunt and Uncle treat him terribly. Harry gets blamed for Dudley falling into the enclosure after the glass surrounding it disappears. When they all get back home Vernon Dursley shoves Harry into his “room” which is a cupboard under their stairs. One day in July Harry gets the mail and notices that there is a letter for him. It’s addressed to Mr. H. Potter, the Cupboard under the Stairs 4 Privet Drive, Little Whining, Surrey. Vernon decides to take the family on a trip to get away from it all.",
  },
  {
    updatedAt: "",
    id: 3,
    avatar: null,
    nickName: "@Jgreen",
    isSubscribed: false,
    followList: list,
    imgUrl: temp,
    likesList: list,
    totalLikes: 101,
    totalComments: 101,
    date: Date.now(),
    firstName: "Jennifer",
    lastName: "Green",
    title: "Harry Potter and the Philosopher's Stone my thoughts ",
    caption:
      "Ten years pass and Harry, along with his cousin Dudley, are about to turn eleven. While on Dudley’s birthday trip to the zoo Harry somehow communicates with a snake. Dudley is astonished by how the snake is acting and starts prodding the glass to the enclosure, Harry notes that odd things happen around him all the time and that’s why Dudley and he don’t get along, besides the fact that Harry’s Aunt and Uncle treat him terribly. Harry gets blamed for Dudley falling into the enclosure after the glass surrounding it disappears. When they all get back home Vernon Dursley shoves Harry into his “room” which is a cupboard under their stairs. One day in July Harry gets the mail and notices that there is a letter for him. It’s addressed to Mr. H. Potter, the Cupboard under the Stairs 4 Privet Drive, Little Whining, Surrey. Vernon decides to take the family on a trip to get away from it all.",
  },
];

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<Feeds>([]);

  useEffect(() => {
    setFeeds(feedsList);
  }, []);

  const fetchData = (id: string | number) => {
    console.log(id);
  };
  return (
    <FeedContext.Provider
      value={{
        feeds,
        fetchData,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
