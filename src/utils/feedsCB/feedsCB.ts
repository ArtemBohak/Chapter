import { IPost } from "@/src/types";

const feedsFindIndex = (feeds: Array<IPost>, feed: IPost) =>
  feeds.findIndex((el) => el.postId === feed.postId);

export const feedsCB =
  (feedsApiData: IPost[] | IPost) => (feeds: Array<IPost> | []) => {
    const feedC = [...feeds];
    let index: number;

    if (Array.isArray(feedsApiData)) {
      for (const feedData of feedsApiData) {
        index = feedsFindIndex(feedC, feedData);

        if (index !== -1) {
          feedC[index] = { ...feedC[index], ...feedData };
        } else feedC.push(feedData);
      }
    } else {
      index = feedsFindIndex(feedC, feedsApiData);

      if (index !== -1) {
        feedC[index] = { ...feedC[index], ...feedsApiData };
      }
    }

    return feedC;
  };
