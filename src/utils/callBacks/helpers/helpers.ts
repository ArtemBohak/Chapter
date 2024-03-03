import { createRef } from "react";

export const dataFindIndex = <T>(array: Array<T>, obj: T, key: keyof T) =>
  array.findIndex((el) => el[key] === obj[key]);

export const postDataEdit = <T>(data: Array<T>, pageLimit: number) => {
  return data.map((el, i) => {
    if (data.length - 1 === i && data.length % pageLimit === 0) {
      return {
        ...el,
        nodeRef: createRef<HTMLDivElement>(),
        loaderRef: createRef<HTMLInputElement>(),
        pageValue: Math.round(data.length / pageLimit) + 1,
      };
    }
    return {
      ...el,
      nodeRef: createRef<HTMLDivElement>(),
    };
  });
};
