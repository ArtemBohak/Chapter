import { FC, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { FeedContext } from "./hooks/useFeedContext";
import { Feeds, IFeedProviderProps } from "./FeedProvider.type";

import temp from "../assets/feed-image.png";
import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary } from "@/src/hooks";

const comments = [
  {
    id: 0,
    totalComments: 10,
    totalLikes: 10,
    avatar: null,
    firstName: "Mary",
    lastName: "Reeves",
    nickName: "@maryreeves",
    date: Date.now() - 10002102111,
    caption:
      "Thank you for sharing your impressions of the book, I agree with @Vilkkyyyy, it was just a great post! Full of magic and enchantment. I read it with pleasure and look forward to the new one!",
    likesList: [1, 2, 168],
    comments: [
      {
        id: 0,
        totalComments: 10,
        totalLikes: 10,
        avatar: null,
        firstName: "Alex",
        lastName: "Reeves",
        nickName: "@maryreeves",
        date: Date.now() - 10002102,
        caption: "It's a shame that the Harry Potter books are over 😭",
        likesList: [1, 2, 168],
      },
      {
        id: 1,
        totalComments: 10,
        totalLikes: 10,
        avatar: null,
        firstName: "Marta",
        lastName: "Reeves",
        nickName: "@maryreeves",
        date: Date.now() - 10002102,
        caption: "It's a shame that the Harry Potter books are over 😭",
        likesList: [1, 2, 168],
        comments: [
          {
            id: 0,
            totalComments: 10,
            totalLikes: 10,
            avatar: null,
            firstName: "Alex",
            lastName: "Reeves",
            nickName: "@maryreeves",
            date: Date.now() - 10002102,
            caption: "It's a shame that the Harry Potter books are over 😭",
            likesList: [1, 2, 168],
          },
          {
            id: 1,
            totalComments: 10,
            totalLikes: 10,
            avatar: null,
            firstName: "Marta",
            lastName: "Reeves",
            nickName: "@maryreeves",
            date: Date.now() - 10002102,
            caption: "It's a shame that the Harry Potter books are over 😭",
            likesList: [1, 2, 168],
            comments: [
              {
                id: 0,
                totalComments: 10,
                totalLikes: 10,
                avatar: null,
                firstName: "Alex",
                lastName: "Reeves",
                nickName: "@maryreeves",
                date: Date.now() - 10002102,
                caption: "It's a shame that the Harry Potter books are over 😭",
                likesList: [1, 2, 168],
              },
              {
                id: 1,
                totalComments: 10,
                totalLikes: 10,
                avatar: null,
                firstName: "Marta",
                lastName: "Reeves",
                nickName: "@maryreeves",
                date: Date.now() - 10002102,
                caption: "It's a shame that the Harry Potter books are over 😭",
                likesList: [1, 2, 168],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    totalComments: 10,
    totalLikes: 10,
    avatar: null,
    firstName: "Mary",
    lastName: "Reeves",
    nickName: "@maryreeves",
    date: Date.now() - 10002102111,
    caption: "It's a shame that the Harry Potter books are over 😭",
    likesList: [1, 2, 168],
  },
  {
    id: 2,
    totalComments: 110,
    totalLikes: 120,
    avatar: null,
    firstName: "Mary",
    lastName: "Reeves",
    nickName: "@maryreeves",
    date: Date.now() - 1002111,
    caption: "It's a shame that the Harry Potter books are over 😭",
    likesList: [1, 2, 168],
  },
];
const list = [1, 2, 3, 168];
const feedsList = [
  {
    id: 1,
    avatar: null,
    nickName: "@Jgreen",
    followList: list,
    imageUrl: temp,
    likesList: list,
    totalLikes: 101,
    totalComments: 101,
    date: Date.now(),
    firstName: "Jennifer",
    lastName: "Green",
    title: "Harry Potter and the Philosopher's Stone my thoughts",
    caption:
      "Ten years pass and Harry, along with his cousin Dudley, are about to turn eleven. While on Dudley’s birthday trip to the zoo Harry somehow communicates with a snake. Dudley is astonished by how the snake is acting and starts prodding the glass to the enclosure, Harry notes that odd things happen around him all the time and that’s why Dudley and he don’t get along, besides the fact that Harry’s Aunt and Uncle treat him terribly. Harry gets blamed for Dudley falling into the enclosure after the glass surrounding it disappears. When they all get back home Vernon Dursley shoves Harry into his “room” which is a cupboard under their stairs. One day in July Harry gets the mail and notices that there is a letter for him. It’s addressed to Mr. H. Potter, the Cupboard under the Stairs 4 Privet Drive, Little Whining, Surrey. Vernon decides to take the family on a trip to get away from it all.",
    comments,
  },
  {
    id: 2,
    avatar: null,
    nickName: "@Jgreen",
    followList: list,
    imageUrl: temp,
    likesList: list,
    totalLikes: 101,
    totalComments: 101,
    date: Date.now(),
    firstName: "Jennifer",
    lastName: "Green",
    title: "Harry Potter and the Philosopher's Stone my thoughts ",
    caption:
      "Ten years pass and Harry, along with his cousin Dudley, are about to turn eleven. While on Dudley’s birthday trip to the zoo Harry somehow communicates with a snake. Dudley is astonished by how the snake is acting and starts prodding the glass to the enclosure, Harry notes that odd things happen around him all the time and that’s why Dudley and he don’t get along, besides the fact that Harry’s Aunt and Uncle treat him terribly. Harry gets blamed for Dudley falling into the enclosure after the glass surrounding it disappears. When they all get back home Vernon Dursley shoves Harry into his “room” which is a cupboard under their stairs. One day in July Harry gets the mail and notices that there is a letter for him. It’s addressed to Mr. H. Potter, the Cupboard under the Stairs 4 Privet Drive, Little Whining, Surrey. Vernon decides to take the family on a trip to get away from it all.",
    comments,
  },
  {
    id: 3,
    avatar: null,
    nickName: "@Jgreen",
    followList: list,
    imageUrl: temp,
    likesList: list,
    totalLikes: 101,
    totalComments: 101,
    date: Date.now(),
    firstName: "Jennifer",
    lastName: "Green",
    title: "Harry Potter and the Philosopher's Stone my thoughts ",
    caption:
      "Ten years pass and Harry, along with his cousin Dudley, are about to turn eleven. While on Dudley’s birthday trip to the zoo Harry somehow communicates with a snake. Dudley is astonished by how the snake is acting and starts prodding the glass to the enclosure, Harry notes that odd things happen around him all the time and that’s why Dudley and he don’t get along, besides the fact that Harry’s Aunt and Uncle treat him terribly. Harry gets blamed for Dudley falling into the enclosure after the glass surrounding it disappears. When they all get back home Vernon Dursley shoves Harry into his “room” which is a cupboard under their stairs. One day in July Harry gets the mail and notices that there is a letter for him. It’s addressed to Mr. H. Potter, the Cupboard under the Stairs 4 Privet Drive, Little Whining, Surrey. Vernon decides to take the family on a trip to get away from it all.",
    comments: [],
  },
];

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<Feeds>([]);
  const [isLoad, setIsLoad] = useState(false);
  const setErrorBoundary = useErrorBoundary();

  useEffect(() => {
    setIsLoad(true);
    api
      .get(EndpointsEnum.POSTS)
      .then((res) => {
        console.log(res.data.posts);
        setFeeds(feedsList);
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          setErrorBoundary(e);
        }
      })
      .finally(() => {
        setIsLoad(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (id: string | number) => {
    console.log(id);
  };

  return (
    <FeedContext.Provider
      value={{
        feeds,
        fetchData,
        isLoad,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
