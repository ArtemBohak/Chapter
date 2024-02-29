import { useEffect } from "react";

import {
  IntersectionsOptionsType,
  RefType,
  SetNumberType,
} from "./useIntersections.type";

export const useRefIntersection = (
  nodeRef: RefType,
  setPage: SetNumberType,
  { postsIsLoad, commentsIsShow }: IntersectionsOptionsType = {}
) => {
  useEffect(() => {
    const loader = nodeRef?.current;

    const observer = new IntersectionObserver(([entries]) => {
      if (loader && entries.isIntersecting) setPage(+loader.value);
    });

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [commentsIsShow, postsIsLoad, nodeRef, setPage]);
};
