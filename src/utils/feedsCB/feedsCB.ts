import { IPost } from "@/src/types";
import { createRef } from "react";
import { pageLimit } from "@/src/utils";
import { FeedsTypes } from "@/src/pages/FeedPage/context/FeedProvider.type";

const feedsFindIndex = (feeds: FeedsTypes, feed: IPost) =>
  feeds.findIndex((el) => el.postId === feed.postId);

const feedsEdit = (feeds: FeedsTypes) => {
  return feeds.map((el, i) => {
    if (feeds.length - 1 === i) {
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        loaderRef: createRef<HTMLInputElement>(),
        pageValue: Math.ceil(feeds.length / pageLimit),
      };
    }
    return {
      ...el,
      nodeRef: createRef<HTMLDivElement>(),
    };
  });
};

export const feedsCB =
  (feedsApiData: IPost[] | IPost) => (feeds: FeedsTypes) => {
    let index: number;

    if (Array.isArray(feedsApiData)) {
      for (const feedData of feedsApiData) {
        index = feedsFindIndex(feeds, feedData);

        if (index !== -1) {
          feeds[index] = { ...feeds[index], ...feedData };
        } else feeds = [...feeds, feedData];
      }

      return feedsEdit(feeds);

      // object
    } else {
      index = feedsFindIndex(feeds, feedsApiData);

      if (index !== -1) {
        feeds[index] = { ...feeds[index], ...feedsApiData };
      }
    }

    return feeds;
  };
