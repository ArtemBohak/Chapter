import { createRef } from "react";

export const dataFindIndex = <T>(array: Array<T>, obj: T, key: keyof T) =>
  array.findIndex((el) => el[key] === obj[key]);

export const postDataEdit = <T>(feeds: Array<T>, pageLimit: number) => {
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
