import { createRef } from "react";
import { pageLimit } from "../..";

export const dataFindIndex = <T>(array: Array<T>, obj: T, key: keyof T) =>
  array.findIndex((el) => el[key] === obj[key]);

export const postDataEdit = <T>(data: Array<T>, limit: number) =>
  data.map((el, i) => {
    const repeatValue = limit === pageLimit ? 5 : 10;
    const nextPage = Math.round(data.length / limit) + 1;
    const currentPage = Math.floor(i / limit) + 1;

    if (i === data.length - 1 && !(data.length % limit))
      return createDataObj(el, nextPage);

    if (
      repeatValue === 10 &&
      i > data.length - repeatValue &&
      i < data.length - 5
    )
      return createDataObj(el, currentPage);

    if (!(i % repeatValue)) return createDataObj(el, currentPage);

    return createDataObj(el);
  });

function createDataObj<T>(data: T, page?: number) {
  return page
    ? {
        ...data,
        pageLoaderRef: createRef<HTMLDivElement>(),
        pageValue: page,
      }
    : data;
}
