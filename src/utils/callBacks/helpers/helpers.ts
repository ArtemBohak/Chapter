import { createRef } from "react";

export const dataFindIndex = <T>(array: Array<T>, obj: T, key: keyof T) =>
  array.findIndex((el) => el[key] === obj[key]);

export const postDataEdit = <T>(data: Array<T>, limit: number) =>
  data.map((el, i) => {
    const nextPage = Math.round(data.length / limit) + 1;
    const currentPage = Math.floor(i / limit) + 1;

    if (i === data.length - 1 && data.length % limit === 0)
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        pageLoaderRef: createRef<HTMLDivElement>(),
        pageValue: nextPage,
      };

    if (!(i % 5))
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        pageLoaderRef: createRef<HTMLDivElement>(),
        pageValue: currentPage,
      };

    return { ...el, nodeRef: createRef<HTMLDivElement>() };
  });
