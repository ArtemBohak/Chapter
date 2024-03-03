import { useEffect } from "react";

import { OptionsType, RefType, HandlerType } from "./useIntersections.type";

export const useRefIntersection = (
  nodeRef: RefType,
  handler: HandlerType,
  { postsIsLoad, commentsIsShow, ...options }: OptionsType = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (nodeRef?.current && entry.isIntersecting) handler(nodeRef?.current);
      });
    }, options);

    if (nodeRef?.current) {
      observer.observe(nodeRef?.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsIsShow, postsIsLoad, nodeRef, options]);
};
