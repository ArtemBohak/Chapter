import { useEffect } from "react";

import { FeedsType, CommentsType } from "@/src/services/PostApi/PostApi.type";
import {
  IntersectionsOptionsType,
  RefType,
  SetNumberType,
} from "./useIntersections.type";

export const useRefsIntersection = (
  data: FeedsType | CommentsType,
  nodeRef: RefType,
  setPage: SetNumberType,
  { isShow, isLoad }: IntersectionsOptionsType = {}
) => {
  useEffect(() => {
    const loader = nodeRef.current;
    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && !isLoad) {
        setPage(1);
      }
    });

    if (typeof isShow === "undefined" && loader) observer.observe(loader);

    if (typeof isShow !== "undefined" && loader && isShow)
      observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [isLoad, isShow, nodeRef, setPage]);

  useEffect(() => {
    data.forEach((el) => {
      const observer = new IntersectionObserver(([entries]) => {
        if (
          el &&
          el.loaderRef &&
          el.loaderRef.current &&
          entries.isIntersecting
        ) {
          setPage(+el.loaderRef.current.value);
        }
      });

      if (
        typeof isShow !== "undefined" &&
        el &&
        el.loaderRef &&
        el.loaderRef.current &&
        isShow
      )
        observer.observe(el.loaderRef.current);

      if (
        typeof isShow === "undefined" &&
        el &&
        el.loaderRef &&
        el.loaderRef.current
      )
        observer.observe(el.loaderRef.current);
    });
  }, [data, isShow, setPage]);
};
