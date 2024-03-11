import { createRef } from "react";
import { pageLimit } from "../..";

export const dataFindIndex = <T>(array: Array<T>, obj: T, key: keyof T) =>
  array.findIndex((el) => el[key] === obj[key]);

export const postDataEdit = <T>(data: Array<T>, limit: number) => {
  return data.map((el, i) => {
    const endIndex = limit === pageLimit ? 3 : 10;
    const nextPage = Math.round(data.length / limit) + 1;
    const currentPage = Math.floor(i / limit) + 1;
    if (i === data.length - endIndex && !(data.length % limit))
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        pageValue: nextPage,
      };

    if (!(i % 5) && i < data.length - endIndex)
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        pageValue: currentPage,
      };

    return { ...el, nodeRef: createRef<HTMLDivElement>() };
  });
};
