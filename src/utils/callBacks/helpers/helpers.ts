import { createRef } from "react";

export const dataFindIndex = <T>(array: Array<T>, obj: T, key: keyof T) =>
  array.findIndex((el) => el[key] === obj[key]);

export const postDataEdit = <T>(data: Array<T>, pageLimit: number) => {
  return data.map((el, i) => {
    if (data.length - pageLimit / 2 === i && !(data.length % pageLimit))
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        pageValue: Math.round(data.length / pageLimit) + 1,
      };

    if (!(i % pageLimit))
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        pageValue: Math.floor(i / pageLimit) + 1,
      };

    return { ...el, nodeRef: createRef<HTMLDivElement>() };
  });
};
