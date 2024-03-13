import { useEffect } from "react";

import { OptionsType, HandlerType } from "./useIntersections.type";
import { RefType } from "@/src/types";

export const useRefIntersection = (
  handler: HandlerType,
  nodeRef?: RefType,
  { postsIsLoad, commentsIsShow, ...options }: OptionsType = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (nodeRef?.current) {
          handler(entry, nodeRef?.current);
        }
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
