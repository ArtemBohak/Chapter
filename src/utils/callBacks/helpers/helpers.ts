import { createRef } from "react";

export const postDataFindIndex = <T extends object>(
  feeds: Array<T>,
  feed: T,
  key: keyof T
) => feeds.findIndex((el) => el[key] === feed[key]);

export const postDataEdit = <T extends object>(
  feeds: Array<T>,
  pageLimit: number
) => {
  return feeds.map((el, i) => {
    if (feeds.length - 3 === i) {
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        loaderRef: createRef<HTMLInputElement>(),
        pageValue: Math.ceil(feeds.length / pageLimit) + 1,
      };
    }
    return {
      ...el,
      nodeRef: createRef<HTMLDivElement>(),
    };
  });
};
