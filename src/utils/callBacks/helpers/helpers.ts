import { createRef } from "react";

export const dataFindIndex = <T>(array: Array<T>, obj: T, key: keyof T) =>
  array.findIndex((el) => el[key] === obj[key]);

export const postDataEdit = <T>(data: Array<T>, pageLimit: number) => {
  return data.map((el, i) => {
    const nextPage = Math.round(data.length / pageLimit) + 1;
    const currentPage = Math.floor(i / pageLimit) + 1;
    if (i === data.length - 1 && !(data.length % pageLimit))
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        pageValue: nextPage,
      };

    if (!(i % 5))
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        pageValue: currentPage,
      };

    return { ...el, nodeRef: createRef<HTMLDivElement>() };
  });
};
