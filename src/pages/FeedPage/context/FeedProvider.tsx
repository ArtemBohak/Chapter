import { FC, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary } from "@/src/hooks";
import { FeedContext } from "./hooks/useFeedContext";
import { Feeds, IFeedProviderProps } from "./FeedProvider.type";

import temp from "../assets/feed-image.png";

const comments = [
  {
    postId: 1,
    author: {
      id: 0,
      avatar: null,
      firstName: "Mary",
      lastName: "Reeves",
      relativeDate: Date.now() - 10002102111,
      nickName: "@maryreeves",
    },
    likeCount: 10,
    commentsCount: 10,
    caption:
      "Thank you for sharing your impressions of the book, I agree with @Vilkkyyyy, it was just a great post! Full of magic and enchantment. I read it with pleasure and look forward to the new one!",
    usersId: [1, 2, 318],
  },
  {
    postId: 2,
    author: {
      id: 0,
      avatar: null,
      firstName: "Mary",
      lastName: "Reeves",
      relativeDate: Date.now() - 10002102111,
      nickName: "@maryreeves",
    },
    likeCount: 10,
    commentsCount: 10,
    caption:
      "Thank you for sharing your impressions of the book, I agree with @Vilkkyyyy, it was just a great post! Full of magic and enchantment. I read it with pleasure and look forward to the new one!",
    usersId: [1, 2, 318],
  },
];

const feedsList: Feeds = [
  {
    author: {
      id: 1,
      avatar: null,
      firstName: "Jennifer",
      lastName: "Green",
      relativeDate: "ssd",
      nickName: "@Jgreen",
    },
    postId: 1,
    title: "Harry Potter and the Philosopher's Stone my thoughts",
    caption:
      "Ten years pass and Harry, along with his cousin Dudley, are about to turn eleven. While on Dudley’s birthday trip to the zoo Harry somehow communicates with a snake. Dudley is astonished by how the snake is acting and starts prodding the glass to the enclosure, Harry notes that odd things happen around him all the time and that’s why Dudley and he don’t get along, besides the fact that Harry’s Aunt and Uncle treat him terribly. Harry gets blamed for Dudley falling into the enclosure after the glass surrounding it disappears. When they all get back home Vernon Dursley shoves Harry into his “room” which is a cupboard under their stairs. One day in July Harry gets the mail and notices that there is a letter for him. It’s addressed to Mr. H. Potter, the Cupboard under the Stairs 4 Privet Drive, Little Whining, Surrey. Vernon decides to take the family on a trip to get away from it all.",
    imgUrl: temp,
    isSubscribeToAuthor: true,
    commentsCount: 101,
    likeCount: 101,
    createAt: Date.now(),
    usersId: [1, 2, 318],
    comments,
  },
];

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<Feeds>([]);
  const [isLoad, setIsLoad] = useState(false);
  const setErrorBoundary = useErrorBoundary();

  useEffect(() => {
    setIsLoad(true);
    api
      .get(EndpointsEnum.FEEDS)
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
