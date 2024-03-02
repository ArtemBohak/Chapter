import { useEffect } from "react";

import { OptionsType, RefType, SetNumberType } from "./useIntersections.type";

export const useRefIntersection = (
  nodeRef: RefType,
  setPage: SetNumberType,
  { postsIsLoad, commentsIsShow, ...options }: OptionsType = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (nodeRef?.current && entry.isIntersecting)
          setPage(+nodeRef?.current.value);
      });
    }, options);

    if (nodeRef?.current) {
      observer.observe(nodeRef?.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [commentsIsShow, postsIsLoad, nodeRef, setPage, options]);
};
